import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments.component.html',
  styleUrl: '../properties/properties.component.css'
})
export class AdminPaymentsComponent {
  plans = [
    { id: 1, name: 'Basic', price: 0, listings: 5, featured: 0 },
    { id: 2, name: 'Pro Agent', price: 5000, listings: 50, featured: 5 },
    { id: 3, name: 'Agency Prime', price: 15000, listings: 'Unlimited', featured: 20 },
  ];
  
  recentPayments = [
    { id: 'TRX-9481', user: 'Asad Mehmood', plan: 'Pro Agent', amount: 5000, date: new Date(), status: 'completed' },
    { id: 'TRX-9482', user: 'Nadia Hussain', plan: 'Pro Agent', amount: 5000, date: new Date(Date.now() - 86400000), status: 'completed' },
  ];
}
