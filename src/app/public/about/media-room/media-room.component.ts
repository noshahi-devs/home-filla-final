import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SiteHeaderComponent } from '../../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-media-room',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    SiteHeaderComponent, 
    SiteFooterComponent
  ],
  templateUrl: './media-room.component.html',
  styleUrls: ['./media-room.component.css']
})
export class MediaRoomComponent {
  pressReleases = [
    {
      date: 'April 14, 2026',
      title: 'Home Filla Survey Finds Sellers Are Optimistic Heading Into the 2026 Spring Market',
      category: 'Research'
    },
    {
      date: 'April 9, 2026',
      title: 'Most Large U.S. Housing Markets Are Shifting in Buyers\' Favor, But the Story Varies Widely by Metro',
      category: 'Market Trends'
    },
    {
      date: 'April 8, 2026',
      title: 'Where Luxury Listings Rule: Home Filla Identifies 13 Markets Where Seven-Figure Homes are the Norm',
      category: 'Research'
    },
    {
      date: 'April 1, 2026',
      title: 'Tensions Cloud a Spring Market That Was Just Finding Its Footing, According to Home Filla March Housing Report',
      category: 'Reports'
    }
  ];

  inTheNews = [
    {
      date: 'Jan 5, 2026',
      source: 'Scripps News',
      title: 'It now takes 7 years for the average household to save for a down payment',
      link: '#'
    },
    {
      date: 'Dec 29, 2025',
      source: 'HousingWire',
      title: 'Home Filla urges action on US housing supply shortage',
      link: '#'
    },
    {
      date: 'Dec 29, 2025',
      source: 'CNBC',
      title: 'Your past-due student loans can make it harder to rent an apartment. These 5 tips can help',
      link: '#'
    },
    {
      date: 'Dec 26, 2025',
      source: 'Fox Business',
      title: 'Top 10 desirable metros where homes cost less than $300K',
      link: '#'
    }
  ];

  constructor() { }
}
