import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-manage-rentals',
  standalone: true,
  imports: [CommonModule, RouterModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './manage-rentals.component.html',
  styleUrls: ['./manage-rentals.component.css']
})
export class ManageRentalsComponent {
  features = [
    {
      icon: 'fa-home',
      title: 'List Your Property',
      description: 'Reach millions of renters by syndicating your listing across the Home Filla network. Fill your vacancies faster.'
    },
    {
      icon: 'fa-users',
      title: 'Screen Tenants',
      description: 'Get comprehensive background and credit reports instantly so you can choose reliable renters with confidence.'
    },
    {
      icon: 'fa-credit-card',
      title: 'Collect Rent Online',
      description: 'Automate your monthly collections. Tenants can pay securely via bank transfer, and you get paid directly.'
    }
  ];
}
