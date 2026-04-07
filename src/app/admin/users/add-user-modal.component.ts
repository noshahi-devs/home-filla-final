import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface UserData {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'seller' | 'buyer' | 'agent';
  status: 'active' | 'blocked';
  avatar?: string;
  password?: string;
}

@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay" *ngIf="isOpen" (click)="onOverlayClick($event)">
      <div class="modal-container" (click)="$event.stopPropagation()">

        <!-- Header -->
        <div class="modal-header">
          <h2>{{ getModalTitle() }}</h2>
          <button class="close-btn" (click)="closeModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body">
          <form (ngSubmit)="onSubmit()">

            <!-- Avatar Upload -->
            <div class="avatar-section">
              <div class="avatar-preview-ring">
                <img
                  [src]="avatarPreview || userData.avatar || getDefaultAvatar()"
                  alt="User Avatar"
                  class="avatar-img"
                  (error)="onAvatarError($event)"
                >
                <button
                  type="button"
                  class="avatar-edit-btn"
                  *ngIf="mode !== 'view'"
                  (click)="fileInput.click()"
                  title="Upload Photo"
                >
                  <i class="fas fa-camera"></i>
                </button>
              </div>
              <div class="avatar-meta" *ngIf="mode !== 'view'">
                <span class="avatar-hint">PNG, JPG up to 5MB</span>
                <div class="avatar-btns">
                  <button type="button" class="btn-upload-sm" (click)="fileInput.click()">
                    <i class="fas fa-upload"></i> Upload
                  </button>
                  <button
                    type="button"
                    class="btn-remove-sm"
                    *ngIf="avatarPreview || userData.avatar"
                    (click)="removeAvatar()"
                  >
                    <i class="fas fa-trash"></i> Remove
                  </button>
                </div>
              </div>
              <input
                #fileInput
                type="file"
                accept="image/*"
                style="display:none"
                (change)="onImageSelected($event)"
              >
            </div>

            <!-- Form Row: Name + Phone -->
            <div class="form-row">
              <div class="form-group">
                <label for="name" data-required="*">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  [(ngModel)]="userData.name"
                  required
                  [readonly]="mode === 'view'"
                  placeholder="Enter full name"
                  class="form-input"
                >
              </div>
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  [(ngModel)]="userData.phone"
                  [readonly]="mode === 'view'"
                  placeholder="+1 (555) 123-4567"
                  class="form-input"
                >
              </div>
            </div>

            <!-- Email -->
            <div class="form-group">
              <label for="email" data-required="*">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                [(ngModel)]="userData.email"
                required
                [readonly]="mode === 'view'"
                placeholder="user@example.com"
                class="form-input"
              >
            </div>

            <!-- Password (add mode only) -->
            <div class="form-group" *ngIf="mode === 'add'">
              <label for="password" data-required="*">Password</label>
              <div class="input-icon-wrapper">
                <input
                  [type]="showPassword ? 'text' : 'password'"
                  id="password"
                  name="password"
                  [(ngModel)]="userData.password"
                  required
                  placeholder="Set a strong password"
                  class="form-input with-icon"
                >
                <button type="button" class="toggle-pw-btn" (click)="showPassword = !showPassword">
                  <i class="fas" [ngClass]="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
                </button>
              </div>
            </div>

            <!-- Form Row: Role + Status -->
            <div class="form-row">
              <div class="form-group">
                <label for="role" data-required="*">Role</label>
                <select
                  id="role"
                  name="role"
                  [(ngModel)]="userData.role"
                  required
                  [disabled]="mode === 'view'"
                  class="form-select"
                >
                  <option value="">Select a role</option>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="agent">Agent</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div class="form-group">
                <label for="status">Account Status</label>
                <select
                  id="status"
                  name="status"
                  [(ngModel)]="userData.status"
                  [disabled]="mode === 'view'"
                  class="form-select"
                >
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
            </div>

          </form>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button type="button" class="btn-secondary" (click)="closeModal()" [disabled]="isProcessing">
            <i class="fas" [ngClass]="mode === 'view' ? 'fa-times' : 'fa-ban'"></i>
            {{ mode === 'view' ? 'Close' : 'Cancel' }}
          </button>
          <button
            type="button"
            class="btn-primary"
            (click)="onSubmit()"
            *ngIf="mode !== 'view'"
            [disabled]="!isFormValid() || isProcessing"
          >
            <i class="fas" [ngClass]="isProcessing ? 'fa-spinner fa-spin' : (mode === 'add' ? 'fa-user-plus' : 'fa-save')"></i>
            {{ isProcessing ? 'Processing...' : (mode === 'add' ? 'Add User' : 'Save Changes') }}
          </button>
        </div>

      </div>
    </div>
  `,
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent {
  @Input() isOpen: boolean = false;
  @Input() isProcessing: boolean = false;
  @Input() mode: 'add' | 'edit' | 'view' = 'add';

  @Input() set initialData(data: UserData | null) {
    if (data) {
      this.userData = { ...data };
      this.avatarPreview = data.avatar || null;
    } else {
      this.resetForm();
    }
  }

  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<UserData>();

  userData: UserData = this.getEmptyUser();
  avatarPreview: string | null = null;
  showPassword: boolean = false;

  /* ─── Helpers ─── */
  getEmptyUser(): UserData {
    return { name: '', email: '', phone: '', role: 'buyer', status: 'active', avatar: '', password: '' };
  }

  getDefaultAvatar(): string {
    const name = this.userData.name || '?';
    const letter = name.charAt(0).toUpperCase();
    const palette = ['#4f46e5', '#0891b2', '#059669', '#d97706', '#dc2626', '#7c3aed'];
    const bg = palette[letter.charCodeAt(0) % palette.length];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="50" fill="${bg}"/>
      <text x="50" y="50" dy=".35em" text-anchor="middle" fill="white" font-size="42"
            font-family="Inter,Arial,sans-serif" font-weight="700">${letter}</text>
    </svg>`;
    return 'data:image/svg+xml;base64,' + btoa(svg);
  }

  onAvatarError(event: any): void {
    event.target.src = this.getDefaultAvatar();
  }

  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('Image is too large (max 5 MB).'); return; }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.avatarPreview = e.target.result;
      this.userData.avatar = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  removeAvatar(): void {
    this.avatarPreview = null;
    this.userData.avatar = '';
  }

  /* ─── Modal logic ─── */
  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget && !this.isProcessing) this.closeModal();
  }

  getModalTitle(): string {
    return this.mode === 'view' ? 'User Details' : this.mode === 'edit' ? 'Edit User' : 'Add New User';
  }

  closeModal() {
    this.close.emit();
    this.resetForm();
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.submit.emit({ ...this.userData });
      this.resetForm();
    }
  }

  isFormValid(): boolean {
    const base = this.userData.name.trim() !== '' && this.userData.email.trim() !== '' && !!this.userData.role;
    if (this.mode === 'add') return base && (this.userData.password?.trim() ?? '') !== '';
    return base;
  }

  resetForm() {
    this.userData = this.getEmptyUser();
    this.avatarPreview = null;
    this.showPassword = false;
  }
}
