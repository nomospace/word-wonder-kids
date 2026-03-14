/**
 * 小萌英语 数据模型
 */

// ==================== 用户相关 ====================

export type SegmentLevel = 'lower' | 'upper'; // 低段(1-3年级) | 高段(4-6年级)

export interface UserProfile {
  id: string;
  nickname: string;
  avatar: string;
  grade: number; // 1-6
  segment: SegmentLevel;
  textbookVersion: TextbookVersion;
  totalStudyDays: number;
  streakDays: number;
  coins: number;
  createdAt: Date;
}

export type TextbookVersion = 'pep' | 'fltrp' | 'sujiao' | 'bnu'; // 人教版、外研版、苏教版、北师大版

// ==================== 句型相关 ====================

export interface SentencePattern {
  id: number;
  pattern: string; // "I'm..."
  chinese: string; // "我是..."
  category: SentenceCategory;
  gradeRange: [number, number]; // 适用年级范围
  example: string;
  exampleChinese: string;
  scene: string; // 场景描述
  audioUrl?: string;
}

export type SentenceCategory = 
  | 'greetings' // 问候
  | 'introduction' // 自我介绍
  | 'daily' // 日常用语
  | 'question' // 提问
  | 'description' // 描述
  | 'request'; // 请求

// ==================== 勋章相关 ====================

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  requirement: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export type BadgeCategory = 
  | 'learning' // 学习类
  | 'streak' // 坚持类
  | 'mastery' // 掌握类
  | 'special'; // 特殊类

export interface UserBadge {
  badgeId: string;
  earnedAt: Date;
}

// ==================== 每日任务 ====================

export interface DailyTask {
  id: string;
  type: TaskType;
  title: string;
  description: string;
  target: number;
  progress: number;
  reward: number; // 积分奖励
  completed: boolean;
}

export type TaskType = 
  | 'word_learn' // 学习单词
  | 'word_review' // 复习单词
  | 'sentence_learn' // 学习句型
  | 'practice' // 练习
  | 'dubbing'; // 配音

// ==================== 错题相关 ====================

export interface WrongQuestion {
  id: string;
  type: 'word' | 'sentence';
  itemId: number;
  wrongCount: number;
  lastWrongAt: Date;
  correctCount: number;
}

// ==================== 学习记录 ====================

export interface StudyRecord {
  date: string; // YYYY-MM-DD
  duration: number; // 分钟
  wordsLearned: number;
  sentencesLearned: number;
  accuracy: number;
}

// ==================== 奖励 ====================

export interface Sticker {
  id: string;
  name: string;
  image: string;
  category: string;
}

export interface UserSticker {
  stickerId: string;
  earnedAt: Date;
}

// ==================== 教材单元 ====================

export interface TextbookUnit {
  id: string;
  textbook: TextbookVersion;
  grade: number;
  unit: number;
  title: string;
  wordIds: number[];
  sentenceIds: number[];
}