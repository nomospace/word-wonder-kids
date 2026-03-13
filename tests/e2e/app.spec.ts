/**
 * Word Wonder Kids E2E Tests
 * 使用 Playwright 进行端到端测试
 */

import { test, expect } from '@playwright/test';

test.describe('Word Wonder Kids 应用测试', () => {
  // 测试首页加载
  test('首页应该正常加载', async ({ page }) => {
    await page.goto('/');
    
    // 检查标题
    await expect(page).toHaveTitle(/Word Wonder Kids/);
    
    // 检查头部显示
    const header = page.locator('.app-header');
    await expect(header).toBeVisible();
    
    // 检查主标题
    const title = page.locator('.app-title');
    await expect(title).toBeVisible();
    await expect(title).toContainText('Word Wonder Kids');
    
    // 检查副标题
    const subtitle = page.locator('.app-subtitle');
    await expect(subtitle).toBeVisible();
    await expect(subtitle).toContainText('快乐学英语');
  });

  // 测试统计卡片显示
  test('首页应该显示学习统计', async ({ page }) => {
    await page.goto('/');
    
    const statsCard = page.locator('.stats-card');
    await expect(statsCard).toBeVisible();
    
    // 检查统计项
    const statItems = statsCard.locator('.stat-item');
    await expect(statItems).toHaveCount(3);
  });

  // 测试功能卡片
  test('首页应该显示 4 个功能卡片', async ({ page }) => {
    await page.goto('/');
    
    const featuresGrid = page.locator('.features-grid');
    await expect(featuresGrid).toBeVisible();
    
    const featureCards = featuresGrid.locator('.feature-card');
    await expect(featureCards).toHaveCount(4);
    
    // 检查每个卡片的标题
    await expect(featureCards.nth(0)).toContainText('学习');
    await expect(featureCards.nth(1)).toContainText('游戏');
    await expect(featureCards.nth(2)).toContainText('进度');
    await expect(featureCards.nth(3)).toContainText('设置');
  });

  // 测试底部导航
  test('底部导航应该显示 5 个菜单项', async ({ page }) => {
    await page.goto('/');
    
    const bottomNav = page.locator('.bottom-nav');
    await expect(bottomNav).toBeVisible();
    
    const navItems = bottomNav.locator('.nav-item');
    await expect(navItems).toHaveCount(5);
    
    // 检查每个菜单项的标签
    await expect(navItems.nth(0)).toContainText('首页');
    await expect(navItems.nth(1)).toContainText('学习');
    await expect(navItems.nth(2)).toContainText('游戏');
    await expect(navItems.nth(3)).toContainText('进度');
    await expect(navItems.nth(4)).toContainText('设置');
  });

  // 测试路由跳转 - 学习页面
  test('点击学习卡片应该跳转到学习页面', async ({ page }) => {
    await page.goto('/');
    
    const learnCard = page.locator('.feature-card.learn').first();
    await learnCard.click();
    
    // 等待路由跳转
    await page.waitForURL('/learn');
    
    // 检查页面标题
    const pageTitle = page.locator('.page-header h1');
    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toContainText('学习');
  });

  // 测试路由跳转 - 游戏页面
  test('点击游戏卡片应该跳转到游戏页面', async ({ page }) => {
    await page.goto('/');
    
    const gameCard = page.locator('.feature-card.game').first();
    await gameCard.click();
    
    await page.waitForURL('/game');
    
    const pageTitle = page.locator('.page-header h1');
    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toContainText('游戏');
  });

  // 测试路由跳转 - 进度页面
  test('点击进度卡片应该跳转到进度页面', async ({ page }) => {
    await page.goto('/');
    
    const progressCard = page.locator('.feature-card.progress').first();
    await progressCard.click();
    
    await page.waitForURL('/progress');
    
    const pageTitle = page.locator('.page-header h1');
    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toContainText('进度');
  });

  // 测试路由跳转 - 设置页面
  test('点击设置卡片应该跳转到设置页面', async ({ page }) => {
    await page.goto('/');
    
    const settingsCard = page.locator('.feature-card.settings').first();
    await settingsCard.click();
    
    await page.waitForURL('/settings');
    
    const pageTitle = page.locator('.page-header h1');
    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toContainText('设置');
  });

  // 测试底部导航跳转
  test('点击底部导航应该跳转到对应页面', async ({ page }) => {
    await page.goto('/');
    
    const bottomNav = page.locator('.bottom-nav');
    const navItems = bottomNav.locator('.nav-item');
    
    // 测试学习导航
    await navItems.nth(1).click();
    await page.waitForURL('/learn');
    await expect(navItems.nth(1)).toHaveClass(/active/);
    
    // 测试游戏导航
    await navItems.nth(2).click();
    await page.waitForURL('/game');
    await expect(navItems.nth(2)).toHaveClass(/active/);
    
    // 测试进度导航
    await navItems.nth(3).click();
    await page.waitForURL('/progress');
    await expect(navItems.nth(3)).toHaveClass(/active/);
    
    // 测试设置导航
    await navItems.nth(4).click();
    await page.waitForURL('/settings');
    await expect(navItems.nth(4)).toHaveClass(/active/);
    
    // 测试首页导航
    await navItems.nth(0).click();
    await page.waitForURL('/');
    await expect(navItems.nth(0)).toHaveClass(/active/);
  });

  // 测试页面响应式
  test('页面应该在移动端正常显示', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // 检查头部
    const header = page.locator('.app-header');
    await expect(header).toBeVisible();
    
    // 检查功能卡片（应该是 2 列）
    const featuresGrid = page.locator('.features-grid');
    await expect(featuresGrid).toBeVisible();
    
    // 检查底部导航
    const bottomNav = page.locator('.bottom-nav');
    await expect(bottomNav).toBeVisible();
  });

  // 测试卡片悬停效果
  test('功能卡片应该有悬停效果', async ({ page }) => {
    await page.goto('/');
    
    const learnCard = page.locator('.feature-card.learn').first();
    
    // 获取初始位置
    const initialBox = await learnCard.boundingBox();
    expect(initialBox).toBeTruthy();
    
    // 悬停
    await learnCard.hover();
    
    // 等待动画
    await page.waitForTimeout(300);
    
    // 检查卡片位置变化（应该上浮）
    const hoveredBox = await learnCard.boundingBox();
    expect(hoveredBox).toBeTruthy();
    expect(hoveredBox!.y).toBeLessThanOrEqual(initialBox!.y);
  });

  // 测试单词卡片控制
  test('单词卡片控制按钮应该可点击', async ({ page }) => {
    await page.goto('/');
    
    const controls = page.locator('.card-controls');
    await expect(controls).toBeVisible();
    
    const buttons = controls.locator('button');
    await expect(buttons).toHaveCount(3);
    
    // 测试下一个按钮
    const nextBtn = buttons.nth(2);
    await nextBtn.click();
    await page.waitForTimeout(200);
    
    // 测试上一个按钮
    const prevBtn = buttons.nth(0);
    await prevBtn.click();
    await page.waitForTimeout(200);
    
    // 测试随机按钮
    const randomBtn = buttons.nth(1);
    await randomBtn.click();
    await page.waitForTimeout(200);
  });

  // 测试学习页面功能
  test('学习页面应该显示分类和单词列表', async ({ page }) => {
    await page.goto('/learn');
    
    // 检查分类筛选器
    const categoryFilter = page.locator('.category-filter');
    await expect(categoryFilter).toBeVisible();
    
    // 检查学习模式按钮
    const modeButtons = page.locator('.mode-buttons');
    await expect(modeButtons).toBeVisible();
    
    const modeBtns = modeButtons.locator('button');
    await expect(modeBtns).toHaveCount(3);
  });

  // 测试游戏页面功能
  test('游戏页面应该显示 4 种游戏', async ({ page }) => {
    await page.goto('/game');
    
    const gameGrid = page.locator('.game-grid');
    await expect(gameGrid).toBeVisible();
    
    const gameCards = gameGrid.locator('.game-card');
    await expect(gameCards).toHaveCount(4);
    
    // 检查游戏名称
    await expect(gameCards.nth(0)).toContainText('连连看');
    await expect(gameCards.nth(1)).toContainText('听音选词');
    await expect(gameCards.nth(2)).toContainText('拼写挑战');
    await expect(gameCards.nth(3)).toContainText('单词测验');
  });

  // 测试设置页面功能
  test('设置页面应该显示各项设置', async ({ page }) => {
    await page.goto('/settings');
    
    // 检查发音设置
    const ttsSection = page.locator('.settings-section').first();
    await expect(ttsSection).toBeVisible();
    
    // 检查语速滑块
    const rateInput = page.locator('input[type="range"]').first();
    await expect(rateInput).toBeVisible();
    
    // 检查测试按钮
    const testBtn = page.locator('.test-btn');
    await expect(testBtn).toBeVisible();
  });

  // 测试错误路由重定向
  test('访问不存在的路由应该重定向到首页', async ({ page }) => {
    await page.goto('/nonexistent-page');
    
    // 应该被重定向到首页
    await page.waitForURL('/');
    
    const header = page.locator('.app-header');
    await expect(header).toBeVisible();
  });
});
