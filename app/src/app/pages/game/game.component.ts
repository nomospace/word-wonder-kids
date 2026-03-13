import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WordService } from '../../services/word.service';
import { TtsService } from '../../services/tts.service';
import { Word } from '../../models/word.model';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="game-page">
      <div class="page-header">
        <a routerLink="/" class="back-btn">
          <span>⬅️</span> 返回
        </a>
        <h1>🎮 趣味游戏</h1>
      </div>

      <!-- 游戏选择 -->
      <div class="game-grid">
        <div class="game-card" (click)="startGame('matching')">
          <span class="game-icon">🔗</span>
          <h3>连连看</h3>
          <p>匹配单词和意思</p>
        </div>
        <div class="game-card" (click)="startGame('listening')">
          <span class="game-icon">🎧</span>
          <h3>听音选词</h3>
          <p>听发音选单词</p>
        </div>
        <div class="game-card" (click)="startGame('spelling')">
          <span class="game-icon">✏️</span>
          <h3>拼写挑战</h3>
          <p>补全字母拼单词</p>
        </div>
        <div class="game-card" (click)="startGame('quiz')">
          <span class="game-icon">❓</span>
          <h3>单词测验</h3>
          <p>选择题测试</p>
        </div>
      </div>

      <!-- 游戏区域 -->
      <div class="game-area" *ngIf="gameActive">
        <div class="game-header">
          <span class="score">得分：{{ score }}</span>
          <button class="exit-btn" (click)="exitGame()">退出</button>
        </div>

        <!-- 连连看游戏 -->
        <div class="matching-game" *ngIf="currentGame === 'matching'">
          <p class="game-instruction">点击匹配的单词和意思</p>
          <div class="matching-grid">
            <button 
              *ngFor="let item of matchingItems; let i = index"
              [class.selected]="selectedIndex === i"
              [class.matched]="item.matched"
              (click)="selectItem(i)"
              class="match-card"
            >
              {{ item.text }}
            </button>
          </div>
        </div>

        <!-- 听音选词 -->
        <div class="listening-game" *ngIf="currentGame === 'listening'">
          <button class="play-sound-btn" (click)="playCurrentWord()">
            🔊 播放发音
          </button>
          <div class="options-grid">
            <button 
              *ngFor="let option of currentOptions"
              (click)="selectAnswer(option)"
              class="option-btn"
            >
              {{ option.english }}
            </button>
          </div>
        </div>

        <!-- 拼写挑战 -->
        <div class="spelling-game" *ngIf="currentGame === 'spelling'">
          <p class="word-meaning">{{ currentWord?.chinese }}</p>
          <div class="spelling-input">
            <input 
              type="text" 
              [(ngModel)]="spellingAnswer"
              (keyup.enter)="checkSpelling()"
              placeholder="输入单词"
              class="spelling-field"
            >
            <button (click)="checkSpelling()" class="submit-btn">提交</button>
          </div>
          <p class="hint" *ngIf="showHint">提示：{{ getHint() }}</p>
        </div>

        <!-- 单词测验 -->
        <div class="quiz-game" *ngIf="currentGame === 'quiz'">
          <p class="quiz-question">{{ currentWord?.english }} 的意思是？</p>
          <div class="options-grid">
            <button 
              *ngFor="let option of currentOptions"
              (click)="selectAnswer(option)"
              class="option-btn"
            >
              {{ option.chinese }}
            </button>
          </div>
        </div>

        <!-- 结果反馈 -->
        <div class="feedback" *ngIf="feedback" [class.correct]="feedback.isCorrect">
          {{ feedback.message }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .game-page {
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

    .game-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .game-card {
      background: white;
      padding: 1.5rem;
      border-radius: 1rem;
      text-align: center;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s;
    }

    .game-card:hover {
      transform: translateY(-4px);
    }

    .game-icon {
      font-size: 3.5rem;
      display: block;
      margin-bottom: 0.5rem;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
    }

    .game-card h3 {
      margin: 0.5rem 0;
      color: #333;
      font-size: 1.125rem;
    }

    .game-card p {
      margin: 0;
      font-size: 0.875rem;
      color: #999;
    }

    .game-area {
      background: white;
      padding: 1.5rem;
      border-radius: 1rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    }

    .game-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .score {
      font-size: 1.25rem;
      font-weight: 700;
      color: #667eea;
    }

    .exit-btn {
      padding: 0.5rem 1rem;
      border: none;
      background: #f0f0f0;
      border-radius: 0.5rem;
      cursor: pointer;
      font-weight: 600;
    }

    .game-instruction {
      text-align: center;
      color: #666;
      margin-bottom: 1rem;
    }

    .matching-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
    }

    .match-card {
      padding: 1rem;
      border: 2px solid #667eea;
      border-radius: 0.5rem;
      background: white;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s;
    }

    .match-card.selected {
      background: #667eea;
      color: white;
    }

    .match-card.matched {
      background: #22c55e;
      border-color: #22c55e;
      color: white;
      opacity: 0.5;
    }

    .play-sound-btn {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 0.75rem;
      font-size: 1.125rem;
      font-weight: 600;
      cursor: pointer;
      margin-bottom: 1.5rem;
    }

    .options-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }

    .option-btn {
      padding: 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 0.75rem;
      background: white;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.2s;
    }

    .option-btn:hover {
      border-color: #667eea;
    }

    .spelling-game {
      text-align: center;
    }

    .word-meaning {
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 1.5rem;
    }

    .spelling-input {
      display: flex;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .spelling-field {
      flex: 1;
      padding: 0.75rem;
      border: 2px solid #e0e0e0;
      border-radius: 0.5rem;
      font-size: 1.125rem;
    }

    .submit-btn {
      padding: 0.75rem 1.5rem;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
    }

    .hint {
      color: #f59e0b;
      font-size: 0.875rem;
    }

    .quiz-question {
      font-size: 1.25rem;
      font-weight: 600;
      text-align: center;
      margin-bottom: 1.5rem;
      color: #333;
    }

    .feedback {
      margin-top: 1.5rem;
      padding: 1rem;
      border-radius: 0.75rem;
      text-align: center;
      font-weight: 600;
      background: #fee2e2;
      color: #dc2626;
    }

    .feedback.correct {
      background: #dcfce7;
      color: #16a34a;
    }

    @media (max-width: 640px) {
      .matching-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class GameComponent implements OnInit {
  gameActive = false;
  currentGame: string | null = null;
  score = 0;
  words: Word[] = [];
  currentWord: Word | null = null;
  currentOptions: Word[] = [];
  matchingItems: Array<{text: string, matched: boolean, type: 'en'|'cn', wordId: number}> = [];
  selectedIndex: number | null = null;
  spellingAnswer = '';
  showHint = false;
  feedback: {message: string, isCorrect: boolean} | null = null;

  constructor(
    private wordService: WordService,
    private ttsService: TtsService
  ) {}

  ngOnInit(): void {
    this.words = this.wordService.getCurrentGradeWords();
  }

  startGame(gameType: string): void {
    this.currentGame = gameType;
    this.gameActive = true;
    this.score = 0;
    this.loadGameLevel();
  }

  loadGameLevel(): void {
    if (!this.currentGame) return;
    
    const randomWords = this.wordService.getRandomWords(4);
    this.currentWord = randomWords[0];
    this.currentOptions = randomWords;

    if (this.currentGame === 'matching') {
      this.setupMatchingGame(randomWords);
    }
  }

  setupMatchingGame(words: Word[]): void {
    this.matchingItems = [];
    words.forEach(word => {
      this.matchingItems.push({ text: word.english, matched: false, type: 'en', wordId: word.id });
      this.matchingItems.push({ text: word.chinese, matched: false, type: 'cn', wordId: word.id });
    });
    this.matchingItems.sort(() => Math.random() - 0.5);
  }

  selectItem(index: number): void {
    if (this.selectedIndex === index || this.matchingItems[index].matched) return;

    if (this.selectedIndex === null) {
      this.selectedIndex = index;
    } else {
      const first = this.matchingItems[this.selectedIndex];
      const second = this.matchingItems[index];

      if (first.type !== second.type && first.wordId === second.wordId) {
        // 匹配成功
        this.matchingItems[this.selectedIndex].matched = true;
        this.matchingItems[index].matched = true;
        this.score += 10;
        this.showFeedback('太棒了！匹配正确！🎉', true);
        
        if (this.matchingItems.every(i => i.matched)) {
          setTimeout(() => this.loadGameLevel(), 1000);
        }
      } else {
        // 匹配失败
        this.showFeedback('再试一次！💪', false);
      }

      this.selectedIndex = null;
    }
  }

  playCurrentWord(): void {
    if (this.currentWord) {
      this.ttsService.speakWord(this.currentWord.english);
    }
  }

  selectAnswer(word: Word): void {
    if (!this.currentWord) return;

    const isCorrect = 
      (this.currentGame === 'listening' && word.id === this.currentWord.id) ||
      (this.currentGame === 'quiz' && word.id === this.currentWord.id);

    if (isCorrect) {
      this.score += 10;
      this.showFeedback('回答正确！🎉', true);
      setTimeout(() => this.loadGameLevel(), 1000);
    } else {
      this.showFeedback('不对哦，再想想！💪', false);
    }
  }

  checkSpelling(): void {
    if (!this.currentWord) return;

    const isCorrect = this.spellingAnswer.toLowerCase().trim() === this.currentWord.english.toLowerCase();
    
    if (isCorrect) {
      this.score += 10;
      this.showFeedback('拼写正确！🎉', true);
      setTimeout(() => {
        this.spellingAnswer = '';
        this.loadGameLevel();
      }, 1000);
    } else {
      this.showFeedback('不对哦，再试试！💪', false);
      this.showHint = true;
    }
  }

  getHint(): string {
    if (!this.currentWord) return '';
    const word = this.currentWord.english;
    return word.charAt(0) + '_'.repeat(word.length - 2) + word.charAt(word.length - 1);
  }

  showFeedback(message: string, isCorrect: boolean): void {
    this.feedback = { message, isCorrect };
    setTimeout(() => {
      this.feedback = null;
    }, 2000);
  }

  exitGame(): void {
    this.gameActive = false;
    this.currentGame = null;
  }
}
