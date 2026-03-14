import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { KiddoService } from '../../services/kiddo.service';
import { TextbookVersion, UserProfile } from '../../models/kiddo.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="settings-container">
      <header class="page-header">
        <button class="back-btn" routerLink="/my">‹ 返回</button>
        <h1 class="page-title">⚙️ 设置</h1>
      </header>

      <div class="settings-list">
        <!-- 用户设置 -->
        <div class="setting-group">
          <h3 class="group-title">用户设置</h3>
          <div class="setting-item">
            <span class="setting-label">昵称</span>
            <input type="text" [(ngModel)]="profile.nickname" (change)="saveProfile()" class="setting-input" />
          </div>
          <div class="setting-item">
            <span class="setting-label">头像</span>
            <div class="avatar-select">
              <span *ngFor="let a of avatars" class="avatar-option" [class.active]="profile.avatar === a" (click)="setAvatar(a)">{{ a }}</span>
            </div>
          </div>
          <div class="setting-item">
            <span class="setting-label">年级</span>
            <select [(ngModel)]="profile.grade" (change)="saveProfile()" class="setting-select">
              <option *ngFor="let g of grades" [value]="g">{{ g }}年级</option>
            </select>
          </div>
        </div>

        <!-- 教材设置 -->
        <div class="setting-group">
          <h3 class="group-title">教材设置</h3>
          <div class="setting-item">
            <span class="setting-label">教材版本</span>
            <select [(ngModel)]="profile.textbookVersion" (change)="saveProfile()" class="setting-select">
              <option value="pep">人教版</option>
              <option value="fltrp">外研版</option>
              <option value="sujiao">苏教版</option>
              <option value="bnu">北师大版</option>
            </select>
          </div>
        </div>

        <!-- 护眼设置 -->
        <div class="setting-group">
          <h3 class="group-title">护眼设置</h3>
          <div class="setting-item">
            <span class="setting-label">护眼模式</span>
            <label class="switch"><input type="checkbox" [(ngModel)]="eyeCareMode" /><span class="slider"></span></label>
          </div>
          <div class="setting-item">
            <span class="setting-label">休息提醒</span>
            <label class="switch"><input type="checkbox" [(ngModel)]="restReminder" /><span class="slider"></span></label>
          </div>
        </div>

        <!-- 其他 -->
        <div class="setting-group">
          <h3 class="group-title">其他</h3>
          <div class="setting-item clickable" (click)="resetData()">
            <span class="setting-label">重置学习数据</span>
            <span class="setting-value">›</span>
          </div>
          <div class="setting-item">
            <span class="setting-label">版本</span>
            <span class="setting-value">v1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-container { min-height: 100vh; background: #f5f5f5; }
    .page-header { display: flex; align-items: center; padding: 16px; background: white; }
    .back-btn { background: none; border: none; font-size: 16px; cursor: pointer; }
    .page-title { flex: 1; text-align: center; font-size: 18px; }
    .settings-list { padding: 16px; }
    .setting-group { background: white; border-radius: 12px; margin-bottom: 16px; overflow: hidden; }
    .group-title { font-size: 13px; color: #666; padding: 12px 16px 8px; margin: 0; }
    .setting-item { display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-bottom: 1px solid #f0f0f0; }
    .setting-item:last-child { border: none; }
    .setting-item.clickable { cursor: pointer; }
    .setting-label { font-size: 15px; }
    .setting-value { color: #999; }
    .setting-input { padding: 8px 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; }
    .setting-select { padding: 8px 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; background: white; }
    .avatar-select { display: flex; gap: 8px; }
    .avatar-option { font-size: 28px; padding: 4px; border-radius: 50%; cursor: pointer; }
    .avatar-option.active { background: #e3f2fd; }
    .switch { position: relative; width: 48px; height: 28px; }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; inset: 0; background: #ccc; border-radius: 28px; transition: .3s; }
    .slider:before { position: absolute; content: ""; height: 22px; width: 22px; left: 3px; bottom: 3px; background: white; border-radius: 50%; transition: .3s; }
    input:checked + .slider { background: #4CAF50; }
    input:checked + .slider:before { transform: translateX(20px); }
  `]
})
export class SettingsComponent {
  profile: UserProfile;
  avatars = ['🦊', '🐰', '🐼', '🐨', '🦁', '🐯', '🐻', '🐸'];
  grades = [1, 2, 3, 4, 5, 6];
  eyeCareMode = false;
  restReminder = true;

  constructor(private kiddoService: KiddoService) {
    this.profile = this.kiddoService.getCurrentProfile();
  }

  setAvatar(a: string): void {
    this.profile.avatar = a;
    this.saveProfile();
  }

  saveProfile(): void {
    this.kiddoService.updateUserProfile(this.profile);
  }

  resetData(): void {
    if (confirm('确定要重置所有学习数据吗？此操作不可恢复！')) {
      this.kiddoService.resetAll();
      alert('数据已重置');
    }
  }
}