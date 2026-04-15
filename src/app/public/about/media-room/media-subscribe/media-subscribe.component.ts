import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SiteHeaderComponent } from '../../../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-media-subscribe',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SiteHeaderComponent,
    SiteFooterComponent
  ],
  templateUrl: './media-subscribe.component.html',
  styleUrl: './media-subscribe.component.css'
})
export class MediaSubscribeComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: ''
  };

  isSubmitted = false;
  isSubmitting = false;

  constructor() { }

  onSubmit(): void {
    if (!this.formData.email) {
      alert('Email is required');
      return;
    }

    this.isSubmitting = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.isSubmitted = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  }

  resetForm(): void {
    this.isSubmitted = false;
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      phone: ''
    };
  }
}
