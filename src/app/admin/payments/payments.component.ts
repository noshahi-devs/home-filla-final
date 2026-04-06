import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../shared/services/payment.service';
import { Payment, SubscriptionPlan } from '../../shared/models/payment.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class AdminPaymentsComponent implements OnInit {
  private paymentService = inject(PaymentService);
  
  payments$: Observable<Payment[]> = new Observable<Payment[]>();
  
  plans: SubscriptionPlan[] = [
    { 
      id: 1, name: 'Basic', price: 0, listings: 5, featured: 0, color: '#4a6cf7',
      features: ['Standard Support', '5 Property Listings', 'Basic Analytics']
    },
    { 
      id: 2, name: 'Pro Agent', price: 5000, listings: 50, featured: 5, color: '#7c3aff',
      features: ['Priority Support', '50 Property Listings', '5 Featured Pins', 'Advanced Analytics']
    },
    { 
      id: 3, name: 'Agency Prime', price: 15000, listings: 'Unlimited', featured: 20, color: '#f59e0b',
      features: ['24/7 Dedicated Support', 'Unlimited Listings', '20 Featured Pins', 'Custom Branding']
    },
  ];

  stats = {
    totalRevenue: 26500,
    activeSubscriptions: 12,
    pendingPayments: 1
  };

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.payments$ = this.paymentService.getPayments();
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }
}
