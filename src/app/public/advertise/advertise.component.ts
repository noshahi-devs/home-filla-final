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
  productsMenu = [
    {
      label: 'Real Estate Lead Generation',
      links: ['Connections Plus', 'ReadyConnect Concierge', 'Market VIP']
    },
    {
      label: 'Real Estate Marketing',
      links: ['Market Reach', 'Local Expert', 'The Essentials Toolkit']
    },
    {
      label: 'Listing Solutions',
      links: ['Listing Toolkit', 'Listing Manager', 'Spotlight Listings']
    },
    {
      label: 'Lender Solutions',
      links: ['ClientSelect Mortgage Advertising']
    },
    {
      label: 'Specialty Solutions',
      links: ['Home Builder Solutions', 'Property Manager Solutions', 'Brand Advertiser Solutions', 'Online Store']
    }
  ];

  resourcesMenu = [
    'Blog',
    'PRO Campaign Hub',
    'Success Stories',
    '#ThrivePastFive',
    'Home Filla Pro App',
    'Referral Manager App',
    'State Resources'
  ];

  campaignTestimonials = [
    {
      quote: "We found that Home Filla has provided the most consistent and quality leads for the greatest ROI and predictable conversion rates. That predictability is how we operate our business.",
      author: 'Lucas Mudrey & Tony Hanson',
      company: 'Better Homes',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'
    },
    {
      quote: "We can spend more time with actual clients and use the technology to get to those leads, support those leads, and find information and intel.",
      author: 'Gary Ashton',
      company: 'CEO and Owner, The Ashton Real Estate Group',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
    }
  ];

  industrySolutions = [
    { title: 'Builders', icon: 'fa-tools' },
    { title: 'Property Managers', icon: 'fa-building' },
    { title: 'Brand Advertisers', icon: 'fa-ad' }
  ];

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

  activeTestimonial = 0;

  setTestimonial(index: number) {
    this.activeTestimonial = index;
  }
}
