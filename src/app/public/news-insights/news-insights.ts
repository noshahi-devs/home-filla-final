import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-news-insights',
  standalone: true,
  imports: [CommonModule, RouterModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './news-insights.html',
  styleUrls: ['./news-insights.css']
})
export class NewsInsightsComponent implements OnInit {
  /* Featured Content */
  featuredArticle = {
    title: "A Great Lakes Hidden Gem Steals the Luxury Spotlight",
    excerpt: "A surprising city made the Realtor.com March 2024 Pure Luxury List. It's Petoskey, MI, on the shores of Lake Michigan.",
    category: "TRENDS",
    author: "JULIE TAYLOR",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
  };

  /* Left Column Feed */
  latestNewsList = [
    { category: 'TRENDS', title: "Inside a Resort-Style Short-Term Rental Community but There's a Catch", author: 'JULIE TAYLOR' },
    { category: 'UNIQUE HOMES', title: 'Gilded Age Manse With Ties to Financier J.P. Morgan Lists for $4.9 Million', author: 'LARISSA RUNKLE' },
    { category: 'TRENDS', title: 'An AI Data Center Is Coming for Her Backyard—and Family Cemetery', author: 'ERIC GOLDSCHEIN' },
    { category: 'UNIQUE HOMES', title: 'Tiny Home That Spans Less Than 1,000 Square Feet Lists for a Huge Price', author: 'KELLIE SPEED' },
    { category: 'REAL ESTATE NEWS', title: 'Dated 1940s Cottages Are Transformed Into $4 Million "Micro-Compound"', author: 'KELLIE SPEED' },
    { category: 'FIRST PERSON', title: "'I Lost Money Every Month Renting Out My House'", author: 'BROOKE MORTON' }
  ];

  newsQuote = {
    text: "Location in these markets is very much intentional, and demand doesn't necessarily depend on proximity to a large economic hub.",
    author: "Anthony Smith",
    title: "Senior Economist"
  };

  /* Right Column / Research Extended */
  researchExpert = {
    name: "Danielle Hale",
    title: "Home Filla Chief Economist",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  };

  marketUpdate = {
    title: "Weekly Housing Market Update",
    imageUrl: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  };

  moreResearch: any[] = [];

  sponsoredContent = [
    { title: 'If You Had an Extra 100 Square Feet of Pure Joy, What Would It Be?', imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Upgrade Your Outdoor Living Space: 10 Trends for 2024', imageUrl: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
  ];

  /* Editor's Picks */
  editorsPicks = [
    { category: 'BUY', title: "The Secret Street That Disney Owns in Suburban California", author: 'ERIC GOLDSCHEIN', imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { category: 'TRENDS', title: 'Chicago Renters Try To Buy Their Building in Test of New Tenants Rights Law', author: 'ALLAIRE CONTE', imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  ];

  /* Columnists */
  columnists = [
    { name: 'House of the Week', title: 'A Solar-Powered Sanctuary in the Desert', imageUrl: 'https://images.unsplash.com/photo-1513584684031-43d1bcaf853c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'The Appraisal', title: 'Is That Pool Really Adding Value to Your Home?', imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Design Lab', title: 'The 2024 Color represent Peace and Calm', imageUrl: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
  ];

  navLinks = [
    { name: 'LATEST', route: '/news', active: true },
    { 
      name: 'NEWS', 
      active: false, 
      hasDropdown: true,
      items: [
        { name: 'Real Estate News', route: '#' },
        { name: 'Housing Trends', route: '#' },
        { name: 'Celebrity Real Estate', route: '#' },
        { name: 'Unique Homes', route: '#' },
        { name: 'Reality TV', route: '#' },
        { name: 'Sports', route: '#' },
        { name: 'Most Expensive Homes', route: '#' },
        { name: 'Most Popular Homes', route: '#' }
      ]
    },
    { name: 'BUYING', route: '#', active: false },
    { name: 'SELLING', route: '#', active: false },
    { name: 'RENTING', route: '#', active: false },
    // { name: 'CELEBRITY HOMES', route: '#', active: false },
    { 
      name: 'ADVICE', 
      active: false, 
      hasDropdown: true,
      items: [
        { name: 'Buying Advice', route: '#' },
        { name: 'Selling Advice', route: '#' },
        { name: 'Renting Advice', route: '#' },
        { name: 'Financing', route: '#' },
        { name: 'Living', route: '#' },
        { name: 'Moving', route: '#' },
        { name: 'Home Improvement', route: '#' }
      ]
    },
    { name: 'GUIDES', route: '#', active: false },
    { name: 'LIVING', route: '#', active: false },
    { name: 'RESEARCH', route: '#', active: false }
  ];

  get todayDate(): string {
    return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }

  constructor() { }

  ngOnInit(): void {
  }

  setActiveLink(link: any): void {
    this.navLinks.forEach(l => l.active = false);
    link.active = true;
  }
}
