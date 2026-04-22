import { StatsService } from '../../shared/services/stats.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { LineSparklineComponent, TimePoint } from '../../shared/components/charts/line-sparkline.component';
import { BarMiniComponent } from '../../shared/components/charts/bar-mini.component';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, LineSparklineComponent, BarMiniComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: '../../admin/dashboard/dashboard.component.css'
})
export class SellerDashboardComponent implements OnInit {
  isLoading = true;
  hasError = false;
  dashboard: any = null;
  views: TimePoint[] = [];
  inquiries: TimePoint[] = [];
  userId!: number;

  constructor(
    private statsService: StatsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.statsService.getSellerDashboard(30).subscribe({
      next: (res) => {
        this.dashboard = res;
        this.views = (res?.charts?.viewsOverTime || []).map((p: any) => ({ date: p.date, count: p.count }));
        this.inquiries = (res?.charts?.inquiryTrends || []).map((p: any) => ({ date: p.date, count: p.count }));
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  get statCards() {
    const s = this.dashboard?.summary;
    if (!s) return [];
    
    return [
      { label: 'Total Listings', value: s.totalProperties, icon: 'fa-building', color: '#14b8a6', bg: 'linear-gradient(135deg, rgba(20,184,166,0.15) 0%, rgba(8,145,178,0.1) 100%)', trend: s.subscriptionUsage ? `${s.subscriptionUsage.remaining} left` : '—', trendUp: true },
      { label: 'Active Listings', value: s.activeListings, icon: 'fa-check-circle', color: '#22c55e', bg: 'linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(16,185,129,0.1) 100%)', trend: 'Live', trendUp: true },
      { label: 'Pending', value: s.pendingListings, icon: 'fa-clock', color: '#f59e0b', bg: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(251,191,36,0.1) 100%)', trend: 'Review', trendUp: true },
      { label: 'Total Views', value: s.totalViews, icon: 'fa-eye', color: '#8b5cf6', bg: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(168,85,247,0.1) 100%)', trend: 'Last 30d', trendUp: true },
      { label: 'Inquiries', value: s.totalInquiries, icon: 'fa-envelope-open-text', color: '#f43f5e', bg: 'linear-gradient(135deg, rgba(244,63,94,0.15) 0%, rgba(251,113,133,0.1) 100%)', trend: 'Leads', trendUp: true },
    ];
  }
}
