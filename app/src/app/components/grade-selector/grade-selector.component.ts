import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WordService } from '../../services/word.service';
import { GradeLevel } from '../../models/word.model';

@Component({
  selector: 'app-grade-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="grade-selector">
      <label for="grade" class="grade-label">
        <span class="label-icon">🎓</span>
        <span class="label-text">选择年级</span>
      </label>
      <select 
        id="grade" 
        [(ngModel)]="selectedGradeId" 
        (ngModelChange)="onGradeChange($event)"
        class="grade-select"
      >
        <option *ngFor="let grade of grades" [value]="grade.id">
          {{ grade.displayName }} ({{ grade.name }})
        </option>
      </select>
      <div class="grade-info" *ngIf="selectedGrade">
        <span class="word-count">📚 {{ selectedGrade.wordCount }} 单词</span>
        <span class="difficulty">⭐ 难度：{{ selectedGrade.difficultyRange[0] }}-{{ selectedGrade.difficultyRange[1] }}</span>
      </div>
    </div>
  `,
  styles: [`
    .grade-selector {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1.5rem;
      border-radius: 1rem;
      color: white;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }

    .grade-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
    }

    .label-icon {
      font-size: 1.25rem;
    }

    .grade-select {
      width: 100%;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      border: none;
      border-radius: 0.5rem;
      background: white;
      color: #333;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .grade-select:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
    }

    .grade-info {
      display: flex;
      justify-content: space-between;
      margin-top: 0.75rem;
      font-size: 0.875rem;
      opacity: 0.9;
    }

    @media (max-width: 640px) {
      .grade-selector {
        padding: 1rem;
      }

      .grade-label {
        font-size: 0.875rem;
      }

      .grade-select {
        font-size: 0.875rem;
        padding: 0.625rem 0.875rem;
      }
    }
  `]
})
export class GradeSelectorComponent implements OnInit {
  grades: GradeLevel[] = [];
  selectedGradeId: string = 'g2';
  selectedGrade: GradeLevel | null = null;

  constructor(private wordService: WordService) {}

  ngOnInit(): void {
    this.grades = this.wordService.getGradeLevels();
    this.wordService.getCurrentGradeId().subscribe(gradeId => {
      this.selectedGradeId = gradeId;
      this.selectedGrade = this.grades.find(g => g.id === gradeId) || null;
    });
  }

  onGradeChange(gradeId: string): void {
    this.wordService.setCurrentGradeId(gradeId);
    this.selectedGrade = this.grades.find(g => g.id === gradeId) || null;
  }
}
