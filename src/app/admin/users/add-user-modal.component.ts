import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface UserData {
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'seller' | 'buyer' | 'agent';
  status: 'active' | 'blocked';
}

@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay" *ngIf="isOpen" (click)="onOverlayClick($event)">
      <div class="modal-container" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Add New User</h2>
          <button class="close-btn" (click)="closeModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <form (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="name" data-required="*">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                [(ngModel)]="userData.name" 
                required
                placeholder="Enter user's full name"
                class="form-input"
              >
            </div>
            
            <div class="form-group">
              <label for="email" data-required="*">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                [(ngModel)]="userData.email" 
                required
                placeholder="user@example.com"
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
                placeholder="+1 (555) 123-4567"
                class="form-input"
              >
            </div>
            
            <div class="form-group">
              <label for="role" data-required="*">Role</label>
              <select 
                id="role" 
                name="role" 
                [(ngModel)]="userData.role" 
                required
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
                class="form-select"
              >
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </form>
        </div>
        
        <div class="modal-footer">
          <button type="button" class="btn-secondary" (click)="closeModal()">
            Cancel
          </button>
          <button type="button" class="btn-primary" (click)="onSubmit()" [disabled]="!isFormValid()">
            <i class="fas fa-plus"></i>
            Add User
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<UserData>();

  userData: UserData = {
    name: '',
    email: '',
    phone: '',
    role: 'buyer',
    status: 'active'
  };

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
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
    return this.userData.name.trim() !== '' && 
           this.userData.email.trim() !== '' && 
           this.userData.role !== undefined && 
           this.userData.role !== null;
  }

  resetForm() {
    this.userData = {
      name: '',
      email: '',
      phone: '',
      role: 'buyer',
      status: 'active'
    };
  }
}
