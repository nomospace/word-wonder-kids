import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { KiddoService } from '../../services/kiddo.service';
import { WordService } from '../../services/word.service';
import { UserProfile, DailyTask, SegmentLevel } from '../../models/kiddo.model';
import { Word } from '../../models/word.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <div class="app-container" [class.lower-segment]="profile?.segment === 'lower'" [class.upper-segment]="profile?.segment === 'upper'">
      <!-- 头部 -->
      <header class="app-header">
        <div class="header-top">
          <div class="user-info">
            <span class="avatar">{{ profile?.avatar || '🦊' }}</span>
            <div class="user-details">
              <span class="nickname">{{ profile?.nickname || '小萌' }}</span>
              <span class="grade-tag">{{ getGradeDisplay() }}</span>
            </div>
          </div>
          <div class="header-right">
            <div class="coins">
              <span class="coin-icon">🪙</span>
              <span class="coin-count">{{ profile?.coins || 0 }}</span>
            </div>
            <button class="streak-btn" (click)="checkIn()" [class.checked]="todayChecked">
              <span class="streak-icon">🔥</span>
              <span class="streak-count">{{ profile?.streakDays || 0 }}天</span>
            </button>
          </div>
        </div>
        
        <!-- 切换低高段 -->
        <div class="segment-switch">
          <button 
            class="segment-btn" 
            [class.active]="profile?.segment === 'lower'"
            (click)="setSegment('lower')">
            低段 (1-3年级)
          </button>
          <button 
            class="segment-btn" 
            [class.active]="profile?.segment === 'upper'"
            (click)="setSegment('upper')">
            高段 (4-6年级)
          </button>
        </div>
      </header>

      <!-- 主内容 -->
      <main class="app-main">
        <!-- 每日任务 -->
        <section class="daily-tasks">
          <div class="section-header">
            <h2 class="section-title">📅 今日任务</h2>
            <span class="task-progress">{{ completedTasks }}/{{ tasks.length }}</span>
          </div>
          <div class="tasks-list">
            <div class="task-card" *ngFor="let task of tasks" [class.completed]="task.completed">
              <div class="task-icon">{{ getTaskIcon(task.type) }}</div>
              <div class="task-info">
                <span class="task-title">{{ task.title }}</span>
                <div class="task-progress-bar">
                  <div class="progress-fill" [style.width.%]="(task.progress / task.target) * 100"></div>
                </div>
              </div>
              <span class="task-reward" *ngIf="!task.completed">+{{ task.reward }}</span>
              <span class="task-done" *ngIf="task.completed">✓</span>
            </div>
          </div>
        </section>

        <!-- 核心功能入口 -->
        <section class="main-features">
          <!-- 单词乐园 -->
          <a routerLink="/words" class="feature-card words">
            <div class="feature-icon">📚</div>
            <div class="feature-content">
              <span class="feature-title">单词乐园</span>
              <span class="feature-desc">看图识词 · 连连看 · 闯关</span>
            </div>
            <span class="feature-arrow">›</span>
          </a>
          
          <!-- 句型小课堂 -->
          <a routerLink="/sentences" class="feature-card sentences">
            <div class="feature-icon">💬</div>
            <div class="feature-content">
              <span class="feature-title">句型小课堂</span>
              <span class="feature-desc">动画学习 · 情景对话</span>
            </div>
            <span class="feature-arrow">›</span>
          </a>
        </section>

        <!-- 趣味互动 -->
        <section class="fun-section">
          <h3 class="section-title">🎮 趣味互动</h3>
          <div class="fun-grid">
            <div class="fun-card" routerLink="/dubbing">
              <span class="fun-icon">🎬</span>
              <span class="fun-name">配音</span>
            </div>
            <div class="fun-card" routerLink="/songs">
              <span class="fun-icon">🎵</span>
              <span class="fun-name">儿歌</span>
            </div>
            <div class="fun-card" routerLink="/stories">
              <span class="fun-icon">📖</span>
              <span class="fun-name">故事</span>
            </div>
            <div class="fun-card" routerLink="/battle">
              <span class="fun-icon">⚔️</span>
              <span class="fun-name">对战</span>
            </div>
          </div>
        </section>

        <!-- 学习数据 -->
        <section class="stats-section">
          <div class="stats-card">
            <div class="stat-item">
              <span class="stat-value">{{ stats.totalWords }}</span>
              <span class="stat-label">总单词</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ stats.learnedWords }}</span>
              <span class="stat-label">已掌握</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ stats.masteryRate }}%</span>
              <span class="stat-label">掌握率</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ badgeCount }}</span>
              <span class="stat-label">勋章</span>
            </div>
          </div>
        </section>

        <!-- 我的勋章预览 -->
        <section class="badges-preview">
          <div class="section-header">
            <h3 class="section-title">🏆 我的勋章</h3>
            <a routerLink="/badges" class="view-all">查看全部</a>
          </div>
          <div class="badges-list">
            <div class="badge-item" *ngFor="let badge of recentBadges">
              <span class="badge-icon">{{ getBadgeIcon(badge.badgeId) }}</span>
            </div>
            <div class="badge-item empty" *ngIf="recentBadges.length === 0">
              <span class="empty-text">快去学习，获得你的第一枚勋章吧！</span>
            </div>
          </div>
        </section>
      </main>

      <!-- 底部导航 -->
      <nav class="bottom-nav">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item">
          <span class="nav-icon">🏠</span>
          <span class="nav-label">首页</span>
        </a>
        <a routerLink="/words" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">📚</span>
          <span class="nav-label">单词</span>
        </a>
        <a routerLink="/sentences" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">💬</span>
          <span class="nav-label">句型</span>
        </a>
        <a routerLink="/my" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">👤</span>
          <span class="nav-label">我的</span>
        </a>
      </nav>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .app-container {
      min-height: 100vh;
      padding-bottom: 80px;
    }

    .lower-segment {
      --primary-color: #FF6B9D;
      --primary-light: #FFB6C1;
      --primary-gradient: linear-gradient(135deg, #FF6B9D 0%, #FFB347 100%);
      background: linear-gradient(180deg, #FFF5F8 0%, #FFF0E5 100%);
    }

    .upper-segment {
      --primary-color: #4A90D9;
      --primary-light: #87CEEB;
      --primary-gradient: linear-gradient(135deg, #4A90D9 0%, #2ECC71 100%);
      background: linear-gradient(180deg, #F0F8FF 0%, #F0FFF0 100%);
    }

    /* Header */
    .app-header {
      padding: 16px;
      background: var(--primary-gradient);
      color: white;
    }

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .avatar {
      font-size: 36px;
      background: white;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }

    .user-details {
      display: flex;
      flex-direction: column;
    }

    .nickname {
      font-size: 18px;
      font-weight: 600;
    }

    .grade-tag {
      font-size: 12px;
      opacity: 0.9;
      background: rgba(255,255,255,0.2);
      padding: 2px 8px;
      border-radius: 10px;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .coins {
      display: flex;
      align-items: center;
      gap: 4px;
      background: rgba(255,255,255,0.2);
      padding: 4px 12px;
      border-radius: 20px;
    }

    .coin-icon { font-size: 16px; }
    .coin-count { font-size: 14px; font-weight: 600; }

    .streak-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      background: rgba(255,255,255,0.2);
      border: none;
      padding: 6px 12px;
      border-radius: 20px;
      color: white;
      cursor: pointer;
    }

    .streak-btn.checked {
      background: #FFD700;
      color: #333;
    }

    /* Segment Switch */
    .segment-switch {
      display: flex;
      background: rgba(255,255,255,0.2);
      border-radius: 20px;
      padding: 3px;
    }

    .segment-btn {
      flex: 1;
      padding: 8px 16px;
      border: none;
      background: transparent;
      color: white;
      font-size: 13px;
      border-radius: 18px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .segment-btn.active {
      background: white;
      color: var(--primary-color);
      font-weight: 600;
    }

    /* Main Content */
    .app-main {
      padding: 16px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }

    /* Daily Tasks */
    .daily-tasks {
      background: white;
      border-radius: 16px;
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    }

    .task-progress {
      font-size: 14px;
      color: var(--primary-color);
      font-weight: 600;
    }

    .tasks-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .task-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: #f8f9fa;
      border-radius: 12px;
      transition: all 0.3s;
    }

    .task-card.completed {
      background: #e8f5e9;
    }

    .task-icon {
      font-size: 24px;
    }

    .task-info {
      flex: 1;
    }

    .task-title {
      font-size: 14px;
      font-weight: 500;
      color: #333;
      display: block;
      margin-bottom: 6px;
    }

    .task-progress-bar {
      height: 6px;
      background: #e0e0e0;
      border-radius: 3px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: var(--primary-gradient);
      border-radius: 3px;
      transition: width 0.3s;
    }

    .task-reward {
      font-size: 14px;
      color: #FFD700;
      font-weight: 600;
    }

    .task-done {
      font-size: 18px;
      color: #4CAF50;
    }

    /* Main Features */
    .main-features {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 16px;
    }

    .feature-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      background: white;
      border-radius: 16px;
      text-decoration: none;
      color: inherit;
      box-shadow: 0 2px 12px rgba(0,0,0,0.05);
      transition: all 0.3s;
    }

    .feature-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    .feature-card.words {
      background: linear-gradient(135deg, #FFF5F8 0%, #FFE4E9 100%);
      border-left: 4px solid #FF6B9D;
    }

    .feature-card.sentences {
      background: linear-gradient(135deg, #F0F8FF 0%, #E6F3FF 100%);
      border-left: 4px solid #4A90D9;
    }

    .feature-icon {
      font-size: 32px;
    }

    .feature-content {
      flex: 1;
    }

    .feature-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      display: block;
    }

    .feature-desc {
      font-size: 12px;
      color: #666;
    }

    .feature-arrow {
      font-size: 24px;
      color: #ccc;
    }

    /* Fun Section */
    .fun-section {
      margin-bottom: 16px;
    }

    .fun-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }

    .fun-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 16px 8px;
      background: white;
      border-radius: 12px;
      cursor: pointer;
      text-decoration: none;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      transition: all 0.3s;
    }

    .fun-card:hover {
      transform: translateY(-2px);
    }

    .fun-icon {
      font-size: 28px;
    }

    .fun-name {
      font-size: 12px;
      color: #666;
    }

    /* Stats */
    .stats-section {
      margin-bottom: 16px;
    }

    .stats-card {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      background: white;
      padding: 16px;
      border-radius: 16px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    }

    .stat-item {
      text-align: center;
    }

    .stat-value {
      display: block;
      font-size: 20px;
      font-weight: 700;
      color: var(--primary-color);
    }

    .stat-label {
      font-size: 11px;
      color: #999;
    }

    /* Badges Preview */
    .badges-preview {
      background: white;
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    }

    .view-all {
      font-size: 12px;
      color: var(--primary-color);
      text-decoration: none;
    }

    .badges-list {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .badge-item {
      width: 48px;
      height: 48px;
      background: #f5f5f5;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }

    .badge-item.empty {
      width: 100%;
      height: auto;
      background: transparent;
      font-size: 14px;
      color: #999;
    }

    .empty-text {
      font-size: 14px;
    }

    /* Bottom Nav */
    .bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-around;
      background: white;
      padding: 8px 0 calc(8px + env(safe-area-inset-bottom));
      box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
      z-index: 100;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      text-decoration: none;
      color: #999;
      padding: 4px 16px;
    }

    .nav-item.active {
      color: var(--primary-color);
    }

    .nav-icon {
      font-size: 24px;
    }

    .nav-label {
      font-size: 11px;
    }
  `]
})
export class HomeComponent implements OnInit {
  profile: UserProfile | null = null;
  tasks: DailyTask[] = [];
  stats = { totalWords: 150, learnedWords: 0, masteryRate: 0 };
  badgeCount = 0;
  recentBadges: any[] = [];
  todayChecked = false;

  constructor(
    private kiddoService: KiddoService,
    private wordService: WordService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.kiddoService.getUserProfile().subscribe(profile => {
      this.profile = profile;
    });

    this.kiddoService.getDailyTasks().subscribe(tasks => {
      this.tasks = tasks;
    });

    this.kiddoService.getUserBadges().subscribe(badges => {
      this.badgeCount = badges.length;
      this.recentBadges = badges.slice(-5);
    });

    this.stats = this.wordService.getLearningStats();
    
    // 检查今日是否已打卡
    const lastCheckIn = localStorage.getItem('kiddo_lastCheckIn');
    this.todayChecked = lastCheckIn === new Date().toDateString();
  }

  get completedTasks(): number {
    return this.tasks.filter(t => t.completed).length;
  }

  getGradeDisplay(): string {
    if (!this.profile) return '';
    const grades = ['一', '二', '三', '四', '五', '六'];
    return `${grades[this.profile.grade - 1]}年级 · ${this.profile.segment === 'lower' ? '低段' : '高段'}`;
  }

  setSegment(segment: SegmentLevel): void {
    const grade = segment === 'lower' ? 2 : 5;
    this.kiddoService.updateUserProfile({ segment, grade });
  }

  checkIn(): void {
    if (!this.todayChecked) {
      this.kiddoService.checkIn();
      this.todayChecked = true;
    }
  }

  getTaskIcon(type: string): string {
    const icons: Record<string, string> = {
      'word_learn': '📖',
      'word_review': '✍️',
      'sentence_learn': '💬',
      'practice': '🎯',
      'dubbing': '🎬'
    };
    return icons[type] || '📝';
  }

  getBadgeIcon(badgeId: string): string {
    const badge = this.kiddoService.getAllBadges().find(b => b.id === badgeId);
    return badge?.icon || '🏅';
  }
}