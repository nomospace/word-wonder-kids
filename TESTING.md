# 🧪 自动化测试框架使用指南

## ✅ 已完成的工作

### 1. 首页图标修复
- ✨ 用精美的 SVG 图标替代了 emoji
- 🎨 每个功能卡片都有对应的扁平风格图标：
  - 📚 学习 - 书本图标
  - 🎮 游戏 - 游戏手柄图标
  - 📊 进度 - 柱状图图标
  - ⚙️ 设置 - 齿轮图标
- 💫 添加了悬停动画效果（放大 + 旋转）

### 2. 底部导航图标修复
- 🔧 用 SVG 图标替代了 emoji
- 🎯 5 个导航图标：首页、学习、游戏、进度、设置
- ✨ 添加了悬停和激活状态动画

### 3. 路由跳转修复
- ✅ 移除了干扰 routerLink 的 `(click)` 事件
- ✅ 所有功能卡片现在可以正常跳转

### 4. 自动化测试框架

#### 测试文件
```
tests/
├── README.md              # 测试使用指南
└── e2e/
    └── app.spec.ts        # 16 个 E2E 测试用例
```

#### 测试覆盖
| 类别 | 测试数量 |
|------|---------|
| 首页加载 | 3 个 |
| 路由跳转 | 5 个 |
| 底部导航 | 1 个 |
| 响应式 | 1 个 |
| 交互效果 | 2 个 |
| 页面功能 | 4 个 |
| **总计** | **16 个** |

#### 浏览器支持
- ✅ Desktop Chrome
- ✅ Desktop Firefox
- ✅ Desktop Safari
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)

## 🚀 如何使用

### 本地运行测试

```bash
# 1. 进入 app 目录
cd app

# 2. 安装 Playwright
npm install -D @playwright/test
npx playwright install --with-deps

# 3. 启动开发服务器
npm start

# 4. 在另一个终端运行测试
npx playwright test
```

### 快速命令

```bash
# 运行所有测试
npm run test:e2e

# 有头模式（显示浏览器）
npm run test:e2e:headed

# 调试模式
npm run test:e2e:debug

# 生成 HTML 报告
npx playwright test --reporter=html
npx playwright show-report
```

### 提交前自动测试

```bash
# 运行完整检查（包括 E2E 测试）
./pre-commit.sh

# 跳过 E2E 测试
SKIP_E2E=1 ./pre-commit.sh
```

## 🤖 CI/CD 集成

GitHub Actions 会自动在以下情况运行测试：

- ✅ Push 到 main/master/develop 分支
- ✅ 创建 Pull Request
- ✅ 手动触发 workflow

测试报告会自动上传为 artifacts，保留 30 天。

## 📊 测试报告示例

运行测试后查看报告：

```bash
npx playwright show-report
```

报告包含：
- ✅/❌ 测试通过/失败状态
- 📹 失败时的视频录制
- 📸 失败时的截图
- ⏱️ 测试执行时间
- 📝 详细的错误堆栈

## 🎯 添加新测试

在 `tests/e2e/` 目录下创建新的 `.spec.ts` 文件：

```typescript
import { test, expect } from '@playwright/test';

test.describe('新功能测试', () => {
  test('应该正常工作', async ({ page }) => {
    await page.goto('/new-feature');
    await expect(page.locator('.element')).toBeVisible();
  });
});
```

## 📝 最佳实践

1. **测试独立性** - 每个测试应该独立运行
2. **有意义的命名** - 测试名称应该描述预期行为
3. **合理的等待** - 使用 `waitForURL` 而不是固定延迟
4. **截图/视频** - 失败时自动保存，帮助调试
5. **定期运行** - 每次提交前都运行测试

## 🔧 故障排除

### 测试失败
1. 查看 HTML 报告中的错误信息
2. 使用 `--debug` 模式单步调试
3. 检查 Trace Viewer 查看详细执行过程

### 浏览器问题
```bash
# 重新安装浏览器
npx playwright install --force
```

### 端口冲突
```bash
# 修改启动端口
npm start -- --port 4201
```

---

**🎉 测试框架已完成！每次 commit 都会自动运行测试确保质量！**
