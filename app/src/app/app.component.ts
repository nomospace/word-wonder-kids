import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { GradeSelectorComponent } from './components/grade-selector/grade-selector.component';
import { WordCardComponent } from './components/word-card/word-card.component';
import { WordService } from './services/word.service';
import { Word } from './models/word.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, GradeSelectorComponent, WordCardComponent],
  template: `
    <div class="app-container">
      <!-- 头部 -->
      <header class="app-header">
        <div class="header-content">
          <h1 class="app-title">
            <span class="title-icon material-icons-round">pets</span>
            Word Wonder Kids
          </h1>
          <p class="app-subtitle">快乐学英语，好玩不枯燥！</p>
        </div>
      </header>

      <!-- 主要内容 -->
      <main class="app-main">
        <!-- 年级选择 -->
        <app-grade-selector></app-grade-selector>

        <!-- 学习统计 -->
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
        </div>

        <!-- 单词卡片 -->
        <div class="card-section">
          <h2 class="section-title">今日单词</h2>
          <app-word-card 
            *ngIf="currentWord" 
            [word]="currentWord"
            (audioPlayed)="onAudioPlayed()">
          </app-word-card>
          
          <div class="card-controls">
            <button class="control-btn prev" (click)="prevWord()">
              ⬅️ 上一个
            </button>
            <button class="control-btn random" (click)="randomWord()">
              <span class="material-icons-round" style="font-size:1rem;vertical-align:middle;margin-right:4px;">shuffle</span>随机
            </button>
            <button class="control-btn next" (click)="nextWord()">
              下一个 ➡️
            </button>
          </div>
        </div>

        <!-- 功能入口 -->
        <div class="features-grid">
          <a routerLink="/learn" class="feature-card learn">
            <span class="feature-icon material-icons-round">menu_book</span>
            <span class="feature-title">学习</span>
            <span class="feature-desc">单词卡片学习</span>
          </a>
          <a routerLink="/game" class="feature-card game">
            <span class="feature-icon material-icons-round">sports_esports</span>
            <span class="feature-title">游戏</span>
            <span class="feature-desc">趣味练习</span>
          </a>
          <a routerLink="/progress" class="feature-card progress">
            <span class="feature-icon material-icons-round">insights</span>
            <span class="feature-title">进度</span>
            <span class="feature-desc">学习报告</span>
          </a>
          <a routerLink="/settings" class="feature-card settings">
            <span class="feature-icon material-icons-round">settings</span>
            <span class="feature-title">设置</span>
            <span class="feature-desc">个性化配置</span>
          </a>
        </div>
      </main>

      <!-- 底部导航 -->
      <nav class="bottom-nav">
        <a routerLink="/" routerLinkActive="active" class="nav-item">
          <span class="nav-icon material-icons-round">home</span>
          <span class="nav-label">首页</span>
        </a>
        <a routerLink="/learn" routerLinkActive="active" class="nav-item">
          <span class="nav-icon material-icons-round">school</span>
          <span class="nav-label">学习</span>
        </a>
        <a routerLink="/game" routerLinkActive="active" class="nav-item">
          <span class="nav-icon material-icons-round">sports_esports</span>
          <span class="nav-label">游戏</span>
        </a>
        <a routerLink="/progress" routerLinkActive="active" class="nav-item">
          <span class="nav-icon material-icons-round">trending_up</span>
          <span class="nav-label">进度</span>
        </a>
        <a routerLink="/settings" routerLinkActive="active" class="nav-item">
          <span class="nav-icon material-icons-round">settings</span>
          <span class="nav-label">设置</span>
        </a>
      </nav>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(180deg, #f5f7fa 0%, #e4e8ec 100%);
      padding-bottom: 80px;
    }

    .app-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem 1rem;
      text-align: center;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .app-title {
      font-size: 2rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .title-icon {
      font-size: 2.5rem;
    }

    .material-icons-round {
      font-family: 'Material Icons Round';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-feature-settings: 'liga';
      -webkit-font-smoothing: antialiased;
    }

    .app-subtitle {
      font-size: 1rem;
      opacity: 0.9;
      margin: 0;
    }

    .app-main {
      max-width: 800px;
      margin: 0 auto;
      padding: 1.5rem 1rem;
    }

    .stats-card {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      background: white;
      padding: 1.5rem;
      border-radius: 1rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      margin-bottom: 1.5rem;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
    }

    .stat-value {
      font-size: 1.75rem;
      font-weight: 700;
      color: #667eea;
    }

    .stat-label {
      font-size: 0.75rem;
      color: #999;
    }

    .card-section {
      background: white;
      padding: 1.5rem;
      border-radius: 1rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      margin-bottom: 1.5rem;
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #333;
      margin: 0 0 1rem 0;
      text-align: center;
    }

    .card-controls {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
      margin-top: 1.5rem;
    }

    .control-btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .control-btn.prev {
      background: #f0f0f0;
      color: #666;
    }

    .control-btn.random {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .control-btn.next {
      background: #f0f0f0;
      color: #666;
    }

    .control-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    }

    .control-btn:active {
      transform: translateY(0);
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .feature-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5rem;
      border-radius: 1rem;
      text-decoration: none;
      transition: all 0.3s;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    }

    .feature-card.learn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .feature-card.game {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
    }

    .feature-card.progress {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
    }

    .feature-card.settings {
      background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
      color: white;
    }

    .feature-icon {
      font-size: 3rem;
      margin-bottom: 0.5rem;
    }

    .feature-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
    }

    .feature-desc {
      font-size: 0.875rem;
      opacity: 0.9;
    }

    .bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: white;
      display: flex;
      justify-content: space-around;
      padding: 0.5rem 0;
      box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.08);
      z-index: 100;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      color: #999;
      padding: 0.5rem;
      transition: all 0.2s;
      min-width: 60px;
    }

    .nav-item.active {
      color: #667eea;
    }

    .nav-icon {
      font-size: 1.75rem;
      margin-bottom: 0.25rem;
    }

    .nav-label {
      font-size: 0.75rem;
      font-weight: 500;
    }

    @media (max-width: 640px) {
      .app-title {
        font-size: 1.5rem;
      }

      .title-icon {
        font-size: 2rem;
      }

      .stats-card {
        padding: 1rem;
      }

      .stat-value {
        font-size: 1.5rem;
      }

      .features-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .feature-card {
        padding: 1rem;
      }

      .feature-icon {
        font-size: 2rem;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  currentWord: Word | null = null;
  wordIndex = 0;
  words: Word[] = [];
  stats = { totalWords: 0, learnedWords: 0, masteryRate: 0 };

  constructor(private wordService: WordService) {}

  ngOnInit(): void {
    this.loadWords();
    this.updateStats();
  }

  loadWords(): void {
    this.words = this.wordService.getCurrentGradeWords();
    if (this.words.length > 0) {
      this.currentWord = this.words[0];
    }
  }

  updateStats(): void {
    this.stats = this.wordService.getLearningStats();
  }

  nextWord(): void {
    if (this.words.length === 0) return;
    this.wordIndex = (this.wordIndex + 1) % this.words.length;
    this.currentWord = this.words[this.wordIndex];
  }

  prevWord(): void {
    if (this.words.length === 0) return;
    this.wordIndex = (this.wordIndex - 1 + this.words.length) % this.words.length;
    this.currentWord = this.words[this.wordIndex];
  }

  randomWord(): void {
    if (this.words.length === 0) return;
    this.wordIndex = Math.floor(Math.random() * this.words.length);
    this.currentWord = this.words[this.wordIndex];
  }

  onAudioPlayed(): void {
    // 可以添加音效播放统计
  }
}
