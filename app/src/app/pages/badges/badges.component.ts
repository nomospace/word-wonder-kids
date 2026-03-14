import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { KiddoService } from '../../services/kiddo.service';
import { Badge, BadgeCategory, UserBadge } from '../../models/kiddo.model';
import { BADGE_DATABASE } from '../../data/badge-data';

@Component({
  selector: 'app-badges',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="badges-container">
      <header class="page-header">
        <button class="back-btn" routerLink="/my">‹ 返回</button>
        <h1 class="page-title">🏆 我的勋章</h1>
        <span class="badge-count">{{ earnedIds.size }}/{{ allBadges.length }}</span>
      </header>

      <div class="stats-bar">
        <div class="stat"><span class="num">{{ earnedIds.size }}</span><span class="label">已获得</span></div>
        <div class="stat"><span class="num">{{ getRareCount('rare') }}</span><span class="label">稀有</span></div>
        <div class="stat"><span class="num">{{ getRareCount('epic') }}</span><span class="label">史诗</span></div>
        <div class="stat"><span class="num">{{ getRareCount('legendary') }}</span><span class="label">传说</span></div>
      </div>

      <div class="category-tabs">
        <button *ngFor="let cat of categories" class="cat-tab" [class.active]="selectedCat === cat.id" (click)="selectCat(cat.id)">{{ cat.name }}</button>
      </div>

      <div class="badges-grid">
        <div *ngFor="let badge of filteredBadges" class="badge-card" [class.earned]="isEarned(badge.id)" [class.rarity]="badge.rarity">
          <div class="badge-icon">{{ badge.icon }}</div>
          <div class="badge-info">
            <span class="badge-name">{{ badge.name }}</span>
            <span class="badge-desc">{{ badge.description }}</span>
          </div>
          <span class="earned-mark" *ngIf="isEarned(badge.id)">✓</span>
          <span class="rarity-tag" [class]="badge.rarity">{{ getRarityName(badge.rarity) }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .badges-container { min-height: 100vh; background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%); color: white; }
    .page-header { display: flex; align-items: center; padding: 16px; }
    .back-btn { background: none; border: none; color: white; font-size: 16px; cursor: pointer; }
    .page-title { flex: 1; text-align: center; font-size: 18px; }
    .badge-count { font-size: 14px; color: #FFD700; }
    .stats-bar { display: flex; justify-content: space-around; padding: 16px; background: rgba(255,255,255,0.05); }
    .stat { text-align: center; }
    .num { display: block; font-size: 20px; font-weight: 700; color: #FFD700; }
    .label { font-size: 11px; color: #aaa; }
    .category-tabs { display: flex; gap: 8px; padding: 16px; overflow-x: auto; }
    .cat-tab { padding: 8px 16px; background: rgba(255,255,255,0.1); border: none; border-radius: 20px; color: white; font-size: 13px; cursor: pointer; }
    .cat-tab.active { background: #FFD700; color: #333; }
    .badges-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 16px; }
    .badge-card { background: rgba(255,255,255,0.05); border-radius: 12px; padding: 16px; position: relative; opacity: 0.5; }
    .badge-card.earned { opacity: 1; background: rgba(255,215,0,0.1); border: 1px solid rgba(255,215,0,0.3); }
    .badge-icon { font-size: 40px; text-align: center; }
    .badge-info { text-align: center; margin-top: 8px; }
    .badge-name { display: block; font-size: 14px; font-weight: 600; }
    .badge-desc { display: block; font-size: 11px; color: #aaa; margin-top: 4px; }
    .earned-mark { position: absolute; top: 8px; right: 8px; background: #4CAF50; color: white; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; }
    .rarity-tag { position: absolute; top: 8px; left: 8px; font-size: 10px; padding: 2px 6px; border-radius: 4px; background: #666; }
    .rarity-tag.rare { background: #2196F3; }
    .rarity-tag.epic { background: #9C27B0; }
    .rarity-tag.legendary { background: linear-gradient(90deg, #FFD700, #FFA500); color: #333; }
  `]
})
export class BadgesComponent implements OnInit {
  allBadges: Badge[] = BADGE_DATABASE;
  filteredBadges: Badge[] = [];
  earnedIds: Set<string> = new Set();
  selectedCat = 'all';
  categories = [
    { id: 'all', name: '全部' },
    { id: 'learning', name: '学习' },
    { id: 'streak', name: '坚持' },
    { id: 'mastery', name: '掌握' },
    { id: 'special', name: '特殊' }
  ];

  constructor(private kiddoService: KiddoService) {}

  ngOnInit(): void {
    this.filteredBadges = this.allBadges;
    this.kiddoService.getUserBadges().subscribe(b => {
      this.earnedIds = new Set(b.map(ub => ub.badgeId));
    });
  }

  selectCat(catId: string): void {
    this.selectedCat = catId;
    this.filteredBadges = catId === 'all' ? this.allBadges : this.allBadges.filter(b => b.category === catId);
  }

  isEarned(id: string): boolean { return this.earnedIds.has(id); }

  getRareCount(rarity: Badge['rarity']): number {
    return Array.from(this.earnedIds).filter(id => {
      const b = this.allBadges.find(badge => badge.id === id);
      return b?.rarity === rarity;
    }).length;
  }

  getRarityName(rarity: Badge['rarity']): string {
    const names: Record<string, string> = { common: '普通', rare: '稀有', epic: '史诗', legendary: '传说' };
    return names[rarity];
  }
}