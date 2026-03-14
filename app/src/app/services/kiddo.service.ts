/**
 * 小萌英语核心服务
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { 
  UserProfile, SegmentLevel, TextbookVersion, DailyTask, 
  WrongQuestion, StudyRecord, UserBadge, Badge
} from '../models/kiddo.model';
import { BADGE_DATABASE } from '../data/badge-data';

@Injectable({
  providedIn: 'root'
})
export class KiddoService {
  // 用户信息
  private userProfile = new BehaviorSubject<UserProfile>(this.initUserProfile());
  
  // 每日任务
  private dailyTasks = new BehaviorSubject<DailyTask[]>(this.initDailyTasks());
  
  // 错题本
  private wrongQuestions = new BehaviorSubject<WrongQuestion[]>([]);
  
  // 已获得勋章
  private userBadges = new BehaviorSubject<UserBadge[]>([]);
  
  // 学习记录
  private studyRecords = new BehaviorSubject<StudyRecord[]>([]);
  
  // 今日打卡状态
  private todayChecked = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadFromStorage();
  }

  // ==================== 用户相关 ====================

  getUserProfile(): Observable<UserProfile> {
    return this.userProfile.asObservable();
  }

  getCurrentProfile(): UserProfile {
    return this.userProfile.getValue();
  }

  updateUserProfile(updates: Partial<UserProfile>): void {
    const current = this.userProfile.getValue();
    this.userProfile.next({ ...current, ...updates });
    this.saveToStorage();
  }

  setGrade(grade: number): void {
    const segment: SegmentLevel = grade <= 3 ? 'lower' : 'upper';
    this.updateUserProfile({ grade, segment });
  }

  setTextbook(version: TextbookVersion): void {
    this.updateUserProfile({ textbookVersion: version });
  }

  // ==================== 每日任务 ====================

  getDailyTasks(): Observable<DailyTask[]> {
    return this.dailyTasks.asObservable();
  }

  updateTaskProgress(taskId: string, progress: number): void {
    const tasks = this.dailyTasks.getValue();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.progress = Math.min(progress, task.target);
      task.completed = task.progress >= task.target;
      this.dailyTasks.next([...tasks]);
      this.saveToStorage();
      
      // 完成任务奖励
      if (task.completed) {
        this.addCoins(task.reward);
      }
    }
  }

  getCompletedTaskCount(): number {
    return this.dailyTasks.getValue().filter(t => t.completed).length;
  }

  // ==================== 积分系统 ====================

  addCoins(amount: number): void {
    const profile = this.userProfile.getValue();
    this.userProfile.next({
      ...profile,
      coins: profile.coins + amount
    });
    this.saveToStorage();
  }

  spendCoins(amount: number): boolean {
    const profile = this.userProfile.getValue();
    if (profile.coins >= amount) {
      this.userProfile.next({
        ...profile,
        coins: profile.coins - amount
      });
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // ==================== 打卡系统 ====================

  checkIn(): void {
    const profile = this.userProfile.getValue();
    const today = new Date().toDateString();
    const lastCheckIn = localStorage.getItem('kiddo_lastCheckIn');
    
    if (lastCheckIn !== today) {
      // 计算连续打卡天数
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const streakBroken = lastCheckIn !== yesterday.toDateString();
      
      const newStreakDays = streakBroken ? 1 : profile.streakDays + 1;
      
      this.userProfile.next({
        ...profile,
        streakDays: newStreakDays,
        totalStudyDays: profile.totalStudyDays + 1
      });
      
      localStorage.setItem('kiddo_lastCheckIn', today);
      this.todayChecked.next(true);
      this.saveToStorage();
      
      // 检查打卡勋章
      this.checkStreakBadges(newStreakDays);
    }
  }

  private checkStreakBadges(streakDays: number): void {
    const streakBadges = [
      { days: 3, badgeId: 'streak_3' },
      { days: 7, badgeId: 'streak_7' },
      { days: 14, badgeId: 'streak_14' },
      { days: 30, badgeId: 'streak_30' },
      { days: 100, badgeId: 'streak_100' }
    ];
    
    for (const { days, badgeId } of streakBadges) {
      if (streakDays >= days) {
        this.awardBadge(badgeId);
      }
    }
  }

  // ==================== 勋章系统 ====================

  getUserBadges(): Observable<UserBadge[]> {
    return this.userBadges.asObservable();
  }

  getAllBadges(): Badge[] {
    return BADGE_DATABASE;
  }

  awardBadge(badgeId: string): boolean {
    const badges = this.userBadges.getValue();
    if (badges.some(b => b.badgeId === badgeId)) {
      return false; // 已获得
    }
    
    const badge = BADGE_DATABASE.find(b => b.id === badgeId);
    if (!badge) return false;
    
    badges.push({
      badgeId,
      earnedAt: new Date()
    });
    
    this.userBadges.next(badges);
    this.saveToStorage();
    return true;
  }

  getEarnedBadgeCount(): number {
    return this.userBadges.getValue().length;
  }

  // ==================== 错题系统 ====================

  getWrongQuestions(): Observable<WrongQuestion[]> {
    return this.wrongQuestions.asObservable();
  }

  addWrongQuestion(type: 'word' | 'sentence', itemId: number): void {
    const questions = this.wrongQuestions.getValue();
    const existing = questions.find(q => q.type === type && q.itemId === itemId);
    
    if (existing) {
      existing.wrongCount++;
      existing.lastWrongAt = new Date();
    } else {
      questions.push({
        id: `${type}_${itemId}`,
        type,
        itemId,
        wrongCount: 1,
        lastWrongAt: new Date(),
        correctCount: 0
      });
    }
    
    this.wrongQuestions.next([...questions]);
    this.saveToStorage();
  }

  markCorrect(type: 'word' | 'sentence', itemId: number): void {
    const questions = this.wrongQuestions.getValue();
    const existing = questions.find(q => q.type === type && q.itemId === itemId);
    
    if (existing) {
      existing.correctCount++;
      // 连续答对2次，移出错题本
      if (existing.correctCount >= 2) {
        const index = questions.indexOf(existing);
        questions.splice(index, 1);
      }
      this.wrongQuestions.next([...questions]);
      this.saveToStorage();
    }
  }

  getWrongQuestionCount(): number {
    return this.wrongQuestions.getValue().length;
  }

  // ==================== 学习记录 ====================

  getStudyRecords(): Observable<StudyRecord[]> {
    return this.studyRecords.asObservable();
  }

  recordStudy(duration: number, wordsLearned: number, sentencesLearned: number, accuracy: number): void {
    const today = new Date().toISOString().split('T')[0];
    const records = this.studyRecords.getValue();
    const existing = records.find(r => r.date === today);
    
    if (existing) {
      existing.duration += duration;
      existing.wordsLearned += wordsLearned;
      existing.sentencesLearned += sentencesLearned;
      existing.accuracy = (existing.accuracy + accuracy) / 2;
    } else {
      records.push({
        date: today,
        duration,
        wordsLearned,
        sentencesLearned,
        accuracy
      });
    }
    
    this.studyRecords.next(records);
    this.saveToStorage();
  }

  // ==================== 辅助方法 ====================

  private initUserProfile(): UserProfile {
    return {
      id: this.generateId(),
      nickname: '小萌',
      avatar: '🦊',
      grade: 2,
      segment: 'lower',
      textbookVersion: 'pep',
      totalStudyDays: 0,
      streakDays: 0,
      coins: 0,
      createdAt: new Date()
    };
  }

  private initDailyTasks(): DailyTask[] {
    return [
      {
        id: 'word_learn',
        type: 'word_learn',
        title: '学单词',
        description: '学习5个新单词',
        target: 5,
        progress: 0,
        reward: 10,
        completed: false
      },
      {
        id: 'word_review',
        type: 'word_review',
        title: '复习巩固',
        description: '完成3道练习题',
        target: 3,
        progress: 0,
        reward: 5,
        completed: false
      },
      {
        id: 'sentence_learn',
        type: 'sentence_learn',
        title: '学句型',
        description: '学习1个新句型',
        target: 1,
        progress: 0,
        reward: 8,
        completed: false
      }
    ];
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private loadFromStorage(): void {
    try {
      const savedProfile = localStorage.getItem('kiddo_userProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        profile.createdAt = new Date(profile.createdAt);
        this.userProfile.next(profile);
      }
      
      const savedTasks = localStorage.getItem('kiddo_dailyTasks');
      if (savedTasks) {
        this.dailyTasks.next(JSON.parse(savedTasks));
      }
      
      const savedWrong = localStorage.getItem('kiddo_wrongQuestions');
      if (savedWrong) {
        const questions = JSON.parse(savedWrong);
        questions.forEach((q: WrongQuestion) => {
          q.lastWrongAt = new Date(q.lastWrongAt);
        });
        this.wrongQuestions.next(questions);
      }
      
      const savedBadges = localStorage.getItem('kiddo_userBadges');
      if (savedBadges) {
        const badges = JSON.parse(savedBadges);
        badges.forEach((b: UserBadge) => {
          b.earnedAt = new Date(b.earnedAt);
        });
        this.userBadges.next(badges);
      }
      
      const savedRecords = localStorage.getItem('kiddo_studyRecords');
      if (savedRecords) {
        this.studyRecords.next(JSON.parse(savedRecords));
      }
    } catch (e) {
      console.error('Failed to load from storage', e);
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('kiddo_userProfile', JSON.stringify(this.userProfile.getValue()));
      localStorage.setItem('kiddo_dailyTasks', JSON.stringify(this.dailyTasks.getValue()));
      localStorage.setItem('kiddo_wrongQuestions', JSON.stringify(this.wrongQuestions.getValue()));
      localStorage.setItem('kiddo_userBadges', JSON.stringify(this.userBadges.getValue()));
      localStorage.setItem('kiddo_studyRecords', JSON.stringify(this.studyRecords.getValue()));
    } catch (e) {
      console.error('Failed to save to storage', e);
    }
  }

  resetAll(): void {
    localStorage.removeItem('kiddo_userProfile');
    localStorage.removeItem('kiddo_dailyTasks');
    localStorage.removeItem('kiddo_wrongQuestions');
    localStorage.removeItem('kiddo_userBadges');
    localStorage.removeItem('kiddo_studyRecords');
    localStorage.removeItem('kiddo_lastCheckIn');
    
    this.userProfile.next(this.initUserProfile());
    this.dailyTasks.next(this.initDailyTasks());
    this.wrongQuestions.next([]);
    this.userBadges.next([]);
    this.studyRecords.next([]);
    this.todayChecked.next(false);
  }
}