# 🛡️ CI 配置与本地预检指南

## 问题：为什么本地能跑 CI 会挂？

常见原因：
1. **Node 版本不一致** - 本地 v22，CI 用 v18/v20
2. **依赖安装方式不同** - 本地 `npm install`，CI 用 `npm ci`
3. **package-lock.json 不同步** - lock 文件没提交或过时
4. **peer dependency 冲突** - 本地 npm 自动覆盖，CI 严格失败

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

---

## 🎯 最佳实践

1. **永远提交 package-lock.json** - 确保所有人（包括 CI）用相同依赖
2. **用 `npm ci` 代替 `npm install`** - 更严格，更快，更可预测
3. **本地跑 pre-commit** - 不要跳过 hook 检查
4. **大改动前先跑 `ci:check`** - 避免等待 CI 才发现失败

---

_配置日期：2026-03-13_
_修复问题：vite v8 与 Angular 17 不兼容导致 CI 失败_
