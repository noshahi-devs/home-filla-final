import { StatsService } from '../../shared/services/stats.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: '../../admin/dashboard/dashboard.component.css'
})
export class BuyerDashboardComponent implements OnInit {
  stats: any = {
    savedProperties: 0,
    inquiriesSent: 0,
    propertiesViewed: 0,
    recommended: 0
  };
  userId!: number;

  constructor(
    private statsService: StatsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.statsService.getBuyerStats(this.userId).subscribe(stats => {
      this.stats = stats;
    });
  }

  get statCards() {
    if (!this.stats) return [];

    return [
      { label: 'Saved Properties', value: this.stats.savedProperties, icon: 'fa-heart', color: '#f43f5e', bg: 'linear-gradient(135deg, rgba(244,63,94,0.15) 0%, rgba(225,29,72,0.1) 100%)', trend: '+1', trendUp: true },
      { label: 'My Inquiries', value: this.stats.inquiriesSent, icon: 'fa-envelope-open', color: '#3b82f6', bg: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.1) 100%)', trend: 'Active', trendUp: true },
      { label: 'Properties Viewed', value: this.stats.propertiesViewed, icon: 'fa-eye', color: '#8b5cf6', bg: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(124,58,237,0.1) 100%)', trend: '+12%', trendUp: true },
      { label: 'Recommended', value: this.stats.recommended, icon: 'fa-star', color: '#f59e0b', bg: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(217,119,6,0.1) 100%)', trend: 'New', trendUp: true }
    ];
  }
}
