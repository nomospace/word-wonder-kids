import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GradeSelectorComponent } from '../../components/grade-selector/grade-selector.component';
import { WordCardComponent } from '../../components/word-card/word-card.component';
import { IconComponent } from '../../components/icon/icon.component';
import { WordService } from '../../services/word.service';
import { Word } from '../../models/word.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, GradeSelectorComponent, WordCardComponent, IconComponent],
  template: `
    <div class="app-container">
      <!-- 头部 -->
      <header class="app-header">
        <div class="header-content">
          <h1 class="app-title">
            <svg class="title-icon" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#FFD700"/>
                  <stop offset="100%" style="stop-color:#FFA500"/>
                </linearGradient>
              </defs>
              <path d="M60 10 L70 40 L100 40 L75 60 L85 90 L60 70 L35 90 L45 60 L20 40 L50 40 Z" fill="url(#titleGrad)"/>
            </svg>
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
              <svg class="btn-icon" viewBox="0 0 24 24">
                <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5z" fill="currentColor"/>
              </svg>
              随机
            </button>
            <button class="control-btn next" (click)="nextWord()">
              下一个 ➡️
            </button>
          </div>
        </div>

        <!-- 功能入口 -->
        <div class="features-grid">
          <a routerLink="/learn" class="feature-card learn">
            <svg class="feature-icon" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="bookGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#FF6B6B"/>
                  <stop offset="100%" style="stop-color:#EE5A5A"/>
                </linearGradient>
                <linearGradient id="bookGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#4ECDC4"/>
                  <stop offset="100%" style="stop-color:#44B3AB"/>
                </linearGradient>
                <linearGradient id="bookGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#45B7D1"/>
                  <stop offset="100%" style="stop-color:#3AA3BD"/>
                </linearGradient>
              </defs>
              <g transform="translate(15,25)">
                <rect x="0" y="0" width="70" height="50" rx="4" fill="url(#bookGrad3)" transform="rotate(-5)"/>
                <rect x="5" y="5" width="70" height="50" rx="4" fill="url(#bookGrad2)" transform="rotate(0)"/>
                <rect x="10" y="10" width="70" height="50" rx="4" fill="url(#bookGrad1)" transform="rotate(5)"/>
                <line x1="20" y1="20" x2="70" y2="20" stroke="white" stroke-width="2" opacity="0.5"/>
                <line x1="20" y1="30" x2="70" y2="30" stroke="white" stroke-width="2" opacity="0.5"/>
                <line x1="20" y1="40" x2="60" y2="40" stroke="white" stroke-width="2" opacity="0.5"/>
              </g>
            </svg>
            <span class="feature-title">学习</span>
            <span class="feature-desc">单词卡片学习</span>
          </a>
          <a routerLink="/game" class="feature-card game">
            <svg class="feature-icon" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#667eea"/>
                  <stop offset="100%" style="stop-color:#764ba2"/>
                </linearGradient>
              </defs>
              <rect x="20" y="35" width="80" height="50" rx="12" fill="url(#gameGrad)"/>
              <circle cx="45" cy="60" r="8" fill="#333" opacity="0.5"/>
              <circle cx="75" cy="60" r="8" fill="#333" opacity="0.5"/>
              <circle cx="45" cy="60" r="4" fill="#FF6B6B"/>
              <circle cx="75" cy="60" r="4" fill="#4ECDC4"/>
              <rect x="35" y="50" width="8" height="20" rx="2" fill="#333" opacity="0.3"/>
              <rect x="43" y="55" width="20" height="8" rx="2" fill="#333" opacity="0.3"/>
              <circle cx="95" cy="45" r="5" fill="#FFE66D"/>
              <circle cx="95" cy="65" r="5" fill="#95E1D3"/>
            </svg>
            <span class="feature-title">游戏</span>
            <span class="feature-desc">趣味练习</span>
          </a>
          <a routerLink="/progress" class="feature-card progress">
            <svg class="feature-icon" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="barGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#667eea"/>
                  <stop offset="100%" style="stop-color:#5568d3"/>
                </linearGradient>
                <linearGradient id="barGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#f093fb"/>
                  <stop offset="100%" style="stop-color:#d67ee8"/>
                </linearGradient>
                <linearGradient id="barGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#4facfe"/>
                  <stop offset="100%" style="stop-color:#3a9be8"/>
                </linearGradient>
              </defs>
              <rect x="15" y="30" width="90" height="65" rx="6" fill="#f8f9fa" stroke="#e0e0e0" stroke-width="2"/>
              <rect x="25" y="50" width="18" height="35" rx="2" fill="url(#barGrad1)"/>
              <rect x="50" y="60" width="18" height="25" rx="2" fill="url(#barGrad2)"/>
              <rect x="75" y="40" width="18" height="45" rx="2" fill="url(#barGrad3)"/>
            </svg>
            <span class="feature-title">进度</span>
            <span class="feature-desc">学习报告</span>
          </a>
          <a routerLink="/settings" class="feature-card settings">
            <svg class="feature-icon" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#43e97b"/>
                  <stop offset="100%" style="stop-color:#38f9d7"/>
                </linearGradient>
              </defs>
              <g transform="translate(60,60)">
                <path d="M0,-35 L8,-35 L12,-28 L20,-28 L24,-20 L32,-20 L35,-12 L42,-8 L42,8 L35,12 L32,20 L24,20 L20,28 L12,28 L8,35 L-8,35 L-12,28 L-20,28 L-24,20 L-32,20 L-35,12 L-42,8 L-42,-8 L-35,-12 L-32,-20 L-24,-20 L-20,-28 L-12,-28 L-8,-35 Z" 
                      fill="url(#gearGrad)" transform="rotate(0)"/>
                <circle cx="0" cy="0" r="15" fill="white" opacity="0.3"/>
                <circle cx="0" cy="0" r="10" fill="url(#gearGrad)"/>
              </g>
            </svg>
            <span class="feature-title">设置</span>
            <span class="feature-desc">个性化配置</span>
          </a>
        </div>
      </main>

      <!-- 底部导航 -->
      <nav class="bottom-nav">
        <a routerLink="/" routerLinkActive="active" class="nav-item">
          <svg class="nav-icon" viewBox="0 0 24 24">
            <path d="M12 3L4 9v12h5v-7h6v7h5V9z" fill="currentColor"/>
            <rect x="10" y="14" width="4" height="7" fill="white" opacity="0.3"/>
          </svg>
          <span class="nav-label">首页</span>
        </a>
        <a routerLink="/learn" routerLinkActive="active" class="nav-item">
          <svg class="nav-icon" viewBox="0 0 24 24">
            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" fill="currentColor"/>
          </svg>
          <span class="nav-label">学习</span>
        </a>
        <a routerLink="/game" routerLinkActive="active" class="nav-item">
          <svg class="nav-icon" viewBox="0 0 24 24">
            <rect x="3" y="8" width="18" height="8" rx="2" fill="currentColor"/>
            <circle cx="8" cy="12" r="1.5" fill="white" opacity="0.5"/>
            <circle cx="16" cy="12" r="1.5" fill="white" opacity="0.5"/>
          </svg>
          <span class="nav-label">游戏</span>
        </a>
        <a routerLink="/progress" routerLinkActive="active" class="nav-item">
          <svg class="nav-icon" viewBox="0 0 24 24">
            <rect x="4" y="10" width="4" height="10" rx="1" fill="currentColor" opacity="0.7"/>
            <rect x="10" y="6" width="4" height="14" rx="1" fill="currentColor"/>
            <rect x="16" y="13" width="4" height="7" rx="1" fill="currentColor" opacity="0.5"/>
          </svg>
          <span class="nav-label">进度</span>
        </a>
        <a routerLink="/settings" routerLinkActive="active" class="nav-item">
          <svg class="nav-icon" viewBox="0 0 24 24">
            <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="currentColor"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" opacity="0.5"/>
          </svg>
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
      gap: 0.75rem;
    }

    .title-icon {
      width: 50px;
      height: 50px;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
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
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .control-btn.prev, .control-btn.next {
      background: #f0f0f0;
      color: #666;
    }

    .control-btn.random {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .control-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    }

    .control-btn:active {
      transform: translateY(0);
    }

    .btn-icon {
      width: 16px;
      height: 16px;
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
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .feature-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }

    .feature-card:hover::before {
      left: 100%;
    }

    .feature-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    }

    .feature-card:active {
      transform: translateY(-4px) scale(0.98);
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
      width: 80px;
      height: 80px;
      margin-bottom: 0.5rem;
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .feature-card:hover .feature-icon {
      transform: scale(1.15) rotate(5deg);
    }

    .feature-card:active .feature-icon {
      transform: scale(0.95);
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
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.95);
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      color: #999;
      padding: 0.5rem 1rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      min-width: 60px;
      position: relative;
    }

    .nav-item::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 3px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 3px 3px 0 0;
      transition: all 0.3s;
      transform: translateX(-50%);
    }

    .nav-item.active {
      color: #667eea;
    }

    .nav-item.active::before {
      width: 20px;
    }

    .nav-item:hover {
      color: #667eea;
      transform: translateY(-2px);
    }

    .nav-icon {
      width: 28px;
      height: 28px;
      margin-bottom: 0.25rem;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .nav-item:hover .nav-icon {
      transform: scale(1.2) translateY(-2px);
    }

    .nav-item.active .nav-icon {
      animation: celebrate 0.5s ease-in-out;
    }

    .nav-label {
      font-size: 0.75rem;
      font-weight: 500;
    }

    @keyframes celebrate {
      0%, 100% {
        transform: scale(1) rotate(0deg);
      }
      25% {
        transform: scale(1.2) rotate(-10deg);
      }
      50% {
        transform: scale(1.2) rotate(10deg);
      }
      75% {
        transform: scale(1.2) rotate(-10deg);
      }
    }

    @media (max-width: 640px) {
      .app-title {
        font-size: 1.5rem;
      }

      .title-icon {
        width: 40px;
        height: 40px;
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
        width: 60px;
        height: 60px;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
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
