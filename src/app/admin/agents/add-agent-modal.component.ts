import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AgentData {
  id?: number;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  avatar?: string;
  agencyName: string;
  status?: 'active' | 'pending' | 'blocked' | 'approved' | 'rejected';
  listingsCount?: number;
  rating?: number;
}

@Component({
  selector: 'app-add-agent-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay" *ngIf="isOpen" (click)="onOverlayClick($event)">
      <div class="modal-container" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>
            <i class="fas" [ngClass]="mode === 'add' ? 'fa-user-plus' : mode === 'edit' ? 'fa-user-edit' : 'fa-user-tie'"></i>
            {{ mode === 'add' ? 'Add New Agent' : mode === 'edit' ? 'Edit Agent Details' : 'Agent Information' }}
          </h2>
          <button class="close-btn" (click)="closeModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <form #agentForm="ngForm" class="form-grid">
            <!-- Premium Image Upload Section -->
            <div class="form-group full avatar-upload-section">
              <div class="avatar-preview-container">
                <img [src]="agentData.avatar || getDefaultAvatar(agentData.name)" alt="Avatar Preview" class="avatar-preview">
                <div class="upload-overlay" (click)="fileInput.click()" *ngIf="mode !== 'view'">
                  <i class="fas fa-camera"></i>
                </div>
              </div>
              <div class="upload-info">
                <label>Agent Photo</label>
                <p class="upload-hint">{{ mode === 'view' ? 'Official profile picture' : 'Click the circle to upload a profile picture.' }}</p>
                <button type="button" class="btn-upload" (click)="fileInput.click()" *ngIf="mode !== 'view'">
                  <i class="fas fa-image"></i>
                  Change Photo
                </button>
                <input #fileInput type="file" (change)="onFileSelected($event)" accept="image/*" style="display: none;">
              </div>
            </div>

            <div class="form-group full">
              <label for="name">Full Name *</label>
              <input type="text" id="name" name="name" [(ngModel)]="agentData.name" required 
                     [disabled]="mode === 'view'"
                     placeholder="e.g. Haris Ali" class="form-input">
            </div>
            
            <div class="form-group">
              <label for="email">Email Address *</label>
              <input type="email" id="email" name="email" [(ngModel)]="agentData.email" required 
                     [disabled]="mode === 'view'"
                     placeholder="agent@homefilla.com" class="form-input">
            </div>
            
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" [(ngModel)]="agentData.phone" 
                     [disabled]="mode === 'view'"
                     placeholder="+92 3XX XXXXXXX" class="form-input">
            </div>

            <div class="form-group">
              <label for="agencyName">Agency Name *</label>
              <input type="text" id="agencyName" name="agencyName" [(ngModel)]="agentData.agencyName" required 
                     [disabled]="mode === 'view'"
                     placeholder="e.g. RE/MAX Elite" class="form-input">
            </div>

            <div class="form-group" *ngIf="mode === 'add'">
              <label for="password">Initial Password *</label>
              <input type="password" id="password" name="password" [(ngModel)]="agentData.password" required 
                     placeholder="••••••••" class="form-input">
            </div>

            <div class="form-group" *ngIf="mode !== 'add'">
                <label>Status</label>
                <div class="status-static-badge" [ngClass]="agentData.status || 'pending'">
                    {{ (agentData.status || 'pending') | titlecase }}
                </div>
            </div>

            <div class="form-group full" *ngIf="mode !== 'view'">
              <label for="avatar">Avatar URL (Optional)</label>
              <input type="text" id="avatar" name="avatar" [(ngModel)]="agentData.avatar" 
                     placeholder="https://example.com/avatar.jpg" class="form-input">
            </div>
          </form>
        </div>
        
        <div class="modal-footer">
          <button type="button" class="btn-cancel" (click)="closeModal()">{{ mode === 'view' ? 'Close' : 'Cancel' }}</button>
          <button type="button" class="btn-submit" (click)="onSubmit()" *ngIf="mode !== 'view'"
                  [disabled]="!agentForm.form.valid || isProcessing">
            <i class="fas fa-spinner fa-spin" *ngIf="isProcessing"></i>
            {{ isProcessing ? 'Saving...' : mode === 'add' ? 'Create Agent Account' : 'Update Agent Details' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./add-agent-modal.component.css']
})
export class AddAgentModalComponent {
  @Input() isOpen: boolean = false;
  @Input() mode: 'add' | 'edit' | 'view' = 'add';
  @Input() initialData: AgentData | null = null;
  @Input() isProcessing: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<AgentData>();

  agentData: AgentData = this.getEmptyAgent();

  ngOnChanges() {
    if (this.isOpen && this.initialData) {
      this.agentData = { ...this.initialData };
    } else if (this.isOpen && !this.initialData) {
      this.agentData = this.getEmptyAgent();
    }
  }

  getEmptyAgent(): AgentData {
    return {
      name: '',
      email: '',
      password: '',
      phone: '',
      avatar: '',
      agencyName: ''
    };
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File is too large (max 2MB)');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.agentData.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  closeModal() {
    this.close.emit();
    this.resetForm();
  }

  onSubmit() {
    this.submit.emit({ ...this.agentData });
  }

  resetForm() {
    this.agentData = this.getEmptyAgent();
  }

  getDefaultAvatar(name: string): string {
    const letter = (name || '?').charAt(0).toUpperCase();
    const palette = ['#4f46e5', '#0891b2', '#059669', '#d97706', '#dc2626', '#7c3aed', '#ec4899'];
    const bg = palette[letter.charCodeAt(0) % palette.length];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" rx="50" fill="${bg}"/><text x="50" y="50" dy=".35em" text-anchor="middle" fill="white" font-size="42" font-family="Inter,Arial,sans-serif" font-weight="700">${letter}</text></svg>`;
    return 'data:image/svg+xml;base64,' + btoa(svg);
  }
}
