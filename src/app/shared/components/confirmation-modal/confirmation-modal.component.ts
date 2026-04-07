import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiService, ConfirmationRequest } from '../../services/ui.service';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="confirm-overlay" *ngIf="request" (click)="onCancel()">
      <div class="confirm-card" (click)="$event.stopPropagation()">
        <div class="confirm-header" [ngClass]="request.type || 'danger'">
          <div class="icon-glow"></div>
          <div class="icon-circle">
            <i class="fas" [ngClass]="getIcon()"></i>
          </div>
        </div>
        
        <div class="confirm-body">
          <h2>{{ request.title }}</h2>
          <p>{{ request.message }}</p>
        </div>
        
        <div class="confirm-footer">
          <button class="btn-cancel" (click)="onCancel()">
            <i class="fas fa-times" style="margin-right: 8px;"></i>
            {{ request.cancelText || 'Cancel' }}
          </button>
          <button class="btn-confirm" [ngClass]="request.type || 'danger'" (click)="onConfirm()">
            <i class="fas" [ngClass]="getButtonIcon()" style="margin-right: 8px;"></i>
            {{ request.confirmText || 'Confirm Action' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .confirm-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      z-index: 15000;
      display: flex; align-items: center; justify-content: center;
      padding: 24px;
      animation: modalFadeIn 0.3s ease;
    }

    .confirm-card {
      background: rgba(255, 255, 255, 0.98);
      border-radius: 32px;
      width: 100%;
      max-width: 460px;
      overflow: hidden;
      box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1);
      animation: modalSlideUp 0.5s cubic-bezier(0.19, 1, 0.22, 1);
      border: 1px solid rgba(0,0,0,0.05);
    }

    @keyframes modalFadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes modalSlideUp { from { transform: translateY(40px) scale(0.95); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }

    .confirm-header {
      padding: 50px 24px 30px;
      display: flex;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    .icon-glow {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 180px; height: 180px;
      border-radius: 50%;
      filter: blur(40px);
      opacity: 0.2;
      z-index: 1;
    }

    .icon-circle {
      width: 90px; height: 90px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 36px;
      background: white;
      box-shadow: 0 15px 35px rgba(0,0,0,0.15);
      position: relative;
      z-index: 2;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .confirm-card:hover .icon-circle { transform: scale(1.1) rotate(5deg); }

    .confirm-header.danger .icon-circle { color: #ef4444; }
    .confirm-header.warning .icon-circle { color: #f59e0b; }
    .confirm-header.info .icon-circle { color: #4f46e5; }

    .confirm-header.danger .icon-glow { background: #ef4444; }
    .confirm-header.warning .icon-glow { background: #f59e0b; }
    .confirm-header.info .icon-glow { background: #4f46e5; }

    .confirm-header.danger { background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); }
    .confirm-header.warning { background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); }
    .confirm-header.info { background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%); }

    .confirm-body { padding: 8px 40px 32px; text-align: center; }
    .confirm-body h2 { font-size: 26px; font-weight: 900; color: #0f172a; margin-bottom: 12px; letter-spacing: -0.8px; }
    .confirm-body p { font-size: 16px; color: #64748b; line-height: 1.6; }

    .confirm-footer {
      padding: 0 40px 40px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    button {
      padding: 16px; border-radius: 16px; font-size: 14px; font-weight: 800; cursor: pointer; transition: all 0.3s; border: none; width: 100%;
      display: flex; align-items: center; justify-content: center;
    }

    .btn-cancel { background: #f1f5f9; color: #475569; }
    .btn-cancel:hover { background: #e2e8f0; transform: translateY(-2px); }

    .btn-confirm.danger { background: linear-gradient(135deg, #ef4444, #dc2626); color: white; box-shadow: 0 10px 20px rgba(239, 68, 68, 0.3); }
    .btn-confirm.warning { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3); }
    .btn-confirm.info { background: linear-gradient(135deg, #4f46e5, #4338ca); color: white; box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3); }

    .btn-confirm:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(0,0,0,0.2) !important; }
    .btn-confirm:active { transform: translateY(0); }
  `]
})
export class ConfirmationModalComponent implements OnInit {
  private uiService = inject(UiService);
  request: ConfirmationRequest | null = null;

  ngOnInit() {
    this.uiService.confirmation$.subscribe(req => {
      this.request = req;
    });
  }

  getIcon() {
    if (!this.request) return '';
    switch (this.request.type) {
      case 'danger': return 'fa-exclamation-triangle';
      case 'warning': return 'fa-exclamation-circle';
      case 'info': return 'fa-info-circle';
      default: return 'fa-question-circle';
    }
  }

  getButtonIcon() {
    if (!this.request) return 'fa-check';
    switch (this.request.type) {
      case 'danger': return 'fa-trash';
      case 'warning': return 'fa-exclamation-triangle';
      case 'info': return 'fa-check-circle';
      default: return 'fa-check';
    }
  }

  onConfirm() {
    if (this.request) {
      this.request.resolve(true);
    }
  }

  onCancel() {
    if (this.request) {
      this.request.resolve(false);
    }
  }
}
