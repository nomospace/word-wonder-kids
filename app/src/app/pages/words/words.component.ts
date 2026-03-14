import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { KiddoService } from '../../services/kiddo.service';
import { WordService } from '../../services/word.service';
import { TtsService } from '../../services/tts.service';
import { Word } from '../../models/word.model';
import { UserProfile, SegmentLevel } from '../../models/kiddo.model';

type LearnMode = 'menu' | 'learn' | 'match' | 'quiz' | 'result';

@Component({
  selector: 'app-words',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="words-container" [class.lower]="profile?.segment === 'lower'" [class.upper]="profile?.segment === 'upper'">
      <!-- 头部 -->
      <header class="page-header">
        <button class="back-btn" (click)="goBack()">‹ 返回</button>
        <h1 class="page-title">📚 单词乐园</h1>
        <div class="header-stats">
          <span class="progress-text">{{ learnedCount }}/{{ words.length }}</span>
        </div>
      </header>

      <!-- 主菜单 -->
      <div class="menu-view" *ngIf="mode === 'menu'">
        <div class="category-select">
          <h3>选择分类</h3>
          <div class="categories">
            <button 
              *ngFor="let cat of categories" 
              class="category-btn"
              [class.active]="selectedCategory === cat.id"
              (click)="selectCategory(cat.id)">
              <span class="cat-icon">{{ cat.icon }}</span>
              <span class="cat-name">{{ cat.displayName }}</span>
            </button>
          </div>
        </div>

        <!-- 低段模式 -->
        <div class="mode-cards" *ngIf="profile?.segment === 'lower'">
          <div class="mode-card" (click)="startLearn('learn')">
            <div class="mode-icon">🖼️</div>
            <div class="mode-info">
              <span class="mode-title">看图识词</span>
              <span class="mode-desc">看图片，学单词</span>
            </div>
          </div>
          <div class="mode-card" (click)="startLearn('match')">
            <div class="mode-icon">🔗</div>
            <div class="mode-info">
              <span class="mode-title">连连看</span>
              <span class="mode-desc">图片配对单词</span>
            </div>
          </div>
          <div class="mode-card" (click)="startLearn('quiz')">
            <div class="mode-icon">🎯</div>
            <div class="mode-info">
              <span class="mode-title">闯关挑战</span>
              <span class="mode-desc">闯关赢勋章</span>
            </div>
          </div>
        </div>

        <!-- 高段模式 -->
        <div class="mode-cards" *ngIf="profile?.segment === 'upper'">
          <div class="mode-card" (click)="startLearn('learn')">
            <div class="mode-icon">👂</div>
            <div class="mode-info">
              <span class="mode-title">听词辨图</span>
              <span class="mode-desc">听发音选图片</span>
            </div>
          </div>
          <div class="mode-card" (click)="startLearn('spell')">
            <div class="mode-icon">✏️</div>
            <div class="mode-info">
              <span class="mode-title">单词拼写</span>
              <span class="mode-desc">看图拼单词</span>
            </div>
          </div>
          <div class="mode-card" (click)="startLearn('quiz')">
            <div class="mode-icon">📝</div>
            <div class="mode-info">
              <span class="mode-title">单元测试</span>
              <span class="mode-desc">检验学习成果</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 学习模式 -->
      <div class="learn-view" *ngIf="mode === 'learn' && currentWord">
        <div class="progress-bar">
          <div class="progress-fill" [style.width.%]="(currentIndex / words.length) * 100"></div>
        </div>

        <div class="word-card">
          <div class="word-image">
            <span class="word-emoji">{{ getWordEmoji(currentWord) }}</span>
          </div>
          <div class="word-content">
            <h2 class="word-english">{{ currentWord.english }}</h2>
            <p class="word-chinese">{{ currentWord.chinese }}</p>
          </div>
          <div class="word-actions">
            <button class="action-btn speak" (click)="speak(currentWord.english)">
              🔊 发音
            </button>
            <button class="action-btn record" (click)="startRecording()">
              🎤 跟读
            </button>
          </div>
          <p class="word-example">"{{ currentWord.example }}"</p>
        </div>

        <div class="nav-buttons">
          <button class="nav-btn prev" (click)="prevWord()" [disabled]="currentIndex === 0">
            ◀ 上一个
          </button>
          <button class="nav-btn next" (click)="nextWord()">
            {{ currentIndex < words.length - 1 ? '下一个 ▶' : '完成' }}
          </button>
        </div>
      </div>

      <!-- 连连看模式 -->
      <div class="match-view" *ngIf="mode === 'match'">
        <div class="match-header">
          <span class="match-score">得分: {{ matchScore }}</span>
          <span class="match-timer">{{ matchTime }}s</span>
        </div>
        
        <div class="match-grid">
          <div 
            *ngFor="let item of matchItems; let i = index" 
            class="match-item"
            [class.selected]="selectedMatch === i"
            [class.matched]="item.matched"
            (click)="selectMatchItem(i)">
            <span *ngIf="item.type === 'word'">{{ item.text }}</span>
            <span *ngIf="item.type === 'emoji'" class="item-emoji">{{ item.text }}</span>
          </div>
        </div>
      </div>

      <!-- 测验模式 -->
      <div class="quiz-view" *ngIf="mode === 'quiz' && quizQuestion">
        <div class="quiz-progress">
          题目 {{ quizIndex + 1 }}/{{ quizQuestions.length }}
        </div>
        
        <div class="quiz-question">
          <p class="question-text">{{ quizQuestion.question }}</p>
        </div>

        <div class="quiz-options">
          <button 
            *ngFor="let opt of quizQuestion.options; let i = index"
            class="quiz-option"
            [class.correct]="showAnswer && i === quizQuestion.correctIndex"
            [class.wrong]="showAnswer && selectedOption === i && i !== quizQuestion.correctIndex"
            (click)="selectQuizOption(i)">
            {{ opt }}
          </button>
        </div>

        <div class="quiz-feedback" *ngIf="showAnswer">
          <p *ngIf="selectedOption === quizQuestion.correctIndex" class="correct-msg">
            ✅ 正确！太棒了！
          </p>
          <p *ngIf="selectedOption !== quizQuestion.correctIndex" class="wrong-msg">
            ❌ 再想想哦，答案是：{{ quizQuestion.options[quizQuestion.correctIndex] }}
          </p>
          <button class="next-btn" (click)="nextQuizQuestion()">下一题</button>
        </div>
      </div>

      <!-- 结果页 -->
      <div class="result-view" *ngIf="mode === 'result'">
        <div class="result-card">
          <span class="result-icon">{{ resultScore >= 80 ? '🏆' : resultScore >= 60 ? '⭐' : '💪' }}</span>
          <h2 class="result-title">{{ resultScore >= 80 ? '太棒了！' : resultScore >= 60 ? '不错哦！' : '继续加油！' }}</h2>
          <p class="result-score">得分: {{ resultScore }}分</p>
          <p class="result-stats">正确: {{ correctCount }}题 / 共{{ totalCount }}题</p>
          
          <div class="result-actions">
            <button class="result-btn retry" (click)="retry()">再试一次</button>
            <button class="result-btn home" (click)="goHome()">返回首页</button>
          </div>
          
          <div class="result-reward" *ngIf="resultScore >= 80">
            <span>🎁 获得奖励：</span>
            <span class="reward-coins">+{{ earnedCoins }} 🪙</span>
          </div>
        </div>
      </div>

      <!-- 底部导航 -->
      <nav class="bottom-nav">
        <a routerLink="/" class="nav-item">
          <span class="nav-icon">🏠</span>
          <span class="nav-label">首页</span>
        </a>
        <a routerLink="/words" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">📚</span>
          <span class="nav-label">单词</span>
        </a>
        <a routerLink="/sentences" class="nav-item">
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
    .words-container {
      min-height: 100vh;
      padding-bottom: 80px;
    }

    .lower {
      --primary: #FF6B9D;
      --primary-light: #FFB6C1;
      --bg: #FFF5F8;
    }

    .upper {
      --primary: #4A90D9;
      --primary-light: #87CEEB;
      --bg: #F0F8FF;
    }

    /* Header */
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
      font-weight: 600;
    }

    .header-stats {
      font-size: 14px;
    }

    /* Menu View */
    .menu-view {
      padding: 16px;
    }

    .category-select h3 {
      font-size: 14px;
      color: #666;
      margin-bottom: 12px;
    }

    .categories {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
      margin-bottom: 24px;
    }

    .category-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 12px 8px;
      background: white;
      border: 2px solid #eee;
      border-radius: 12px;
      cursor: pointer;
    }

    .category-btn.active {
      border-color: var(--primary);
      background: var(--bg);
    }

    .cat-icon { font-size: 20px; }
    .cat-name { font-size: 10px; color: #666; }

    .mode-cards {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .mode-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.05);
      cursor: pointer;
    }

    .mode-icon { font-size: 32px; }
    .mode-info { flex: 1; }
    .mode-title { display: block; font-size: 16px; font-weight: 600; }
    .mode-desc { font-size: 12px; color: #999; }

    /* Learn View */
    .learn-view {
      padding: 16px;
    }

    .progress-bar {
      height: 6px;
      background: #eee;
      border-radius: 3px;
      margin-bottom: 20px;
    }

    .progress-fill {
      height: 100%;
      background: var(--primary);
      border-radius: 3px;
      transition: width 0.3s;
    }

    .word-card {
      background: white;
      border-radius: 20px;
      padding: 24px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    .word-image {
      margin-bottom: 16px;
    }

    .word-emoji {
      font-size: 80px;
    }

    .word-english {
      font-size: 32px;
      font-weight: 700;
      margin: 0 0 8px 0;
    }

    .word-chinese {
      font-size: 18px;
      color: #666;
      margin: 0 0 16px 0;
    }

    .word-actions {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    .action-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 20px;
      font-size: 14px;
      cursor: pointer;
    }

    .action-btn.speak {
      background: var(--primary);
      color: white;
    }

    .action-btn.record {
      background: #4CAF50;
      color: white;
    }

    .word-example {
      font-size: 14px;
      color: #999;
      font-style: italic;
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

    .nav-btn.prev {
      background: #f0f0f0;
      color: #666;
    }

    .nav-btn.next {
      background: var(--primary);
      color: white;
    }

    /* Match View */
    .match-view {
      padding: 16px;
    }

    .match-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .match-score, .match-timer {
      font-size: 18px;
      font-weight: 600;
    }

    .match-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }

    .match-item {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      border-radius: 12px;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: all 0.2s;
    }

    .match-item.selected {
      background: var(--primary);
      color: white;
    }

    .match-item.matched {
      background: #4CAF50;
      color: white;
      opacity: 0.5;
    }

    .item-emoji {
      font-size: 24px;
    }

    /* Quiz View */
    .quiz-view {
      padding: 16px;
    }

    .quiz-progress {
      text-align: center;
      font-size: 14px;
      color: #666;
      margin-bottom: 20px;
    }

    .quiz-question {
      background: white;
      padding: 24px;
      border-radius: 16px;
      margin-bottom: 20px;
    }

    .question-text {
      font-size: 20px;
      font-weight: 600;
      text-align: center;
    }

    .quiz-options {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .quiz-option {
      padding: 16px;
      background: white;
      border: 2px solid #eee;
      border-radius: 12px;
      font-size: 16px;
      text-align: left;
      cursor: pointer;
    }

    .quiz-option.correct {
      background: #e8f5e9;
      border-color: #4CAF50;
    }

    .quiz-option.wrong {
      background: #ffebee;
      border-color: #f44336;
    }

    .quiz-feedback {
      text-align: center;
      margin-top: 20px;
    }

    .correct-msg { color: #4CAF50; }
    .wrong-msg { color: #f44336; }

    .next-btn {
      margin-top: 12px;
      padding: 12px 32px;
      background: var(--primary);
      color: white;
      border: none;
      border-radius: 20px;
      font-size: 16px;
      cursor: pointer;
    }

    /* Result View */
    .result-view {
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 160px);
    }

    .result-card {
      text-align: center;
      background: white;
      padding: 32px;
      border-radius: 24px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    .result-icon { font-size: 64px; }
    .result-title { font-size: 24px; margin: 16px 0 8px; }
    .result-score { font-size: 36px; font-weight: 700; color: var(--primary); }
    .result-stats { color: #666; }

    .result-actions {
      display: flex;
      gap: 12px;
      margin-top: 24px;
    }

    .result-btn {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 12px;
      font-size: 14px;
      cursor: pointer;
    }

    .result-btn.retry {
      background: var(--primary);
      color: white;
    }

    .result-btn.home {
      background: #f0f0f0;
      color: #666;
    }

    .result-reward {
      margin-top: 16px;
      padding: 12px;
      background: #fff3e0;
      border-radius: 12px;
    }

    .reward-coins {
      font-weight: 600;
      color: #FF9800;
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
    }

    .nav-item.active {
      color: var(--primary);
    }

    .nav-icon { font-size: 24px; }
    .nav-label { font-size: 11px; }
  `]
})
export class WordsComponent implements OnInit {
  profile: UserProfile | null = null;
  mode: LearnMode = 'menu';
  
  // 单词数据
  words: Word[] = [];
  currentIndex = 0;
  currentWord: Word | null = null;
  learnedCount = 0;
  
  // 分类
  categories: any[] = [];
  selectedCategory = 'all';
  
  // 连连看
  matchItems: any[] = [];
  selectedMatch: number | null = null;
  matchScore = 0;
  matchTime = 60;
  
  // 测验
  quizQuestions: any[] = [];
  quizIndex = 0;
  quizQuestion: any = null;
  selectedOption: number | null = null;
  showAnswer = false;
  correctCount = 0;
  totalCount = 0;
  
  // 结果
  resultScore = 0;
  earnedCoins = 0;

  constructor(
    private kiddoService: KiddoService,
    private wordService: WordService,
    private ttsService: TtsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.kiddoService.getUserProfile().subscribe(p => this.profile = p);
    this.categories = this.wordService.getCategories();
    this.words = this.wordService.getCurrentGradeWords();
  }

  selectCategory(catId: string): void {
    this.selectedCategory = catId;
    if (catId === 'all') {
      this.words = this.wordService.getCurrentGradeWords();
    } else {
      this.words = this.wordService.getWordsByCategory(catId);
    }
  }

  startLearn(mode: 'learn' | 'match' | 'quiz' | 'spell'): void {
    this.mode = mode as any;
    this.currentIndex = 0;
    this.currentWord = this.words[0];
    
    if (mode === 'match') {
      this.initMatchGame();
    } else if (mode === 'quiz') {
      this.initQuiz();
    }
  }

  // 学习模式
  nextWord(): void {
    if (this.currentIndex < this.words.length - 1) {
      this.currentIndex++;
      this.currentWord = this.words[this.currentIndex];
      this.wordService.updateProgress(this.currentWord.id, true);
      this.kiddoService.updateTaskProgress('word_learn', this.currentIndex + 1);
    } else {
      this.mode = 'result';
      this.resultScore = 100;
      this.earnedCoins = 20;
      this.kiddoService.addCoins(this.earnedCoins);
      this.kiddoService.awardBadge('first_word');
    }
  }

  prevWord(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentWord = this.words[this.currentIndex];
    }
  }

  speak(text: string): void {
    this.ttsService.speak(text);
  }

  startRecording(): void {
    // TODO: 实现语音录制和识别
    alert('🎤 请跟读: ' + this.currentWord?.english);
  }

  getWordEmoji(word: Word): string {
    const emojiMap: Record<string, string> = {
      'animals': '🐾',
      'colors': '🎨',
      'food': '🍎',
      'school': '📚',
      'numbers': '🔢',
      'daily': '🏠',
      'family': '👨‍👩‍👧',
      'nature': '🌳',
      'actions': '🏃',
      'emotions': '😊'
    };
    return emojiMap[word.category] || '📝';
  }

  // 连连看
  initMatchGame(): void {
    const matchWords = this.words.slice(0, 4);
    const items: any[] = [];
    
    matchWords.forEach((w, i) => {
      items.push({ type: 'word', text: w.english, pairId: i, matched: false });
      items.push({ type: 'emoji', text: this.getWordEmoji(w), pairId: i, matched: false });
    });
    
    this.matchItems = this.shuffle(items);
    this.matchScore = 0;
    this.matchTime = 60;
  }

  selectMatchItem(index: number): void {
    if (this.matchItems[index].matched) return;
    
    if (this.selectedMatch === null) {
      this.selectedMatch = index;
    } else {
      const first = this.matchItems[this.selectedMatch];
      const second = this.matchItems[index];
      
      if (first.pairId === second.pairId && first.type !== second.type) {
        first.matched = true;
        second.matched = true;
        this.matchScore += 10;
        this.kiddoService.addCoins(5);
      }
      
      this.selectedMatch = null;
      
      // 检查是否完成
      if (this.matchItems.every(i => i.matched)) {
        setTimeout(() => {
          this.mode = 'result';
          this.resultScore = this.matchScore;
          this.earnedCoins = this.matchScore;
        }, 500);
      }
    }
  }

  // 测验
  initQuiz(): void {
    const quizWords = this.words.slice(0, 5);
    this.quizQuestions = quizWords.map(w => this.createQuestion(w));
    this.quizIndex = 0;
    this.quizQuestion = this.quizQuestions[0];
    this.correctCount = 0;
    this.totalCount = this.quizQuestions.length;
  }

  createQuestion(word: Word): any {
    const others = this.words.filter(w => w.id !== word.id).slice(0, 3);
    const options = this.shuffle([word.chinese, ...others.map(o => o.chinese)]);
    
    return {
      question: `"${word.english}" 是什么意思？`,
      options,
      correctIndex: options.indexOf(word.chinese)
    };
  }

  selectQuizOption(index: number): void {
    if (this.showAnswer) return;
    
    this.selectedOption = index;
    this.showAnswer = true;
    
    if (index === this.quizQuestion.correctIndex) {
      this.correctCount++;
      this.kiddoService.updateTaskProgress('word_review', this.correctCount);
    } else {
      this.kiddoService.addWrongQuestion('word', this.words[this.quizIndex].id);
    }
  }

  nextQuizQuestion(): void {
    this.selectedOption = null;
    this.showAnswer = false;
    
    if (this.quizIndex < this.quizQuestions.length - 1) {
      this.quizIndex++;
      this.quizQuestion = this.quizQuestions[this.quizIndex];
    } else {
      this.mode = 'result';
      this.resultScore = Math.round((this.correctCount / this.totalCount) * 100);
      this.earnedCoins = this.correctCount * 5;
      this.kiddoService.addCoins(this.earnedCoins);
      
      if (this.correctCount >= this.totalCount) {
        this.kiddoService.awardBadge('perfect_5');
      }
    }
  }

  // 工具方法
  shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  retry(): void {
    this.mode = 'menu';
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  goBack(): void {
    if (this.mode !== 'menu') {
      this.mode = 'menu';
    } else {
      this.router.navigate(['/']);
    }
  }
}