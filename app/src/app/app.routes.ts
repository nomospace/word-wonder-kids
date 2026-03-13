import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'learn', 
    loadComponent: () => import('./pages/learn/learn.component').then(m => m.LearnComponent) 
  },
  { 
    path: 'game', 
    loadComponent: () => import('./pages/game/game.component').then(m => m.GameComponent) 
  },
  { 
    path: 'progress', 
    loadComponent: () => import('./pages/progress/progress.component').then(m => m.ProgressComponent) 
  },
  { 
    path: 'settings', 
    loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent) 
  },
  { path: '**', redirectTo: '' }
];
