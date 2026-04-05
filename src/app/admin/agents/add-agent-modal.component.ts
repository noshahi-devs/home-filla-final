import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AgentData {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  avatar?: string;
  agencyName: string;
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
            <i class="fas fa-user-plus"></i>
            Add New Agent
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
                <img [src]="agentData.avatar || 'assets/placeholder-user.jpg'" alt="Avatar Preview" class="avatar-preview">
                <div class="upload-overlay" (click)="fileInput.click()">
                  <i class="fas fa-camera"></i>
                </div>
              </div>
              <div class="upload-info">
                <label>Agent Photo</label>
                <p class="upload-hint">Click the circle to upload a profile picture.</p>
                <button type="button" class="btn-upload" (click)="fileInput.click()">
                  <i class="fas fa-image"></i>
                  Change Photo
                </button>
                <input #fileInput type="file" (change)="onFileSelected($event)" accept="image/*" style="display: none;">
              </div>
            </div>

            <div class="form-group full">
              <label for="name">Full Name *</label>
              <input type="text" id="name" name="name" [(ngModel)]="agentData.name" required 
                     placeholder="e.g. Haris Ali" class="form-input">
            </div>
            
            <div class="form-group">
              <label for="email">Email Address *</label>
              <input type="email" id="email" name="email" [(ngModel)]="agentData.email" required 
                     placeholder="agent@homefilla.com" class="form-input">
            </div>
            
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" [(ngModel)]="agentData.phone" 
                     placeholder="+92 3XX XXXXXXX" class="form-input">
            </div>

            <div class="form-group">
              <label for="agencyName">Agency Name *</label>
              <input type="text" id="agencyName" name="agencyName" [(ngModel)]="agentData.agencyName" required 
                     placeholder="e.g. RE/MAX Elite" class="form-input">
            </div>

            <div class="form-group">
              <label for="password">Initial Password *</label>
              <input type="password" id="password" name="password" [(ngModel)]="agentData.password" required 
                     placeholder="••••••••" class="form-input">
            </div>

            <div class="form-group full">
              <label for="avatar">Avatar URL (Optional)</label>
              <input type="text" id="avatar" name="avatar" [(ngModel)]="agentData.avatar" 
                     placeholder="https://example.com/avatar.jpg" class="form-input">
            </div>
          </form>
        </div>
        
        <div class="modal-footer">
          <button type="button" class="btn-cancel" (click)="closeModal()">Cancel</button>
          <button type="button" class="btn-submit" (click)="onSubmit()" [disabled]="!agentForm.form.valid">
            Create Agent Account
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./add-agent-modal.component.css']
})
export class AddAgentModalComponent {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<AgentData>();

  agentData: AgentData = {
    name: '',
    email: '',
    password: '',
    phone: '',
    avatar: '',
    agencyName: ''
  };

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
    this.resetForm();
  }

  resetForm() {
    this.agentData = {
      name: '',
      email: '',
      password: '',
      phone: '',
      avatar: '',
      agencyName: ''
    };
  }
}
