import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-loading',
    standalone: true,
    imports: [
        CommonModule,
        MatProgressSpinnerModule
    ],
    template: `
    @if (isLoading) {
      <div class="loading-overlay">
        <div class="loading-content">
          <mat-spinner [diameter]="50"></mat-spinner>
          @if (message) {
            <p class="loading-message">{{ message }}</p>
          }
        </div>
      </div>
    }
  `,
    styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .loading-content {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      text-align: center;
      min-width: 200px;
    }

    .loading-message {
      margin-top: 15px;
      color: #666;
      font-size: 14px;
      margin-bottom: 0;
    }

    mat-spinner {
      margin: 0 auto;
    }
  `]
})
export class Loading {
    @Input() isLoading = false;
    @Input() message = 'Cargando...';
}