import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Word } from '../../models/word.model';
import { TtsService } from '../../services/tts.service';

@Component({
  selector: 'app-word-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="word-card" [class.flipped]="isFlipped" (click)="flipCard()">
      <div class="card-inner">
        <!-- 正面 -->
        <div class="card-front">
          <div class="word-image" [style.backgroundColor]="categoryColor">
            <span class="word-emoji">{{ getEmojiForWord(word) }}</span>
          </div>
          <h2 class="word-english">{{ word.english }}</h2>
          <button class="speak-btn" (click)="playAudio($event)">
            🔊
          </button>
          <p class="tap-hint">点击翻转</p>
        </div>

        <!-- 背面 -->
        <div class="card-back">
          <h3 class="word-chinese">{{ word.chinese }}</h3>
          <div class="word-category">
            <span class="category-badge" [style.backgroundColor]="categoryColor">
              {{ getCategoryName(word.category) }}
            </span>
          </div>
          <div class="word-example">
            <p class="example-en">"{{ word.example }}"</p>
            <p class="example-cn">{{ word.exampleChinese }}</p>
          </div>
          <div class="word-source">
            <span class="source-tag">{{ getSourceName(word.source) }}</span>
          </div>
          <p class="tap-hint">点击返回</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .word-card {
      perspective: 1000px;
      width: 100%;
      max-width: 320px;
      height: 400px;
      margin: 1rem auto;
      cursor: pointer;
    }

    .card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.6s;
      transform-style: preserve-3d;
    }

    .word-card.flipped .card-inner {
      transform: rotateY(180deg);
    }

    .card-front, .card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 1rem;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      background: white;
    }

    .card-back {
      transform: rotateY(180deg);
    }

    .word-image {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .word-emoji {
      font-size: 4rem;
    }

    .word-english {
      font-size: 2rem;
      font-weight: 700;
      color: #333;
      margin: 0 0 0.5rem 0;
      text-transform: capitalize;
    }

    .speak-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      font-size: 1.5rem;
      cursor: pointer;
      transition: transform 0.2s;
      margin: 0.5rem 0;
    }

    .speak-btn:hover {
      transform: scale(1.1);
    }

    .speak-btn:active {
      transform: scale(0.95);
    }

    .tap-hint {
      font-size: 0.75rem;
      color: #999;
      margin-top: 1rem;
    }

    .word-chinese {
      font-size: 1.75rem;
      font-weight: 600;
      color: #333;
      margin: 0 0 1rem 0;
    }

    .category-badge {
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      color: white;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .word-example {
      margin: 1.5rem 0;
      text-align: center;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 0.5rem;
      width: 100%;
    }

    .example-en {
      font-size: 1rem;
      color: #666;
      margin: 0 0 0.5rem 0;
      font-style: italic;
    }

    .example-cn {
      font-size: 0.875rem;
      color: #999;
      margin: 0;
    }

    .source-tag {
      font-size: 0.75rem;
      color: #667eea;
      background: #f0f0ff;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-weight: 500;
    }

    @media (max-width: 640px) {
      .word-card {
        max-width: 280px;
        height: 360px;
      }

      .word-english {
        font-size: 1.5rem;
      }

      .word-chinese {
        font-size: 1.5rem;
      }

      .word-emoji {
        font-size: 3rem;
      }

      .word-image {
        width: 100px;
        height: 100px;
      }
    }
  `]
})
export class WordCardComponent {
  @Input() word!: Word;
  @Output() audioPlayed = new EventEmitter<void>();
  
  isFlipped = false;
  categoryColor = '#667eea';

  constructor(private ttsService: TtsService) {}

  ngOnInit(): void {
    this.categoryColor = this.getCategoryColor(this.word.category);
  }

  flipCard(): void {
    this.isFlipped = !this.isFlipped;
  }

  playAudio(event: Event): void {
    event.stopPropagation();
    console.log('[WordCard] 播放音频:', this.word.english);
    
    // 检查 TTS 支持
    if (!this.ttsService.isSupported()) {
      console.error('[WordCard] 浏览器不支持 TTS');
      alert('您的浏览器不支持语音播放功能，请尝试使用 Chrome、Edge 或 Safari');
      return;
    }
    
    this.ttsService.speakWord(this.word.english);
    this.audioPlayed.emit();
  }

  getCategoryName(categoryId: string): string {
    const categories: Record<string, string> = {
      colors: '颜色',
      animals: '动物',
      school: '文具',
      numbers: '数字',
      daily: '日常',
      food: '食物',
      family: '家庭',
      nature: '自然',
      actions: '动作',
      emotions: '情感'
    };
    return categories[categoryId] || categoryId;
  }

  getCategoryColor(categoryId: string): string {
    const colors: Record<string, string> = {
      colors: '#EF4444',
      animals: '#3B82F6',
      school: '#F97316',
      numbers: '#22C55E',
      daily: '#A855F7',
      food: '#EC4899',
      family: '#14B8A6',
      nature: '#84CC16',
      actions: '#F59E0B',
      emotions: '#6366F1'
    };
    return colors[categoryId] || '#667eea';
  }

  getSourceName(source: string): string {
    const sources: Record<string, string> = {
      oxford_3000: 'Oxford 3000',
      dolch_sight: 'Dolch Sight Words',
      fry_words: 'Fry Words',
      custom: '自定义'
    };
    return sources[source] || source;
  }

  getEmojiForWord(word: Word): string {
    const emojiMap: Record<string, string> = {
      colors: '🎨',
      animals: '🦁',
      school: '📚',
      numbers: '🔢',
      daily: '🏠',
      food: '🍎',
      family: '👨‍👩‍👧',
      nature: '🌳',
      actions: '🏃',
      emotions: '😊'
    };
    return emojiMap[word.category] || '📖';
  }
}
