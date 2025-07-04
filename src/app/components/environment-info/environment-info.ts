import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-environment-info',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatChipsModule,
        MatButtonModule,
        MatTooltipModule
    ],
    template: `
    @if (environment.debug) {
      <mat-card class="env-info-card" [class.expanded]="isExpanded">
        @if (!isExpanded) {
          <!-- Versión miniatura -->
          <div class="mini-version">
            <mat-icon>info</mat-icon>
            <span class="env-badge">{{ environment.production ? 'PROD' : 'DEV' }}</span>
            <button
              mat-icon-button
              (click)="toggleExpansion()"
              matTooltip="Expandir información del entorno">
              <mat-icon>expand_more</mat-icon>
            </button>
          </div>
        } @else {
          <!-- Versión expandida -->
          <mat-card-header>
            <mat-card-title>
              <mat-icon>info</mat-icon>
              Información del Entorno
            </mat-card-title>
            <button
              mat-icon-button
              (click)="toggleExpansion()"
              class="close-button"
              matTooltip="Minimizar">
              <mat-icon>expand_less</mat-icon>
            </button>
          </mat-card-header>
          <mat-card-content>
            <div class="env-details">
              <div class="env-item">
                <strong>Entorno:</strong>
                <mat-chip [color]="environment.production ? 'warn' : 'primary'" selected>
                  {{ environment.production ? 'Producción' : 'Desarrollo' }}
                </mat-chip>
              </div>

              <div class="env-item">
                <strong>API URL:</strong>
                <span class="api-url">{{ environment.apiUrl }}</span>
              </div>

              <div class="env-item">
                <strong>Versión:</strong>
                <span>{{ environment.version }}</span>
              </div>

              <div class="env-item">
                <strong>Nombre:</strong>
                <span>{{ environment.appName }}</span>
              </div>

              @if (environment.features) {
                <div class="env-item">
                  <strong>Características:</strong>
                  <div class="features-list">
                    @if (environment.features.enableDebugLogs) {
                      <mat-chip color="accent" selected>Debug Logs</mat-chip>
                    }
                    @if (environment.features.enableAnalytics) {
                      <mat-chip color="accent" selected>Analytics</mat-chip>
                    }
                    @if (environment.features.enableMockData) {
                      <mat-chip color="accent" selected>Mock Data</mat-chip>
                    }
                  </div>
                </div>
              }
            </div>
          </mat-card-content>
        }
      </mat-card>
    }
  `,
    styles: [`
    .env-info-card {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .env-info-card:not(.expanded) {
      width: auto;
      min-width: 120px;
    }

    .env-info-card.expanded {
      width: 350px;
    }

    .mini-version {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      cursor: pointer;
    }

    .mini-version mat-icon {
      color: #666;
      font-size: 18px;
    }

    .env-badge {
      background: #e3f2fd;
      color: #1976d2;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .close-button {
      position: absolute;
      top: 8px;
      right: 8px;
    }

    .env-details {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .env-item {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .env-item strong {
      min-width: 80px;
      color: #666;
    }

    .api-url {
      font-family: monospace;
      background: #f5f5f5;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      word-break: break-all;
    }

    .features-list {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
    }

    mat-card-header {
      padding-bottom: 8px;
      position: relative;
    }

    mat-card-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;
      margin: 0;
    }

    mat-card-content {
      padding-top: 0;
    }

    @media (max-width: 768px) {
      .env-info-card {
        position: static;
        width: 100% !important;
        margin: 20px 0;
      }

      .mini-version {
        justify-content: center;
      }
    }
  `]
})
export class EnvironmentInfo {
    environment = environment;
    isExpanded = false;

    toggleExpansion() {
        this.isExpanded = !this.isExpanded;
    }
}