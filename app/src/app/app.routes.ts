import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
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
