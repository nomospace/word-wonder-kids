import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Word, WordCategory, GradeLevel, LearningProgress, GameMode } from '../models/word.model';
import { 
  WORD_DATABASE, 
  GRADE_LEVELS, 
  WORD_CATEGORIES,
  getWordsByGrade,
  getWordsByCategory 
} from '../data/word-data';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private currentGradeId = new BehaviorSubject<string>('g2');
  private learningProgress = new BehaviorSubject<Map<number, LearningProgress>>(new Map());

  constructor() {
    this.loadProgressFromStorage();
  }

  /**
   * 获取所有年级
   */
  getGradeLevels(): GradeLevel[] {
    return GRADE_LEVELS;
  }

  /**
   * 获取当前年级
   */
  getCurrentGradeId(): Observable<string> {
    return this.currentGradeId.asObservable();
  }

  /**
   * 设置当前年级
   */
  setCurrentGradeId(gradeId: string): void {
    this.currentGradeId.next(gradeId);
    this.saveToStorage('currentGradeId', gradeId);
  }

  /**
   * 获取当前年级的单词
   */
  getCurrentGradeWords(): Word[] {
    const gradeId = this.currentGradeId.getValue();
    return getWordsByGrade(gradeId);
  }

  /**
   * 按分类获取单词
   */
  getWordsByCategory(category: string): Word[] {
    return getWordsByCategory(category);
  }

  /**
   * 获取所有分类
   */
  getCategories(): WordCategory[] {
    return WORD_CATEGORIES;
  }

  /**
   * 获取所有单词
   */
  getAllWords(): Word[] {
    return WORD_DATABASE;
  }

  /**
   * 根据 ID 获取单词
   */
  getWordById(id: number): Word | undefined {
    return WORD_DATABASE.find(word => word.id === id);
  }

  /**
   * 获取随机单词
   */
  getRandomWords(count: number, gradeId?: string): Word[] {
    const words = gradeId ? getWordsByGrade(gradeId) : WORD_DATABASE;
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, words.length));
  }

  /**
   * 获取学习进度
   */
  getProgress(): Observable<Map<number, LearningProgress>> {
    return this.learningProgress.asObservable();
  }

  /**
   * 更新学习进度
   */
  updateProgress(wordId: number, isCorrect: boolean): void {
    const progressMap = this.learningProgress.getValue();
    const existing = progressMap.get(wordId);
    
    const updated: LearningProgress = existing ? {
      ...existing,
      masteryLevel: isCorrect 
        ? Math.min(5, existing.masteryLevel + 1)
        : Math.max(0, existing.masteryLevel - 1),
      correctCount: existing.correctCount + (isCorrect ? 1 : 0),
      incorrectCount: existing.incorrectCount + (isCorrect ? 0 : 1),
      lastReviewedAt: new Date()
    } : {
      wordId,
      learnedAt: new Date(),
      masteryLevel: isCorrect ? 1 : 0,
      correctCount: isCorrect ? 1 : 0,
      incorrectCount: isCorrect ? 0 : 1,
      lastReviewedAt: new Date()
    };

    progressMap.set(wordId, updated);
    this.learningProgress.next(progressMap);
    this.saveProgressToStorage();
  }

  /**
   * 获取单词的掌握程度
   */
  getWordMastery(wordId: number): number {
    return this.learningProgress.getValue().get(wordId)?.masteryLevel || 0;
  }

  /**
   * 获取已掌握的单词
   */
  getMasteredWords(): Word[] {
    const progressMap = this.learningProgress.getValue();
    return WORD_DATABASE.filter(word => {
      const progress = progressMap.get(word.id);
      return progress && progress.masteryLevel >= 4;
    });
  }

  /**
   * 获取需要复习的单词
   */
  getWordsToReview(): Word[] {
    const progressMap = this.learningProgress.getValue();
    return WORD_DATABASE.filter(word => {
      const progress = progressMap.get(word.id);
      if (!progress) return true;
      if (progress.masteryLevel < 3) return true;
      if (progress.lastReviewedAt) {
        const daysSinceReview = (Date.now() - progress.lastReviewedAt.getTime()) / (1000 * 60 * 60 * 24);
        return daysSinceReview > 7;
      }
      return false;
    });
  }

  /**
   * 获取学习统计
   */
  getLearningStats(): { totalWords: number; learnedWords: number; masteryRate: number } {
    const progressMap = this.learningProgress.getValue();
    const learnedWords = Array.from(progressMap.values()).filter(p => p.masteryLevel >= 3).length;
    return {
      totalWords: WORD_DATABASE.length,
      learnedWords,
      masteryRate: Math.round((learnedWords / WORD_DATABASE.length) * 100)
    };
  }

  /**
   * 重置进度
   */
  resetProgress(): void {
    this.learningProgress.next(new Map());
    localStorage.removeItem('wwk_learningProgress');
    localStorage.removeItem('wwk_currentGradeId');
  }

  private loadProgressFromStorage(): void {
    try {
      const savedGrade = localStorage.getItem('wwk_currentGradeId');
      if (savedGrade) {
        this.currentGradeId.next(savedGrade);
      }

      const savedProgress = localStorage.getItem('wwk_learningProgress');
      if (savedProgress) {
        const data = JSON.parse(savedProgress);
        const progressMap = new Map<number, LearningProgress>();
        Object.keys(data).forEach(key => {
          const wordId = parseInt(key);
          progressMap.set(wordId, {
            ...data[wordId],
            learnedAt: new Date(data[wordId].learnedAt),
            lastReviewedAt: data[wordId].lastReviewedAt ? new Date(data[wordId].lastReviewedAt) : undefined
          });
        });
        this.learningProgress.next(progressMap);
      }
    } catch (e) {
      console.error('Failed to load progress from storage', e);
    }
  }

  private saveProgressToStorage(): void {
    try {
      const progressMap = this.learningProgress.getValue();
      const data: Record<number, any> = {};
      progressMap.forEach((progress, wordId) => {
        data[wordId] = {
          ...progress,
          learnedAt: progress.learnedAt.toISOString(),
          lastReviewedAt: progress.lastReviewedAt?.toISOString()
        };
      });
      localStorage.setItem('wwk_learningProgress', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save progress to storage', e);
    }
  }

  private saveToStorage(key: string, value: string): void {
    try {
      localStorage.setItem(`wwk_${key}`, value);
    } catch (e) {
      console.error('Failed to save to storage', e);
    }
  }
}
