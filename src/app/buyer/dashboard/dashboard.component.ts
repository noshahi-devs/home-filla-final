import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class BuyerDashboardComponent implements OnInit {
  stats = [
    { label: 'Saved Homes', value: '12', icon: 'fa-heart', color: '#f43f5e', bg: 'linear-gradient(135deg, rgba(244,63,94,0.15) 0%, rgba(225,29,72,0.1) 100%)', trend: '+1', trendUp: true },
    { label: 'My Inquiries', value: '4', icon: 'fa-envelope-open', color: '#3b82f6', bg: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.1) 100%)', trend: 'Active', trendUp: true },
    { label: 'Properties Viewed', value: '48', icon: 'fa-eye', color: '#8b5cf6', bg: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(124,58,237,0.1) 100%)', trend: '+12%', trendUp: true },
    { label: 'Recommended', value: '5', icon: 'fa-star', color: '#f59e0b', bg: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(217,119,6,0.1) 100%)', trend: 'New', trendUp: true }
  ];

  recommendedListings = [
    { 
      id: 1, 
      price: '$850,000', 
      beds: 3, 
      baths: 2, 
      sqft: '2,100', 
      address: '123 Pine St, San Francisco, CA',
      image: 'https://images.unsplash.com/photo-1600585154340-be6191ecdb10?auto=format&fit=crop&w=800&q=80',
      tag: 'New for You'
    },
    { 
      id: 2, 
      price: '$1,200,000', 
      beds: 4, 
      baths: 3, 
      sqft: '2,800', 
      address: '456 Oak Ln, Palo Alto, CA',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      tag: 'Price Drop'
    }
  ];

  marketTrends = {
    medianPrice: '$920k',
    trend: '+4.2%',
    inventory: 'Low',
    daysOnMarket: '18 days'
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
