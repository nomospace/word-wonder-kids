import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dubbing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="fun-page">
      <header class="page-header"><button class="back-btn" routerLink="/">‹</button><h1>🎬 英语配音</h1></header>
      <div class="coming-soon"><span class="icon">🎬</span><h2>功能开发中</h2><p>即将推出有趣的电影配音功能！</p></div>
    </div>`,
  styles: [`.fun-page{min-height:100vh;background:#1a1a2e;color:white}.page-header{display:flex;align-items:center;padding:16px}.back-btn{background:none;border:none;color:white;font-size:20px}.page-header h1{flex:1;text-align:center;font-size:18px}.coming-soon{text-align:center;padding:60px 20px}.icon{font-size:64px}.coming-soon h2{margin:16px 0 8px}.coming-soon p{color:#aaa}`]
})
export class DubbingComponent {}

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="fun-page">
      <header class="page-header"><button class="back-btn" routerLink="/">‹</button><h1>🎵 英语儿歌</h1></header>
      <div class="coming-soon"><span class="icon">🎵</span><h2>功能开发中</h2><p>即将推出经典英语儿歌学习！</p></div>
    </div>`,
  styles: [`.fun-page{min-height:100vh;background:#1a1a2e;color:white}.page-header{display:flex;align-items:center;padding:16px}.back-btn{background:none;border:none;color:white;font-size:20px}.page-header h1{flex:1;text-align:center;font-size:18px}.coming-soon{text-align:center;padding:60px 20px}.icon{font-size:64px}.coming-soon h2{margin:16px 0 8px}.coming-soon p{color:#aaa}`]
})
export class SongsComponent {}

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="fun-page">
      <header class="page-header"><button class="back-btn" routerLink="/">‹</button><h1>📖 英语故事</h1></header>
      <div class="coming-soon"><span class="icon">📖</span><h2>功能开发中</h2><p>即将推出有趣的绘本故事！</p></div>
    </div>`,
  styles: [`.fun-page{min-height:100vh;background:#1a1a2e;color:white}.page-header{display:flex;align-items:center;padding:16px}.back-btn{background:none;border:none;color:white;font-size:20px}.page-header h1{flex:1;text-align:center;font-size:18px}.coming-soon{text-align:center;padding:60px 20px}.icon{font-size:64px}.coming-soon h2{margin:16px 0 8px}.coming-soon p{color:#aaa}`]
})
export class StoriesComponent {}

@Component({
  selector: 'app-battle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="fun-page">
      <header class="page-header"><button class="back-btn" routerLink="/">‹</button><h1>⚔️ 对战模式</h1></header>
      <div class="coming-soon"><span class="icon">⚔️</span><h2>功能开发中</h2><p>即将推出亲子/班级对战功能！</p></div>
    </div>`,
  styles: [`.fun-page{min-height:100vh;background:#1a1a2e;color:white}.page-header{display:flex;align-items:center;padding:16px}.back-btn{background:none;border:none;color:white;font-size:20px}.page-header h1{flex:1;text-align:center;font-size:18px}.coming-soon{text-align:center;padding:60px 20px}.icon{font-size:64px}.coming-soon h2{margin:16px 0 8px}.coming-soon p{color:#aaa}`]
})
export class BattleComponent {}