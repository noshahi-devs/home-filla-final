import { StatsService } from '../../shared/services/stats.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  stats: any;
  propertiesByCity: { city: string; count: number }[] = [];
  monthlyGrowth: { month: string; count: number }[] = [];
  recentActivity: any[] = [];
  maxCityCount = 0;
  maxMonthCount = 0;

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.statsService.getAdminStats().subscribe(stats => {
      this.stats = stats;
    });

    this.statsService.getPropertiesByCity().subscribe((data: any) => {
      this.propertiesByCity = data;
      this.maxCityCount = Math.max(...data.map((c: any) => c.count), 0);
    });

    this.statsService.getMonthlyGrowth().subscribe(data => {
      this.monthlyGrowth = data;
      this.maxMonthCount = Math.max(...data.map((m: any) => m.count), 0);
    });

    this.statsService.getRecentActivity().subscribe(data => {
      this.recentActivity = data;
    });
  }

  get statCards() {
    return [
      { label: 'Total Properties', value: this.stats?.totalProperties ?? 0, icon: 'fa-building', color: '#4a6cf7', bg: 'linear-gradient(135deg, rgba(74,108,247,0.15) 0%, rgba(124,58,237,0.1) 100%)', trend: '+12%', trendUp: true },
      { label: 'Active Listings', value: this.stats?.activeListings ?? 0, icon: 'fa-check-circle', color: '#22c55e', bg: 'linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(16,185,129,0.1) 100%)', trend: '+8%', trendUp: true },
      { label: 'Pending Approval', value: this.stats?.pendingApproval ?? 0, icon: 'fa-clock', color: '#f59e0b', bg: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(251,191,36,0.1) 100%)', trend: '+3', trendUp: false },
      { label: 'Total Users', value: this.stats?.totalUsers ?? 0, icon: 'fa-users', color: '#8b5cf6', bg: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(168,85,247,0.1) 100%)', trend: '+24%', trendUp: true },
      { label: 'Total Agents', value: this.stats?.totalAgents ?? 0, icon: 'fa-user-tie', color: '#06b6d4', bg: 'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(34,211,238,0.1) 100%)', trend: '+2', trendUp: true },
      { label: 'Total Inquiries', value: this.stats?.totalInquiries ?? 0, icon: 'fa-envelope-open-text', color: '#f43f5e', bg: 'linear-gradient(135deg, rgba(244,63,94,0.15) 0%, rgba(251,113,133,0.1) 100%)', trend: '+18%', trendUp: true },
    ];
  }

  getBarWidth(count: number): number {
    return this.maxCityCount > 0 ? (count / this.maxCityCount) * 100 : 0;
  }

  getBarHeight(count: number): number {
    return this.maxMonthCount > 0 ? (count / this.maxMonthCount) * 100 : 0;
  }

  getActivityIcon(type: string): string {
    const map: Record<string, string> = {
      property: 'fa-home', user: 'fa-user-plus', approval: 'fa-check',
      inquiry: 'fa-envelope', agent: 'fa-user-tie', rejection: 'fa-times'
    };
    return map[type] || 'fa-circle';
  }

  getActivityColor(type: string): string {
    const map: Record<string, string> = {
      property: '#4a6cf7', user: '#22c55e', approval: '#22c55e',
      inquiry: '#f59e0b', agent: '#8b5cf6', rejection: '#ef4444'
    };
    return map[type] || '#64748b';
  }
}




