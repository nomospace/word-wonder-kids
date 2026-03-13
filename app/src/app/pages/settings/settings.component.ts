import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TtsService } from '../../services/tts.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="settings-page">
      <div class="page-header">
        <a routerLink="/" class="back-btn">
          <span>⬅️</span> 返回
        </a>
        <h1>⚙️ 设置</h1>
      </div>

      <!-- 发音设置 -->
      <div class="settings-section">
        <h3>🔊 发音设置</h3>
        
        <div class="setting-item">
          <label>语速</label>
          <input 
            type="range" 
            min="0.5" 
            max="1.5" 
            step="0.1" 
            [(ngModel)]="ttsRate"
            (change)="testSpeech()"
            class="range-input"
          >
          <span class="range-value">{{ ttsRate }}x</span>
        </div>

        <div class="setting-item">
          <label>音调</label>
          <input 
            type="range" 
            min="0.5" 
            max="1.5" 
            step="0.1" 
            [(ngModel)]="ttsPitch"
            (change)="testSpeech()"
            class="range-input"
          >
          <span class="range-value">{{ ttsPitch }}x</span>
        </div>

        <button class="test-btn" (click)="testSpeech()">
          🔊 测试发音
        </button>

        <p class="setting-hint" *ngIf="!ttsSupported">
          ⚠️ 您的浏览器不支持语音合成
        </p>
      </div>

      <!-- 学习设置 -->
      <div class="settings-section">
        <h3>📚 学习设置</h3>
        
        <div class="setting-item">
          <label>每日学习目标</label>
          <select [(ngModel)]="dailyGoal" class="select-input">
            <option value="10">10 个单词</option>
            <option value="20">20 个单词</option>
            <option value="30">30 个单词</option>
            <option value="50">50 个单词</option>
          </select>
        </div>

        <div class="setting-item">
          <label>学习提醒</label>
          <label class="toggle-label">
            <input type="checkbox" [(ngModel)]="enableReminder">
            <span class="toggle-switch"></span>
            <span class="toggle-text">启用每日提醒</span>
          </label>
        </div>

        <div class="setting-item" *ngIf="enableReminder">
          <label>提醒时间</label>
          <input 
            type="time" 
            [(ngModel)]="reminderTime"
            class="time-input"
          >
        </div>
      </div>

      <!-- 显示设置 -->
      <div class="settings-section">
        <h3>🎨 显示设置</h3>
        
        <div class="setting-item">
          <label>字体大小</label>
          <select [(ngModel)]="fontSize" class="select-input">
            <option value="small">小</option>
            <option value="medium">中</option>
            <option value="large">大</option>
          </select>
        </div>

        <div class="setting-item">
          <label>深色模式</label>
          <label class="toggle-label">
            <input type="checkbox" [(ngModel)]="darkMode" (change)="toggleDarkMode()">
            <span class="toggle-switch"></span>
            <span class="toggle-text">启用深色模式</span>
          </label>
        </div>
      </div>

      <!-- 关于 -->
      <div class="settings-section about-section">
        <h3>ℹ️ 关于</h3>
        <div class="about-info">
          <p><strong>Word Wonder Kids</strong></p>
          <p>版本：1.0.0</p>
          <p>使用 Angular 17+ 构建</p>
          <p>单词来源：Oxford 3000, Dolch Sight Words, Fry Words</p>
        </div>
        <div class="links">
          <a href="https://github.com/nomospace/word-wonder-kids" target="_blank" class="link-btn">
            🦞 GitHub 项目
          </a>
        </div>
      </div>

      <!-- 清除数据 -->
      <div class="settings-section danger-section">
        <h3>⚠️ 危险操作</h3>
        <button class="danger-btn" (click)="clearAllData()">
          🗑️ 清除所有数据
        </button>
      </div>
    </div>
  `,
  styles: [`
    .settings-page {
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

    .settings-section {
      background: white;
      padding: 1.5rem;
      border-radius: 1rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      margin-bottom: 1.5rem;
    }

    .settings-section h3 {
      margin: 0 0 1rem 0;
      color: #333;
      font-size: 1.125rem;
    }

    .setting-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .setting-item:last-child {
      border-bottom: none;
    }

    .setting-item label {
      font-weight: 500;
      color: #666;
    }

    .range-input {
      width: 150px;
    }

    .range-value {
      width: 40px;
      text-align: right;
      font-weight: 600;
      color: #667eea;
    }

    .select-input, .time-input {
      padding: 0.5rem;
      border: 1px solid #e0e0e0;
      border-radius: 0.5rem;
      font-size: 0.875rem;
    }

    .test-btn {
      width: 100%;
      padding: 0.75rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      margin-top: 1rem;
    }

    .setting-hint {
      margin: 0.5rem 0 0 0;
      color: #f59e0b;
      font-size: 0.875rem;
    }

    .toggle-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    .toggle-label input {
      display: none;
    }

    .toggle-switch {
      width: 50px;
      height: 26px;
      background: #e0e0e0;
      border-radius: 13px;
      position: relative;
      transition: background 0.3s;
    }

    .toggle-switch::after {
      content: '';
      position: absolute;
      width: 22px;
      height: 22px;
      background: white;
      border-radius: 50%;
      top: 2px;
      left: 2px;
      transition: transform 0.3s;
    }

    .toggle-label input:checked + .toggle-switch {
      background: #667eea;
    }

    .toggle-label input:checked + .toggle-switch::after {
      transform: translateX(24px);
    }

    .toggle-text {
      font-weight: 500;
      color: #666;
    }

    .about-info {
      color: #666;
      line-height: 1.8;
    }

    .about-info p {
      margin: 0.25rem 0;
    }

    .link-btn {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      border-radius: 0.5rem;
      font-weight: 600;
      margin-top: 1rem;
    }

    .danger-section {
      border: 2px solid #fee2e2;
    }

    .danger-btn {
      width: 100%;
      padding: 1rem;
      background: #fee2e2;
      color: #dc2626;
      border: none;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .danger-btn:hover {
      background: #fecaca;
    }

    @media (max-width: 640px) {
      .setting-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .range-input {
        width: 100%;
      }

      .range-value {
        width: auto;
        text-align: left;
      }
    }
  `]
})
export class SettingsComponent implements OnInit {
  ttsRate = 0.8;
  ttsPitch = 1.0;
  ttsSupported = true;
  dailyGoal = '20';
  enableReminder = false;
  reminderTime = '19:00';
  fontSize = 'medium';
  darkMode = false;

  constructor(private ttsService: TtsService) {}

  ngOnInit(): void {
    this.ttsSupported = this.ttsService.isSupported();
    this.loadSettings();
  }

  loadSettings(): void {
    try {
      const settings = localStorage.getItem('wordWonderSettings');
      if (settings) {
        const data = JSON.parse(settings);
        this.ttsRate = data.ttsRate || 0.8;
        this.ttsPitch = data.ttsPitch || 1.0;
        this.dailyGoal = data.dailyGoal || '20';
        this.enableReminder = data.enableReminder || false;
        this.reminderTime = data.reminderTime || '19:00';
        this.fontSize = data.fontSize || 'medium';
        this.darkMode = data.darkMode || false;
      }
    } catch (e) {
      console.error('Failed to load settings', e);
    }
  }

  saveSettings(): void {
    try {
      const settings = {
        ttsRate: this.ttsRate,
        ttsPitch: this.ttsPitch,
        dailyGoal: this.dailyGoal,
        enableReminder: this.enableReminder,
        reminderTime: this.reminderTime,
        fontSize: this.fontSize,
        darkMode: this.darkMode
      };
      localStorage.setItem('wordWonderSettings', JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  }

  testSpeech(): void {
    this.ttsService.speak('Hello! This is a test.', this.ttsRate, this.ttsPitch);
    this.saveSettings();
  }

  toggleDarkMode(): void {
    document.body.classList.toggle('dark-mode', this.darkMode);
    this.saveSettings();
  }

  clearAllData(): void {
    if (confirm('确定要清除所有数据吗？此操作不可恢复！')) {
      localStorage.clear();
      location.reload();
    }
  }
}
