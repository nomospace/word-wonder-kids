# 🧪 Word Wonder Kids 测试指南

本目录包含项目的端到端 (E2E) 测试配置和测试用例。

## 📋 目录结构

```
tests/
├── README.md          # 本文件
└── e2e/
    └── app.spec.ts    # E2E 测试用例
```

## 🚀 快速开始

### 1. 安装依赖

```bash
cd app
npm install -D @playwright/test
npx playwright install --with-deps
```

### 2. 启动开发服务器

```bash
cd app
npm start
```

服务器将在 http://localhost:4200 启动。

### 3. 运行测试

```bash
# 运行所有测试
npx playwright test

# 运行特定测试
npx playwright test --grep "首页"

# 运行特定浏览器的测试
npx playwright test --project=chromium

# 有头模式（显示浏览器）
npx playwright test --headed

# 调试模式
npx playwright test --debug

# 生成测试报告
npx playwright test --reporter=html
```

## 📊 测试覆盖

### 桌面端测试
- ✅ Chromium (Chrome)
- ✅ Firefox
- ✅ WebKit (Safari)

### 移动端测试
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)

## 🧪 测试用例列表

| 测试名称 | 描述 |
|---------|------|
| 首页应该正常加载 | 验证首页可以正常打开 |
| 首页应该显示学习统计 | 验证统计卡片显示 |
| 首页应该显示 4 个功能卡片 | 验证功能入口完整 |
| 底部导航应该显示 5 个菜单项 | 验证导航完整 |
| 点击学习卡片应该跳转到学习页面 | 验证路由跳转 |
| 点击游戏卡片应该跳转到游戏页面 | 验证路由跳转 |
| 点击进度卡片应该跳转到进度页面 | 验证路由跳转 |
| 点击设置卡片应该跳转到设置页面 | 验证路由跳转 |
| 点击底部导航应该跳转到对应页面 | 验证导航功能 |
| 页面应该在移动端正常显示 | 验证响应式 |
| 功能卡片应该有悬停效果 | 验证动画效果 |
| 单词卡片控制按钮应该可点击 | 验证交互功能 |
| 学习页面应该显示分类和单词列表 | 验证学习页 |
| 游戏页面应该显示 4 种游戏 | 验证游戏页 |
| 设置页面应该显示各项设置 | 验证设置页 |
| 访问不存在的路由应该重定向到首页 | 验证错误处理 |

## 🔧 配置文件

### playwright.config.ts

```typescript
{
  testDir: './tests/e2e',
  timeout: 30000,
  retries: 2,
  reporter: ['html', 'list', 'json'],
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
}
```

## 🤖 CI/CD 集成

项目已配置 GitHub Actions，在以下情况自动运行测试：

- 推送到 `main` / `master` / `develop` 分支
- 创建 Pull Request
- 手动触发 workflow

查看配置：`.github/workflows/e2e-tests.yml`

## 📝 本地预检

`pre-commit.sh` 脚本会在提交前自动运行测试：

```bash
# 运行完整检查（包括 E2E 测试）
./pre-commit.sh

# 跳过 E2E 测试
SKIP_E2E=1 ./pre-commit.sh
```

## 🎯 编写新测试

### 基本结构

```typescript
import { test, expect } from '@playwright/test';

test.describe('功能模块', () => {
  test('应该做什么', async ({ page }) => {
    await page.goto('/url');
    
    // 断言
    await expect(page.locator('.element')).toBeVisible();
  });
});
```

### 常用断言

```typescript
// 可见性
await expect(locator).toBeVisible();
await expect(locator).not.toBeVisible();

// 文本内容
await expect(locator).toContainText('文本');
await expect(locator).toHaveText('精确文本');

// 属性
await expect(locator).toHaveAttribute('href', '/url');
await expect(locator).toHaveClass(/active/);

// 数量
await expect(locator).toHaveCount(4);

// URL
await page.waitForURL('/expected-url');
```

## 📈 测试报告

运行测试后生成 HTML 报告：

```bash
npx playwright test --reporter=html
npx playwright show-report
```

报告将包含：
- ✅ 测试通过/失败状态
- 📹 失败时的视频录制
- 📸 失败时的截图
- 📊 测试执行时间
- 🔍 详细的错误信息

## 🐛 调试技巧

### 1. 使用调试模式

```bash
npx playwright test --debug
```

这将打开 Playwright Inspector，可以：
- 单步执行测试
- 查看实时 DOM
- 检查网络请求

### 2. 添加时间旅行调试

```typescript
await page.pause(); // 在执行到此位置时暂停
```

### 3. 使用 Trace Viewer

```bash
npx playwright test --trace on
npx playwright show-trace trace.zip
```

## 📚 更多资源

- [Playwright 官方文档](https://playwright.dev)
- [Playwright 测试生成器](https://playwright.dev/docs/codegen)
- [Playwright Trace Viewer](https://playwright.dev/docs/trace-viewer)
