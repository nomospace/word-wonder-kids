import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WordService } from '../../services/word.service';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="progress-page">
      <div class="page-header">
        <a routerLink="/" class="back-btn">⬅️ 返回</a>
        <h1>📊 学习进度</h1>
      </div>

      <!-- 总体统计 -->
      <div class="stats-overview">
        <div class="stat-card">
          <span class="stat-icon">📚</span>
          <span class="stat-value">{{ stats.totalWords }}</span>
          <span class="stat-label">总单词数</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">✅</span>
          <span class="stat-value">{{ stats.learnedWords }}</span>
          <span class="stat-label">已掌握</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">📈</span>
          <span class="stat-value">{{ stats.masteryRate }}%</span>
          <span class="stat-label">掌握率</span>
        </div>
      </div>

      <!-- 进度条 -->
      <div class="progress-card">
        <h3>学习进度</h3>
        <div class="progress-bar">
          <div class="progress-fill" [style.width.%]="stats.masteryRate"></div>
        </div>
        <p class="progress-text">{{ stats.learnedWords }} / {{ stats.totalWords }} 单词已掌握</p>
      </div>

      <!-- 按分类统计 -->
      <div class="category-stats">
        <h3>分类掌握情况</h3>
        <div class="category-item" *ngFor="let cat of categoryStats">
          <div class="cat-header">
            <span class="cat-icon">{{ cat.icon }}</span>
            <span class="cat-name">{{ cat.name }}</span>
            <span class="cat-count">{{ cat.mastered }}/{{ cat.total }}</span>
          </div>
          <div class="cat-progress">
            <div class="cat-progress-bar" [style.width.%]="cat.percentage" [style.backgroundColor]="cat.color"></div>
          </div>
        </div>
      </div>

      <!-- 需要复习的单词 -->
      <div class="review-section">
        <h3>📝 需要复习 ({{ reviewWords.length }})</h3>
        <div class="review-list" *ngIf="reviewWords.length > 0">
          <div class="review-item" *ngFor="let word of reviewWords.slice(0, 10)">
            <span class="word-en">{{ word.english }}</span>
            <span class="word-cn">{{ word.chinese }}</span>
          </div>
        </div>
        <p class="empty-message" *ngIf="reviewWords.length === 0">
          🎉 太棒了！没有需要复习的单词！
        </p>
      </div>

      <!-- 已掌握的单词 -->
      <div class="mastered-section">
        <h3>🏆 已掌握的单词 ({{ masteredWords.length }})</h3>
        <div class="mastered-list" *ngIf="masteredWords.length > 0">
          <div class="mastered-item" *ngFor="let word of masteredWords.slice(0, 10)">
            <span class="word-en">{{ word.english }}</span>
            <span class="mastery-stars">★★★★★</span>
          </div>
        </div>
      </div>

      <!-- 重置进度 -->
      <div class="reset-section">
        <button class="reset-btn" (click)="resetProgress()">
          🗑️ 重置学习进度
        </button>
      </div>
    </div>
  `,
  styles: [`
    .progress-page {
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
    }

    .page-header h1 {
      margin: 0;
      font-size: 1.5rem;
      color: #333;
    }

    .stats-overview {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 1rem;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    }

    .stat-icon {
      font-size: 2rem;
      display: block;
      margin-bottom: 0.5rem;
    }

    .stat-value {
      display: block;
      font-size: 1.75rem;
      font-weight: 700;
      color: #667eea;
    }

    .stat-label {
      font-size: 0.75rem;
      color: #999;
    }

    .progress-card {
      background: white;
      padding: 1.5rem;
      border-radius: 1rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      margin-bottom: 1.5rem;
    }

    .progress-card h3 {
      margin: 0 0 1rem 0;
      color: #333;
    }

    .progress-bar {
      height: 1rem;
      background: #e0e0e0;
      border-radius: 0.5rem;
      overflow: hidden;
      margin-bottom: 0.5rem;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      transition: width 0.5s ease;
    }

    .progress-text {
      margin: 0;
      color: #666;
      font-size: 0.875rem;
    }

    .category-stats {
      background: white;
      padding: 1.5rem;
      border-radius: 1rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      margin-bottom: 1.5rem;
    }

    .category-stats h3 {
      margin: 0 0 1rem 0;
      color: #333;
    }

    .category-item {
      margin-bottom: 1rem;
    }

    .cat-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.25rem;
    }

    .cat-icon {
      font-size: 1.25rem;
    }

    .cat-name {
      flex: 1;
      font-weight: 600;
      color: #333;
    }

    .cat-count {
      font-size: 0.875rem;
      color: #999;
    }

    .cat-progress {
      height: 0.5rem;
      background: #e0e0e0;
      border-radius: 0.25rem;
      overflow: hidden;
    }

    .cat-progress-bar {
      height: 100%;
      transition: width 0.5s ease;
    }

    .review-section, .mastered-section {
      background: white;
      padding: 1.5rem;
      border-radius: 1rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      margin-bottom: 1.5rem;
    }

    .review-section h3, .mastered-section h3 {
      margin: 0 0 1rem 0;
      color: #333;
    }

    .review-list, .mastered-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    .review-item, .mastered-item {
      display: flex;
      flex-direction: column;
      padding: 0.75rem;
      background: #f5f7fa;
      border-radius: 0.5rem;
    }

    .word-en {
      font-weight: 600;
      color: #333;
    }

    .word-cn {
      font-size: 0.875rem;
      color: #999;
    }

    .mastery-stars {
      color: #fbbf24;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }

    .empty-message {
      text-align: center;
      color: #666;
      padding: 2rem;
    }

    .reset-section {
      text-align: center;
      margin-top: 2rem;
    }

    .reset-btn {
      padding: 1rem 2rem;
      background: #fee2e2;
      color: #dc2626;
      border: none;
      border-radius: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .reset-btn:hover {
      background: #fecaca;
    }

    @media (max-width: 640px) {
      .stats-overview {
        grid-template-columns: 1fr;
      }

      .review-list, .mastered-list {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProgressComponent implements OnInit {
  stats = { totalWords: 0, learnedWords: 0, masteryRate: 0 };
  categoryStats: Array<{name: string, icon: string, color: string, mastered: number, total: number, percentage: number}> = [];
  reviewWords: any[] = [];
  masteredWords: any[] = [];

  constructor(private wordService: WordService) {}

  ngOnInit(): void {
    this.updateStats();
  }

  updateStats(): void {
    this.stats = this.wordService.getLearningStats();
    this.masteredWords = this.wordService.getMasteredWords();
    this.reviewWords = this.wordService.getWordsToReview();
    this.calculateCategoryStats();
  }

  calculateCategoryStats(): void {
    const categories = this.wordService.getCategories();
    this.categoryStats = categories.map(cat => {
      const categoryWords = this.wordService.getWordsByCategory(cat.id);
      const mastered = categoryWords.filter(w => this.wordService.getWordMastery(w.id) >= 4).length;
      return {
        name: cat.displayName,
        icon: cat.icon,
        color: cat.color,
        mastered,
        total: categoryWords.length,
        percentage: categoryWords.length > 0 ? Math.round((mastered / categoryWords.length) * 100) : 0
      };
    });
  }

  resetProgress(): void {
    if (confirm('确定要重置所有学习进度吗？此操作不可恢复！')) {
      this.wordService.resetProgress();
      this.updateStats();
      alert('学习进度已重置');
    }
  }
}
