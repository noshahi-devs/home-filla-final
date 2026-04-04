import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MockDataService } from '../../shared/services/mock-data.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: '../../admin/dashboard/dashboard.component.css'
})
export class SellerDashboardComponent implements OnInit {
  stats: any = {
    totalListings: 0,
    activeListings: 0,
    pendingListings: 0,
    totalViews: 0,
    inquiriesReceived: 0
  };
  userId!: number;

  constructor(
    private dataService: MockDataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.dataService.getSellerStats(this.userId).subscribe(stats => {
      this.stats = stats;
    });
  }

  get statCards() {
    if (!this.stats) return [];
    
    return [
      { label: 'My Listings', value: this.stats.totalListings, icon: 'fa-building', color: '#14b8a6', bg: 'linear-gradient(135deg, rgba(20,184,166,0.15) 0%, rgba(8,145,178,0.1) 100%)', trend: '+2', trendUp: true },
      { label: 'Active', value: this.stats.activeListings, icon: 'fa-check-circle', color: '#22c55e', bg: 'linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(16,185,129,0.1) 100%)', trend: 'Stable', trendUp: true },
      { label: 'Pending', value: this.stats.pendingListings, icon: 'fa-clock', color: '#f59e0b', bg: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(251,191,36,0.1) 100%)', trend: '-1', trendUp: false },
      { label: 'Total Views', value: this.stats.totalViews, icon: 'fa-eye', color: '#8b5cf6', bg: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(168,85,247,0.1) 100%)', trend: '+45%', trendUp: true },
      { label: 'Inquiries', value: this.stats.inquiriesReceived, icon: 'fa-envelope-open-text', color: '#f43f5e', bg: 'linear-gradient(135deg, rgba(244,63,94,0.15) 0%, rgba(251,113,133,0.1) 100%)', trend: '+5', trendUp: true },
    ];
  }
}
