import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'words', 
    loadComponent: () => import('./pages/words/words.component').then(m => m.WordsComponent) 
  },
  { 
    path: 'sentences', 
    loadComponent: () => import('./pages/sentences/sentences.component').then(m => m.SentencesComponent) 
  },
  { 
    path: 'my', 
    loadComponent: () => import('./pages/my/my.component').then(m => m.MyComponent) 
  },
  { 
    path: 'badges', 
    loadComponent: () => import('./pages/badges/badges.component').then(m => m.BadgesComponent) 
  },
  { 
    path: 'settings', 
    loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent) 
  },
  // 趣味互动
  { 
    path: 'dubbing', 
    loadComponent: () => import('./pages/fun/fun.components').then(m => m.DubbingComponent) 
  },
  { 
    path: 'songs', 
    loadComponent: () => import('./pages/fun/fun.components').then(m => m.SongsComponent) 
  },
  { 
    path: 'stories', 
    loadComponent: () => import('./pages/fun/fun.components').then(m => m.StoriesComponent) 
  },
  { 
    path: 'battle', 
    loadComponent: () => import('./pages/fun/fun.components').then(m => m.BattleComponent) 
  },
  { path: '**', redirectTo: '' }
];