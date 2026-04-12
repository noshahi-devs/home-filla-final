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
  
  activeTab = 'ARTICLES';
  
  // Header Tabs
  researchTabs = [
    { name: 'ARTICLES', active: true },
    { name: 'DATA VISUALIZATIONS', active: false },
    { name: 'DATA LIBRARY', active: false },
    { name: 'VIDEOS', active: false }
  ];

  selectTab(tabName: string) {
    this.activeTab = tabName;
    this.researchTabs.forEach(t => t.active = (t.name === tabName));
  }

  // Market Ticker
  tickerInfo = {
    location: 'Washington, DC 20001',
    stats: [
      { label: 'Days on Market', value: '42', change: '15% YoY', positive: true, up: true },
      { label: 'Active Listings', value: '209', change: '3% YoY', positive: false, up: false },
      { label: 'Median list prices', value: '$680K', change: '7% YoY', positive: false, up: false }
    ]
  };

  // Previous Hero Data
  economist = {
    name: 'Danielle Hale',
    title: 'Chief Economist, Home Filla',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    quote: 'The housing market continues to show resilience despite elevated borrowing costs. We expect gradual improvement in affordability as we move through 2026.'
  };

  // Left Column Feed
  feedCategorized = [
    {
      category: 'Featured Articles',
      title: 'Featured Article',
      articleTitle: 'Introducing the Home Filla Market Clock',
      date: 'Apr 09, 2026',
      excerpt: 'More data hasn\'t led to more clarity. The Home Filla Market Clock cuts through the noise...',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80'
    },
    {
      category: 'Monthly Housing Report',
      title: '',
      articleTitle: 'March 2026 Monthly Housing Report: Spring\'s Promise Meets Fresh Headwinds',
      date: 'Apr 01, 2026',
      excerpt: 'The spring housing market is more buyer-friendly than 2025 as inventory improves...',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80'
    },
    {
      category: 'Monthly Rental Report',
      title: '',
      articleTitle: 'February 2026 Rental Report: National Median Asking Rents Hit Four-Year Low',
      date: 'Mar 17, 2026',
      excerpt: 'February 2026 marks a four-year low for national median asking rent growth...',
      imageUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=400&q=80'
    },
    {
      category: 'Weekly Housing Trends',
      title: '',
      articleTitle: 'Weekly Housing Trends: U.S. Market Update (Week Ending April 4, 2026)',
      date: 'Apr 09, 2026',
      excerpt: 'Get the latest U.S. housing market trends, including inventory shifts...',
      imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=400&q=80'
    }
  ];

  // Middle Column
  weeklyUpdateVideo = {
    title: 'Weekly Housing Market Update',
    presenter: 'With Chief Economist Danielle Hale',
    date: 'Apr 10, 2026',
    description: 'The economics team weekly video update gives you the latest information you need to know.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
  };

  recentArticles = [
    {
      date: 'Apr 10, 2026',
      title: 'Gas Prices Spike Inflation to 3.3%—a Real Test for Consumers and Housing This Spring',
      excerpt: 'March CPI surged to 3.3% year over year, driven by the largest monthly gas price increase...'
    },
    {
      date: 'Apr 09, 2026',
      title: 'Mortgage Rates Drop to 6.37% on Iran War Ceasefire',
      excerpt: 'The Freddie Mac 30-year mortgage rate dropped 9 basis points to 6.37% this week...'
    }
  ];

  // Right Column
  nationalSummaryItems = [
    {
      period: 'February 2026',
      type: 'U.S. Median Rent',
      value: '$1,667 (-1.7% YoY)',
      icon: 'fa-building',
      isRed: true
    },
    {
      period: 'March 2026',
      type: 'U.S. Median Listing Price',
      value: '$415,450 (-2.2% YoY)',
      icon: 'fa-home',
      isRed: true
    },
    {
      period: 'March 2026',
      type: 'Active Listings',
      value: '964,477 (8.1% YoY)',
      icon: 'fa-search',
      isRed: false
    },
    {
      period: 'March 2026',
      type: 'New Listings',
      value: '439,000 (0.7% YoY)',
      icon: 'fa-plus-square-o',
      isRed: false
    },
    {
      period: 'March 2026',
      type: 'Median Days on Market',
      value: '57 (4 Days Longer YoY)',
      icon: 'fa-calendar',
      isRed: false
    }
  ];

  // Visualizations Block
  visualizations = [
    {
      title: 'Market Clock',
      description: 'See where your market stands and who it favors',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'National Market Trends',
      description: 'National market trends in multiple data visuals',
      imageUrl: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Cross-Market Demand',
      description: 'Latest insights into county- and metro-level trends',
      imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Local Market Trends',
      description: 'Explore market trends around the country',
      imageUrl: 'https://images.unsplash.com/photo-1581089781785-603411fa81e5?auto=format&fit=crop&w=800&q=80'
    }
  ];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.navLinks = this.newsService.navLinks.map(l => ({
      ...l,
      active: l.name === 'RESEARCH'
    }));
  }
}
