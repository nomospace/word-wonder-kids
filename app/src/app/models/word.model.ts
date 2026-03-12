/**
 * 单词数据模型
 */
export interface Word {
  id: number;
  english: string;
  chinese: string;
  category: string;
  imageUrl?: string;
  audioUrl?: string;
  example: string;
  exampleChinese: string;
  difficulty: number; // 1-3
  source: WordSource; // 单词来源
}

/**
 * 单词来源类型
 */
export enum WordSource {
  OXFORD_3000 = 'oxford_3000',
  DOLCH_SIGHT = 'dolch_sight',
  FRY_WORDS = 'fry_words',
  CUSTOM = 'custom'
}

/**
 * 年级级别
 */
export interface GradeLevel {
  id: string;
  name: string;
  displayName: string;
  wordCount: number;
  difficultyRange: [number, number];
}

/**
 * 单词分类
 */
export interface WordCategory {
  id: string;
  name: string;
  displayName: string;
  color: string;
  icon: string;
}

/**
 * 学习进度
 */
export interface LearningProgress {
  wordId: number;
  learnedAt: Date;
  masteryLevel: number; // 0-5
  correctCount: number;
  incorrectCount: number;
  lastReviewedAt?: Date;
}

/**
 * 游戏模式
 */
export enum GameMode {
  FLASHCARD = 'flashcard',
  MATCHING = 'matching',
  LISTENING = 'listening',
  SPELLING = 'spelling',
  QUIZ = 'quiz'
}
