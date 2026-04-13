import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  // Navigation menus for the PRO Header
  productsMenu = [
    {
      label: 'Real Estate Lead Generation',
      links: ['Connections Plus', 'ReadyConnect Concierge', 'Market VIP']
    },
    {
      label: 'Real Estate Marketing',
      links: ['Market Reach', 'Local Expert', 'The Essentials Toolkit']
    }
  ];

  resourcesMenu = ['Blog', 'PRO Campaign Hub', 'Success Stories', '#ThrivePastFive'];

  // Form State
  isSubmitting = false;
  isSubmitted = false;

  formData = {
    name: '',
    email: '',
    phone: '',
    inquiry: 'Lead Generation',
    message: ''
  };

  onSubmit() {
    this.isSubmitting = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.isSubmitted = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  }
}
