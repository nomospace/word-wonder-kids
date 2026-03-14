import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { KiddoService } from '../../services/kiddo.service';
import { UserProfile, UserBadge, Badge } from '../../models/kiddo.model';

@Component({
  selector: 'app-my',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="my-container" [class.lower]="profile?.segment === 'lower'" [class.upper]="profile?.segment === 'upper'">
      <header class="page-header">
        <h1 class="page-title">👤 我的学习</h1>
      </header>

      <!-- 用户卡片 -->
      <div class="user-card">
        <div class="user-avatar">{{ profile?.avatar || '🦊' }}</div>
        <div class="user-info">
          <h2 class="user-name">{{ profile?.nickname || '小萌' }}</h2>
          <p class="user-grade">{{ getGradeDisplay() }}</p>
        </div>
        <button class="edit-btn" routerLink="/settings">⚙️</button>
      </div>

      <!-- 学习数据 -->
      <div class="stats-section">
        <h3 class="section-title">📊 学习数据</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-icon">🔥</span>
            <span class="stat-value">{{ profile?.streakDays || 0 }}</span>
            <span class="stat-label">连续学习</span>
          </div>
          <div class="stat-card">
            <span class="stat-icon">📚</span>
            <span class="stat-value">{{ profile?.totalStudyDays || 0 }}</span>
            <span class="stat-label">累计天数</span>
          </div>
          <div class="stat-card">
            <span class="stat-icon">🪙</span>
            <span class="stat-value">{{ profile?.coins || 0 }}</span>
            <span class="stat-label">积分</span>
          </div>
          <div class="stat-card">
            <span class="stat-icon">🏆</span>
            <span class="stat-value">{{ badgeCount }}</span>
            <span class="stat-label">勋章</span>
          </div>
        </div>
      </div>

      <!-- 成长树 -->
      <div class="growth-tree-section">
        <h3 class="section-title">🌳 成长树</h3>
        <div class="growth-tree">
          <div class="tree-visual">
            <div class="tree-trunk" [style.height.px]="treeHeight"></div>
            <div class="tree-crown">
              <span class="leaf" *ngFor="let l of leaves">🍃</span>
            </div>
            <div class="tree-fruits">
              <span class="fruit" *ngFor="let b of earnedBadges.slice(0, 5)">{{ getBadgeIcon(b.badgeId) }}</span>
            </div>
          </div>
          <p class="tree-desc">继续学习，让你的成长树更加茂盛！</p>
        </div>
      </div>

      <!-- 错题本 -->
      <div class="wrong-section">
        <div class="section-header">
          <h3 class="section-title">📝 错题本</h3>
          <span class="wrong-count">{{ wrongCount }}题</span>
        </div>
        <div class="wrong-list" *ngIf="wrongCount > 0">
          <div class="wrong-item" *ngFor="let w of wrongQuestions.slice(0, 5)">
            <span class="wrong-type">{{ w.type === 'word' ? '单词' : '句型' }}</span>
            <span class="wrong-times">错{{ w.wrongCount }}次</span>
          </div>
        </div>
        <div class="empty-hint" *ngIf="wrongCount === 0">
          <p>🎉 太棒了！没有错题</p>
        </div>
      </div>

      <!-- 功能入口 -->
      <div class="menu-list">
        <a routerLink="/badges" class="menu-item">
          <span class="menu-icon">🏆</span>
          <span class="menu-text">我的勋章</span>
          <span class="menu-arrow">›</span>
        </a>
        <a routerLink="/settings" class="menu-item">
          <span class="menu-icon">⚙️</span>
          <span class="menu-text">设置</span>
          <span class="menu-arrow">›</span>
        </a>
      </div>

      <!-- 底部导航 -->
      <nav class="bottom-nav">
        <a routerLink="/" class="nav-item"><span class="nav-icon">🏠</span><span class="nav-label">首页</span></a>
        <a routerLink="/words" class="nav-item"><span class="nav-icon">📚</span><span class="nav-label">单词</span></a>
        <a routerLink="/sentences" class="nav-item"><span class="nav-icon">💬</span><span class="nav-label">句型</span></a>
        <a routerLink="/my" routerLinkActive="active" class="nav-item"><span class="nav-icon">👤</span><span class="nav-label">我的</span></a>
      </nav>
    </div>
  `,
  styles: [`
    .my-container { min-height: 100vh; padding-bottom: 80px; }
    .lower { --primary: #FF6B9D; --bg: #FFF5F8; background: var(--bg); }
    .upper { --primary: #4A90D9; --bg: #F0F8FF; background: var(--bg); }
    .page-header { padding: 16px; background: var(--primary); color: white; }
    .page-title { margin: 0; font-size: 20px; }
    .user-card { display: flex; align-items: center; gap: 16px; padding: 20px; background: white; margin: 16px; border-radius: 16px; }
    .user-avatar { font-size: 48px; width: 64px; height: 64px; background: var(--bg); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
    .user-info { flex: 1; }
    .user-name { margin: 0; font-size: 20px; }
    .user-grade { margin: 4px 0 0; font-size: 13px; color: #666; }
    .edit-btn { background: #f0f0f0; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 18px; cursor: pointer; }
    .section-title { font-size: 16px; margin: 0 0 12px; }
    .stats-section { padding: 16px; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
    .stat-card { background: white; padding: 16px 8px; border-radius: 12px; text-align: center; }
    .stat-icon { display: block; font-size: 24px; }
    .stat-value { display: block; font-size: 20px; font-weight: 700; color: var(--primary); }
    .stat-label { font-size: 11px; color: #666; }
    .growth-tree-section { padding: 16px; }
    .growth-tree { background: white; padding: 24px; border-radius: 16px; text-align: center; }
    .tree-visual { position: relative; height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; }
    .tree-trunk { width: 16px; background: #8B4513; border-radius: 4px; min-height: 40px; }
    .tree-crown { position: absolute; bottom: 60px; }
    .leaf { font-size: 20px; margin: 0 -4px; }
    .tree-fruits { position: absolute; bottom: 80px; }
    .fruit { font-size: 18px; margin: 0 2px; }
    .tree-desc { font-size: 13px; color: #666; margin-top: 16px; }
    .wrong-section { padding: 16px; }
    .section-header { display: flex; justify-content: space-between; align-items: center; }
    .wrong-count { font-size: 14px; color: var(--primary); }
    .wrong-list { background: white; border-radius: 12px; overflow: hidden; }
    .wrong-item { display: flex; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #eee; }
    .wrong-item:last-child { border: none; }
    .wrong-type { font-size: 14px; }
    .wrong-times { font-size: 12px; color: #f44336; }
    .empty-hint { background: white; padding: 24px; border-radius: 12px; text-align: center; }
    .menu-list { padding: 16px; }
    .menu-item { display: flex; align-items: center; gap: 12px; padding: 16px; background: white; margin-bottom: 8px; border-radius: 12px; text-decoration: none; color: inherit; }
    .menu-icon { font-size: 20px; }
    .menu-text { flex: 1; }
    .menu-arrow { color: #ccc; }
    .bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; display: flex; justify-content: space-around; background: white; padding: 8px 0 calc(8px + env(safe-area-inset-bottom)); z-index: 100; }
    .nav-item { display: flex; flex-direction: column; align-items: center; gap: 2px; text-decoration: none; color: #999; }
    .nav-item.active { color: var(--primary); }
    .nav-icon { font-size: 24px; }
    .nav-label { font-size: 11px; }
  `]
})
export class MyComponent implements OnInit {
  profile: UserProfile | null = null;
  badgeCount = 0;
  earnedBadges: UserBadge[] = [];
  wrongQuestions: any[] = [];
  wrongCount = 0;
  leaves: any[] = [];
  treeHeight = 40;

  constructor(private kiddoService: KiddoService) {}

  ngOnInit(): void {
    this.kiddoService.getUserProfile().subscribe(p => {
      this.profile = p;
      this.leaves = Array(Math.min(p?.totalStudyDays || 0, 10)).fill({});
      this.treeHeight = 40 + (p?.totalStudyDays || 0) * 2;
    });
    this.kiddoService.getUserBadges().subscribe(b => {
      this.earnedBadges = b;
      this.badgeCount = b.length;
    });
    this.kiddoService.getWrongQuestions().subscribe(w => {
      this.wrongQuestions = w;
      this.wrongCount = w.length;
    });
  }

  getGradeDisplay(): string {
    if (!this.profile) return '';
    const grades = ['一', '二', '三', '四', '五', '六'];
    return `${grades[this.profile.grade - 1]}年级`;
  }

  getBadgeIcon(id: string): string {
    const badges = this.kiddoService.getAllBadges();
    return badges.find(b => b.id === id)?.icon || '🏅';
  }
}