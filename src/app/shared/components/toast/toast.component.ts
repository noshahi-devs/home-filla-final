import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiService, Toast } from '../../services/ui.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div *ngFor="let t of toasts" class="toast-card" [ngClass]="t.type" (click)="remove(t.id)">
        <div class="toast-icon">
          <i class="fas" [ngClass]="getIcon(t.type)"></i>
        </div>
        <div class="toast-content">
          <div class="toast-title">{{ t.title }}</div>
          <div class="toast-message">{{ t.message }}</div>
        </div>
        <button class="toast-close"><i class="fas fa-times"></i></button>
        <div class="toast-progress" [style.animation-duration.ms]="t.timeout || 4000"></div>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 32px;
      right: 32px;
      z-index: 12000;
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 400px;
      pointer-events: none;
    }

    .toast-card {
      pointer-events: auto;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px) saturate(180%);
      -webkit-backdrop-filter: blur(12px) saturate(180%);
      border-radius: 20px;
      padding: 18px 24px;
      display: flex;
      align-items: center;
      gap: 18px;
      box-shadow: 0 25px 40px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.3);
      border-left: 6px solid transparent;
      cursor: pointer;
      animation: toastSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      position: relative;
      overflow: hidden;
      transition: all 0.3s;
    }

    .toast-card:hover { transform: scale(1.02); box-shadow: 0 30px 50px -15px rgba(0, 0, 0, 0.2); }

    @keyframes toastSlideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    .toast-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 4px;
      background: currentColor;
      width: 100%;
      animation: toastTimer linear forwards;
      opacity: 0.2;
    }

    @keyframes toastTimer {
      from { width: 100%; }
      to { width: 0%; }
    }

    .toast-icon {
      width: 44px;
      height: 44px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }

    .toast-card.success { border-left-color: #10b981; color: #10b981; }
    .toast-card.error { border-left-color: #ef4444; color: #ef4444; }
    .toast-card.info { border-left-color: #4f46e5; color: #4f46e5; }
    .toast-card.processing { border-left-color: #8b5cf6; color: #8b5cf6; }

    .toast-card.success .toast-icon { background: rgba(16, 185, 129, 0.1); }
    .toast-card.error .toast-icon { background: rgba(239, 68, 68, 0.1); }
    .toast-card.info .toast-icon { background: rgba(79, 70, 229, 0.1); }
    .toast-card.processing .toast-icon { background: rgba(139, 92, 246, 0.1); }

    .toast-content { flex: 1; min-width: 0; }
    .toast-title { font-weight: 800; color: #0f172a; font-size: 15px; margin-bottom: 2px; }
    .toast-message { font-size: 13px; color: #64748b; line-height: 1.5; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    
    .toast-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      padding: 4px;
      font-size: 14px;
      opacity: 0.5;
      transition: 0.2s;
    }
    .toast-close:hover { opacity: 1; color: #0f172a; }
  `]
})
export class ToastComponent implements OnInit {
  private uiService = inject(UiService);
  toasts: Toast[] = [];

  ngOnInit() {
    this.uiService.toast$.subscribe(toast => {
      this.toasts.push(toast);
      setTimeout(() => this.remove(toast.id), toast.timeout || 4000);
    });
  }

  getIcon(type: string) {
    switch (type) {
      case 'success': return 'fa-check-circle';
      case 'error': return 'fa-exclamation-circle';
      case 'info': return 'fa-info-circle';
      default: return 'fa-bell';
    }
  }

  remove(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }
}
