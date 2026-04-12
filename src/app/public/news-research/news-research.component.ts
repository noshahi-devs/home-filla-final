import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';
import { NewsService } from '../../core/services/news.service';

@Component({
  selector: 'app-news-research',
  standalone: true,
  imports: [CommonModule, RouterModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './news-research.component.html',
  styleUrls: ['../news-insights/news-insights.css', './news-research.component.css']
})
export class NewsResearchComponent implements OnInit {
  navLinks: any[] = [];

  marketStats = [
    { label: 'Median Home Price', value: '$428,700', change: '+4.2%', positive: true, icon: '🏠' },
    { label: 'Mortgage Rate (30yr)', value: '6.82%', change: '-0.12%', positive: true, icon: '📉' },
    { label: 'Active Listings', value: '872,000', change: '+18.4%', positive: true, icon: '📋' },
    { label: 'Days on Market', value: '43 days', change: '+6 days', positive: false, icon: '📅' }
  ];

  economist = {
    name: 'Danielle Hale',
    title: 'Chief Economist, Home Filla',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    quote: 'The housing market continues to show resilience despite elevated borrowing costs. We expect gradual improvement in affordability as we move through 2026.'
  };

  weeklyReports = [
    {
      title: 'Weekly Housing Market Update — April 2026',
      date: 'April 13, 2026',
      excerpt: 'Home prices rose modestly this week, with the greatest gains in the Midwest. Inventory continues to improve nationally.',
      imageUrl: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=800&q=80',
      tag: 'WEEKLY UPDATE'
    },
    {
      title: '2026 Housing Market Predictions: Mid-Year Revision',
      date: 'April 7, 2026',
      excerpt: 'We are revising our home price forecast upward by 1.5 percentage points as strong demand continues to outpace expectations.',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      tag: 'FORECAST'
    },
    {
      title: 'Affordability Index: Which Markets Offer the Best Value?',
      date: 'March 31, 2026',
      excerpt: 'Our affordability index scores 300+ metro areas across income, price, and rate data. See where buyers get the most for their money.',
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      tag: 'SPECIAL REPORT'
    }
  ];

  topMarkets = [
    { rank: 1, city: 'Columbus, OH', priceGrowth: '+8.1%', inventory: '↑ High', score: 94 },
    { rank: 2, city: 'Indianapolis, IN', priceGrowth: '+7.4%', inventory: '↑ High', score: 91 },
    { rank: 3, city: 'Charlotte, NC', priceGrowth: '+6.9%', inventory: '↑ Moderate', score: 89 },
    { rank: 4, city: 'Dallas, TX', priceGrowth: '+6.2%', inventory: '↑ Moderate', score: 86 },
    { rank: 5, city: 'Nashville, TN', priceGrowth: '+5.8%', inventory: '↓ Low', score: 83 }
  ];

  researchCategories = [
    { label: 'Housing Market Forecasts', count: 48, icon: '📊' },
    { label: 'Affordability Studies', count: 36, icon: '💰' },
    { label: 'Migration Trends', count: 29, icon: '🗺️' },
    { label: 'Rental Market Analysis', count: 22, icon: '🏢' },
    { label: 'Economic Indicators', count: 31, icon: '📈' },
    { label: 'Consumer Surveys', count: 17, icon: '🗳️' }
  ];

  chartBars = [65, 72, 68, 80, 75, 90, 85, 92, 88, 95, 89, 97];
  chartMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.navLinks = this.newsService.navLinks.map(l => ({
      ...l,
      active: l.name === 'RESEARCH'
    }));
  }
}
