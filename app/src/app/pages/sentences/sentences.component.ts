import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { KiddoService } from '../../services/kiddo.service';
import { TtsService } from '../../services/tts.service';
import { SentencePattern } from '../../models/kiddo.model';
import { SENTENCE_DATABASE, getSentencesByGradeRange } from '../../data/sentence-data';
import { UserProfile } from '../../models/kiddo.model';

type LearnMode = 'menu' | 'learn' | 'practice' | 'result';

@Component({
  selector: 'app-sentences',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="sentences-container" [class.lower]="profile?.segment === 'lower'" [class.upper]="profile?.segment === 'upper'">
      <header class="page-header">
        <button class="back-btn" (click)="goBack()">‹ 返回</button>
        <h1 class="page-title">💬 句型小课堂</h1>
        <div class="header-stats"></div>
      </header>

      <!-- 菜单 -->
      <div class="menu-view" *ngIf="mode === 'menu'">
        <div class="intro-card">
          <p class="intro-text">学习日常句型，让你的英语更地道！</p>
        </div>

        <div class="category-tabs">
          <button 
            *ngFor="let cat of categories"
            class="cat-tab"
            [class.active]="selectedCategory === cat.id"
            (click)="selectCategory(cat.id)">
            {{ cat.name }}
          </button>
        </div>

        <div class="sentences-list">
          <div 
            *ngFor="let s of filteredSentences"
            class="sentence-card"
            (click)="startLearn(s)">
            <div class="sentence-main">
              <span class="sentence-pattern">{{ s.pattern }}</span>
              <span class="sentence-chinese">{{ s.chinese }}</span>
            </div>
            <span class="sentence-arrow">›</span>
          </div>
        </div>
      </div>

      <!-- 学习 -->
      <div class="learn-view" *ngIf="mode === 'learn' && currentSentence">
        <div class="learn-header">
          <span class="learn-progress">{{ currentIndex + 1 }} / {{ sentences.length }}</span>
        </div>

        <div class="sentence-detail">
          <div class="pattern-card">
            <h2 class="pattern-text">{{ currentSentence.pattern }}</h2>
            <p class="pattern-chinese">{{ currentSentence.chinese }}</p>
          </div>

          <div class="example-section">
            <h4>例句</h4>
            <div class="example-card">
              <p class="example-en">"{{ currentSentence.example }}"</p>
              <p class="example-cn">{{ currentSentence.exampleChinese }}</p>
              <button class="speak-btn" (click)="speak(currentSentence.example)">🔊</button>
            </div>
          </div>

          <div class="scene-section">
            <h4>使用场景</h4>
            <p class="scene-text">📍 {{ currentSentence.scene }}</p>
          </div>

          <!-- 低段：填空练习 -->
          <div class="practice-section" *ngIf="profile?.segment === 'lower'">
            <h4>填空练习</h4>
            <div class="fill-blank">
              <p class="blank-sentence">This is a ___. (cat)</p>
              <div class="word-chips">
                <span class="chip" *ngFor="let w of practiceWords" (click)="selectWord(w)">{{ w }}</span>
              </div>
            </div>
          </div>

          <!-- 高段：句型仿写 -->
          <div class="practice-section" *ngIf="profile?.segment === 'upper'">
            <h4>句型仿写</h4>
            <p class="practice-hint">用所学句型，试着造一个新句子吧！</p>
            <textarea class="practice-input" placeholder="输入你的句子..."></textarea>
          </div>
        </div>

        <div class="nav-buttons">
          <button class="nav-btn prev" (click)="prevSentence()" [disabled]="currentIndex === 0">
            ◀ 上一个
          </button>
          <button class="nav-btn next" (click)="nextSentence()">
            {{ currentIndex < sentences.length - 1 ? '下一个 ▶' : '完成' }}
          </button>
        </div>
      </div>

      <!-- 结果 -->
      <div class="result-view" *ngIf="mode === 'result'">
        <div class="result-card">
          <span class="result-icon">🎉</span>
          <h2>学习完成！</h2>
          <p>你学习了 {{ learnedCount }} 个句型</p>
          <button class="result-btn" (click)="goHome()">返回首页</button>
        </div>
      </div>

      <!-- 底部导航 -->
      <nav class="bottom-nav">
        <a routerLink="/" class="nav-item">
          <span class="nav-icon">🏠</span>
          <span class="nav-label">首页</span>
        </a>
        <a routerLink="/words" class="nav-item">
          <span class="nav-icon">📚</span>
          <span class="nav-label">单词</span>
        </a>
        <a routerLink="/sentences" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">💬</span>
          <span class="nav-label">句型</span>
        </a>
        <a routerLink="/my" class="nav-item">
          <span class="nav-icon">👤</span>
          <span class="nav-label">我的</span>
        </a>
      </nav>
    </div>
  `,
  styles: [`
    .sentences-container {
      min-height: 100vh;
      padding-bottom: 80px;
    }

    .lower { --primary: #FF6B9D; --bg: #FFF5F8; background: var(--bg); }
    .upper { --primary: #4A90D9; --bg: #F0F8FF; background: var(--bg); }

    .page-header {
      display: flex;
      align-items: center;
      padding: 16px;
      background: var(--primary);
      color: white;
    }

    .back-btn {
      background: none;
      border: none;
      color: white;
      font-size: 16px;
      cursor: pointer;
    }

    .page-title {
      flex: 1;
      text-align: center;
      font-size: 18px;
    }

    .menu-view { padding: 16px; }

    .intro-card {
      background: white;
      padding: 16px;
      border-radius: 12px;
      margin-bottom: 16px;
    }

    .intro-text { text-align: center; color: #666; }

    .category-tabs {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 8px;
      margin-bottom: 16px;
    }

    .cat-tab {
      padding: 8px 16px;
      background: white;
      border: none;
      border-radius: 20px;
      font-size: 13px;
      white-space: nowrap;
      cursor: pointer;
    }

    .cat-tab.active {
      background: var(--primary);
      color: white;
    }

    .sentences-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .sentence-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      background: white;
      border-radius: 12px;
      cursor: pointer;
    }

    .sentence-main {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .sentence-pattern { font-weight: 600; }
    .sentence-chinese { font-size: 12px; color: #666; }
    .sentence-arrow { color: #ccc; font-size: 20px; }

    /* Learn View */
    .learn-view { padding: 16px; }

    .learn-header {
      text-align: center;
      margin-bottom: 16px;
      color: #666;
    }

    .sentence-detail {
      background: white;
      border-radius: 16px;
      padding: 20px;
    }

    .pattern-card {
      text-align: center;
      padding: 20px;
      background: var(--bg);
      border-radius: 12px;
      margin-bottom: 20px;
    }

    .pattern-text {
      font-size: 24px;
      margin: 0 0 8px 0;
    }

    .pattern-chinese {
      color: #666;
      margin: 0;
    }

    .example-section, .scene-section, .practice-section {
      margin-bottom: 20px;
    }

    .example-section h4, .scene-section h4, .practice-section h4 {
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
    }

    .example-card {
      background: #f8f9fa;
      padding: 16px;
      border-radius: 12px;
      position: relative;
    }

    .example-en { font-weight: 500; margin: 0 0 8px 0; }
    .example-cn { font-size: 13px; color: #666; margin: 0; }
    .speak-btn {
      position: absolute;
      right: 12px;
      top: 12px;
      background: var(--primary);
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
    }

    .scene-text { margin: 0; }

    .practice-hint { font-size: 13px; color: #999; }

    .word-chips {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 12px;
    }

    .chip {
      padding: 8px 16px;
      background: white;
      border: 2px solid #eee;
      border-radius: 20px;
      cursor: pointer;
    }

    .practice-input {
      width: 100%;
      min-height: 80px;
      padding: 12px;
      border: 2px solid #eee;
      border-radius: 12px;
      font-size: 14px;
      resize: none;
    }

    .nav-buttons {
      display: flex;
      gap: 16px;
      margin-top: 20px;
    }

    .nav-btn {
      flex: 1;
      padding: 16px;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      cursor: pointer;
    }

    .nav-btn.prev { background: #f0f0f0; }
    .nav-btn.next { background: var(--primary); color: white; }

    /* Result */
    .result-view {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
    }

    .result-card {
      text-align: center;
      background: white;
      padding: 32px;
      border-radius: 20px;
    }

    .result-icon { font-size: 48px; }
    .result-btn {
      margin-top: 16px;
      padding: 12px 32px;
      background: var(--primary);
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
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
      z-index: 100;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      text-decoration: none;
      color: #999;
    }

    .nav-item.active { color: var(--primary); }
    .nav-icon { font-size: 24px; }
    .nav-label { font-size: 11px; }
  `]
})
export class SentencesComponent implements OnInit {
  profile: UserProfile | null = null;
  mode: LearnMode = 'menu';
  
  sentences: SentencePattern[] = [];
  filteredSentences: SentencePattern[] = [];
  currentSentence: SentencePattern | null = null;
  currentIndex = 0;
  learnedCount = 0;
  selectedCategory = 'all';
  
  practiceWords: string[] = ['cat', 'dog', 'bird', 'fish'];
  
  categories = [
    { id: 'all', name: '全部' },
    { id: 'greetings', name: '问候' },
    { id: 'introduction', name: '自我介绍' },
    { id: 'daily', name: '日常' },
    { id: 'question', name: '提问' },
    { id: 'description', name: '描述' }
  ];

  constructor(
    private kiddoService: KiddoService,
    private ttsService: TtsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.kiddoService.getUserProfile().subscribe(p => {
      this.profile = p;
      if (p) {
        const minGrade = p.segment === 'lower' ? 1 : 4;
        const maxGrade = p.segment === 'lower' ? 3 : 6;
        this.sentences = getSentencesByGradeRange(minGrade, maxGrade);
        this.filteredSentences = this.sentences;
      }
    });
  }

  selectCategory(catId: string): void {
    this.selectedCategory = catId;
    if (catId === 'all') {
      this.filteredSentences = this.sentences;
    } else {
      this.filteredSentences = this.sentences.filter(s => s.category === catId);
    }
  }

  startLearn(sentence: SentencePattern): void {
    this.mode = 'learn';
    this.currentSentence = sentence;
    this.currentIndex = this.sentences.findIndex(s => s.id === sentence.id);
  }

  nextSentence(): void {
    if (this.currentIndex < this.sentences.length - 1) {
      this.currentIndex++;
      this.currentSentence = this.sentences[this.currentIndex];
      this.learnedCount++;
      this.kiddoService.updateTaskProgress('sentence_learn', this.learnedCount);
    } else {
      this.mode = 'result';
      this.kiddoService.awardBadge('first_sentence');
    }
  }

  prevSentence(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentSentence = this.sentences[this.currentIndex];
    }
  }

  speak(text: string): void {
    this.ttsService.speak(text);
  }

  selectWord(word: string): void {
    alert('你选择了: ' + word);
  }

  goBack(): void {
    if (this.mode !== 'menu') {
      this.mode = 'menu';
    } else {
      this.router.navigate(['/']);
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}