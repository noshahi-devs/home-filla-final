import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StatsService } from '../../shared/services/stats.service';
import { LineSparklineComponent, TimePoint } from '../../shared/components/charts/line-sparkline.component';
import { BarMiniComponent } from '../../shared/components/charts/bar-mini.component';

@Component({
  selector: 'app-seller-analytics',
  standalone: true,
  imports: [CommonModule, RouterModule, LineSparklineComponent, BarMiniComponent],
  templateUrl: './analytics.component.html',
  styleUrl: '../my-properties/my-properties.component.css',
})
export class SellerAnalyticsComponent implements OnInit {
  isLoading = true;
  hasError = false;
  data: any = null;

  views: TimePoint[] = [];
  inquiries: TimePoint[] = [];

  constructor(private stats: StatsService) {}

  ngOnInit(): void {
    this.stats.getSellerDashboard(30).subscribe({
      next: (res) => {
        this.data = res;
        this.views = (res?.charts?.viewsOverTime || []).map((p: any) => ({ date: p.date, count: p.count }));
        this.inquiries = (res?.charts?.inquiryTrends || []).map((p: any) => ({ date: p.date, count: p.count }));
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }
}

