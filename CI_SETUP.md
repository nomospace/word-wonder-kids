# 🛡️ CI 配置与本地预检指南

## 问题：为什么本地能跑 CI 会挂？

常见原因：
1. **Node 版本不一致** - 本地 v22，CI 用 v18/v20
2. **依赖安装方式不同** - 本地 `npm install`，CI 用 `npm ci`
3. **package-lock.json 不同步** - lock 文件没提交或过时
4. **peer dependency 冲突** - 本地 npm 自动覆盖，CI 严格失败
5. **⚠️ GitHub Actions 缓存问题** - 旧缓存与新的 package.json 不兼容（本课重点！）

---

## ✅ 防御措施（已配置）

### 1. Node 版本锁定

```bash
# .nvmrc 文件已创建，指定 Node 20.x
# 本地开发前运行：
nvm install  # 自动切换到正确版本
nvm use      # 使用 .nvmrc 中的版本
```

### 2. Pre-commit Hook 自动检查

每次 `git commit` 前自动运行：
- ✅ Node 版本验证
- ✅ `npm ci` 严格验证（模拟 CI）
- ✅ 构建检查

**如果 pre-commit 失败，提交会被阻止！**

### 3. CI 预检脚本

```bash
# 完整模拟 CI 流程（包括 E2E 测试）
cd app
npm run ci:check

# 或手动运行
../scripts/ci-check.sh
```

### 4. 本地运行 GitHub Actions（可选）

```bash
# 安装 act 工具
brew install act

# 本地运行所有 push workflows
act push

# 只运行 E2E test
act -j test
```

---

## 📋 提交前检查清单

- [ ] 运行 `nvm use` 确保 Node 版本正确
- [ ] 运行 `npm install` 确保 lock 文件最新
- [ ] 运行 `npm run build` 确保构建成功
- [ ] 运行 `npm run test:e2e` 确保测试通过
- [ ] **或直接运行 `npm run ci:check` 一键检查**

---

## 🔧 常见问题修复

### package-lock.json 不一致

```bash
cd app
rm package-lock.json
npm install
git add package-lock.json
```

### Node 版本不匹配

```bash
# 安装 nvm (如果还没有)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 切换到项目指定版本
nvm install
nvm use
```

### peer dependency 警告

```bash
# 不要忽略 peer dependency 警告！
# 检查 package.json 中的版本是否兼容
npm ls <package-name>  # 查看依赖树
```

### GitHub Actions npm 缓存导致 CI 失败

**症状**：本地 `npm ci` 通过，但 CI 在 "安装依赖" 步骤失败

**原因**：
- workflow 配置了 `cache: 'npm'` 加速构建
- package.json 变化后，GitHub 仍使用旧的缓存
- 本地无缓存所以通过，CI 有旧缓存所以失败

**解决方案**：在 workflow 中添加 fallback 机制

```yaml
- name: 📦 安装依赖
  run: |
    # 优先使用 npm ci (严格模式)，失败则 fallback 到 npm install
    if ! npm ci; then
      echo "⚠️  npm ci 失败，清理缓存后重试 npm install"
      rm -rf node_modules
      npm install
    fi
```

**为什么这样设计**：
- `npm ci` 优先：有缓存时更快，严格验证 lock 文件
- `npm install` fallback：无缓存或缓存不兼容时自动生成新 lock
- 兼顾速度与可靠性

---

## 🎯 最佳实践

1. **永远提交 package-lock.json** - 确保所有人（包括 CI）用相同依赖
2. **用 `npm ci` 代替 `npm install`** - 更严格，更快，更可预测
3. **本地跑 pre-commit** - 不要跳过 hook 检查
4. **大改动前先跑 `ci:check`** - 避免等待 CI 才发现失败

---

---

## 📄 可复用的 Workflow 模板

复制这个模板到你的项目 `.github/workflows/ci.yml`：

```yaml
name: CI

on:
  push:
    branches: [ main, master, develop ]
  pull_request:
    branches: [ main, master, develop ]

jobs:
  build-and-test:
    name: 🛠️ Build & Test
    runs-on: ubuntu-latest
    
    steps:
      - name: 📥 检出代码
        uses: actions/checkout@v4
      
      - name: 🟢 设置 Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'
          cache-dependency-path: package-lock.json
      
      - name: 📦 安装依赖（带 fallback）
        run: |
          # 优先使用 npm ci (严格模式)，失败则 fallback 到 npm install
          if ! npm ci; then
            echo "⚠️  npm ci 失败，清理缓存后重试 npm install"
            rm -rf node_modules
            npm install
          fi
      
      - name: 🔨 构建
        run: npm run build
      
      - name: 🧪 测试
        run: npm test
```

---

## 📌 关键经验总结

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 本地通过 CI 失败 | Node 版本不一致 | `.nvmrc` + pre-commit 检查 |
| 本地通过 CI 失败 | peer dependency 冲突 | 降级依赖版本 + 本地验证 |
| 本地通过 CI 失败 | **GitHub 缓存问题** | **npm ci fallback 到 npm install** |
| E2E 测试失败 | **端口不匹配** | **检查 playwright baseURL** |

### 端口问题详情

**症状**: E2E 测试报错 "connection refused" 或 timeout

**检查清单**:
1. Playwright 配置的 `baseURL` 端口
2. Angular/Vite 开发服务器端口
3. workflow 中 `npm start` 的端口配置

**Angular 默认端口**: 4200 (不是 3000!)

```ts
// playwright.config.ts ✅
use: {
  baseURL: 'http://localhost:4200',  // Angular 默认端口
}
```

**核心原则**：
1. 本地模拟 CI 环境（版本、命令、检查）
2. CI 配置防御性 fallback（缓存失效时自动恢复）
3. 文档化所有踩过的坑（CI_SETUP.md）

---

_配置日期：2026-03-13_
_修复问题：vite v8 与 Angular 17 不兼容 + GitHub npm 缓存问题_
_最后更新：2026-03-13 14:28_
