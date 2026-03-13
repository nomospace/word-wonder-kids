import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WordService } from '../../services/word.service';
import { TtsService } from '../../services/tts.service';
import { Word, WordCategory } from '../../models/word.model';
import { GradeSelectorComponent } from '../../components/grade-selector/grade-selector.component';
import { WordCardComponent } from '../../components/word-card/word-card.component';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [CommonModule, RouterLink, GradeSelectorComponent, WordCardComponent],
  template: `
    <div class="learn-page">
      <div class="page-header">
        <a routerLink="/" class="back-btn">
          <span>⬅️</span> 返回
        </a>
        <h1>📚 单词学习</h1>
      </div>

      <app-grade-selector></app-grade-selector>

      <!-- 分类选择 -->
      <div class="category-filter">
        <button 
          *ngFor="let cat of categories"
          [class.active]="selectedCategory === cat.id"
          (click)="selectCategory(cat.id)"
          class="category-btn"
          [style.borderColor]="cat.color"
        >
          <span class="cat-icon">{{ cat.icon }}</span>
          <span class="cat-name">{{ cat.displayName }}</span>
        </button>
      </div>

      <!-- 单词列表 -->
      <div class="word-list">
        <div class="word-item" *ngFor="let word of filteredWords">
          <div class="word-info">
            <span class="word-en">{{ word.english }}</span>
            <span class="word-cn">{{ word.chinese }}</span>
          </div>
          <button class="play-btn" (click)="playWord(word)">
            🔊
          </button>
          <div class="mastery-indicator">
            <span *ngFor="let i of [1,2,3,4,5]" 
                  [class.filled]="i <= getMastery(word.id)"
                  class="mastery-dot">★</span>
          </div>
        </div>
      </div>

      <!-- 学习模式 -->
      <div class="learning-modes">
        <h3>学习模式</h3>
        <div class="mode-buttons">
          <button class="mode-btn" (click)="startPractice('flashcard')">
            📇 卡片模式
          </button>
          <button class="mode-btn" (click)="startPractice('quiz')">
            ❓ 测验模式
          </button>
          <button class="mode-btn" (click)="startPractice('spelling')">
            ✏️ 拼写模式
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .learn-page {
      min-height: 100vh;
      background: #f5f7fa;
      padding: 1rem;
      padding-bottom: 80px;
    }

    .page-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .back-btn {
      text-decoration: none;
      color: #667eea;
      font-weight: 600;
      font-size: 1rem;
    }

    .page-header h1 {
      margin: 0;
      font-size: 1.5rem;
      color: #333;
    }

    .category-filter {
      display: flex;
      gap: 0.5rem;
      overflow-x: auto;
      padding: 0.5rem 0;
      margin-bottom: 1rem;
      -webkit-overflow-scrolling: touch;
    }

    .category-btn {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.75rem 1rem;
      border: 2px solid #ddd;
      border-radius: 0.75rem;
      background: white;
      cursor: pointer;
      transition: all 0.2s;
    }

    .category-btn.active {
      border-color: #667eea;
      background: #f0f0ff;
    }

    .cat-icon {
      font-size: 1.5rem;
      margin-bottom: 0.25rem;
    }

    .cat-name {
      font-size: 0.75rem;
      font-weight: 500;
      color: #666;
    }

    .word-list {
      background: white;
      border-radius: 1rem;
      padding: 1rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      margin-bottom: 1.5rem;
    }

    .word-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-bottom: 1px solid #f0f0f0;
    }

    .word-item:last-child {
      border-bottom: none;
    }

    .word-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .word-en {
      font-size: 1.125rem;
      font-weight: 600;
      color: #333;
    }

    .word-cn {
      font-size: 0.875rem;
      color: #999;
    }

    .play-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      font-size: 1.25rem;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .play-btn:hover {
      transform: scale(1.1);
    }

    .mastery-indicator {
      display: flex;
      gap: 0.125rem;
    }

    .mastery-dot {
      color: #ddd;
      font-size: 0.875rem;
    }

    .mastery-dot.filled {
      color: #fbbf24;
    }

    .learning-modes {
      background: white;
      padding: 1.5rem;
      border-radius: 1rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    }

    .learning-modes h3 {
      margin: 0 0 1rem 0;
      color: #333;
    }

    .mode-buttons {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
    }

    .mode-btn {
      padding: 1rem;
      border: none;
      border-radius: 0.75rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .mode-btn:hover {
      transform: translateY(-2px);
    }

    @media (max-width: 640px) {
      .mode-buttons {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class LearnComponent implements OnInit {
  categories: WordCategory[] = [];
  selectedCategory: string | null = null;
  words: Word[] = [];

  constructor(
    private wordService: WordService,
    private ttsService: TtsService
  ) {}

  ngOnInit(): void {
    this.categories = this.wordService.getCategories();
    this.loadWords();
  }

  loadWords(): void {
    this.words = this.wordService.getCurrentGradeWords();
  }

  get filteredWords(): Word[] {
    if (!this.selectedCategory) return this.words;
    return this.words.filter(w => w.category === this.selectedCategory);
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory = this.selectedCategory === categoryId ? null : categoryId;
  }

  playWord(word: Word): void {
    this.ttsService.speakWord(word.english);
  }

  getMastery(wordId: number): number {
    return this.wordService.getWordMastery(wordId);
  }

  startPractice(mode: string): void {
    const modeNames: Record<string, string> = {
      'flashcard': '卡片模式',
      'quiz': '测验模式',
      'spelling': '拼写模式'
    };
    
    // 切换到对应模式（这里可以扩展为实际的学习界面）
    const words = this.filteredWords.length > 0 ? this.filteredWords : this.words;
    if (words.length === 0) {
      alert('暂无单词，请先选择年级哦！📚');
      return;
    }
    
    // 简单的反馈
    const emojis: Record<string, string> = {
      'flashcard': '📇',
      'quiz': '❓',
      'spelling': '✏️'
    };
    alert(`${emojis[mode]} 开始${modeNames[mode]}！\n\n共有 ${words.length} 个单词准备就绪～`);
  }
}
