import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-advertise',
  standalone: true,
  imports: [CommonModule, RouterModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.css']
})
export class AdvertiseComponent {
  solutions = [
    {
      icon: 'fa-map-marker',
      title: 'Premier Agent',
      description: 'Own your local market by becoming the exclusive featured agent in your targeted zip codes. Capture high-intent buyer leads instantly.'
    },
    {
      icon: 'fa-bullhorn',
      title: 'Promoted Listings',
      description: 'Give your sellers the ultimate advantage. Boost your listings to the top of home search results and drive 400% more tours.'
    },
    {
      icon: 'fa-building',
      title: 'Brokerage Solutions',
      description: 'Enterprise-grade lead routing, custom CRM integrations, and brand-level exposure designed for entire teams and brokerages.'
    }
  ];

  testimonials = [
    {
      quote: "Since upgrading to Premier Agent, my team closed an additional 24 transactions last year purely from Home Filla leads. The ROI is unmatched.",
      author: 'Marcus J., Principal Broker',
      location: 'Austin, TX'
    },
    {
      quote: "Promoting my listings guarantees visibility. Sellers are impressed by the traffic reports, and homes are selling 15 days faster on average.",
      author: 'Sarah L., Top Producer',
      location: 'Denver, CO'
    }
  ];
}
