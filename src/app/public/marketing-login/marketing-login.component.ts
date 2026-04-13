import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

interface ProductCard {
  title: string;
  subtitle?: string;
  description: string;
  link?: string;
  type: string;
}

@Component({
  selector: 'app-marketing-login',
  standalone: true,
  imports: [CommonModule, RouterModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './marketing-login.component.html',
  styleUrls: ['./marketing-login.component.css']
})
export class MarketingLoginComponent {
  // View State
  activeTab: 'products' | 'success' = 'products';
  isLoginOpen = false;
  isNotifOpen = false;
  selectedProduct: any = null;

  // Testimonial Data
  spotlightStory = {
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'A powerful blend of systems, quality leads, and the right partner has helped this brokerage thrive',
    description: 'See how Better Homes and Gardens Real Estate\'s Paracle brokerage achieved scalable success by combining robust systems, high-quality leads, and a strategic partnership with Realtor.com.',
    sidebarTeasers: [
      {
        title: 'Learn how the leader of the #1 selling team in Michigan built his team\'s success with leads from Realtor.com PRO',
        excerpt: 'Any broker worth their salt knows how crucial it is to start their brokerage off on the right foot...'
      },
      {
        title: 'The #1 RE/MAX team in the world shares the secrets to their success',
        excerpt: 'Real estate agents know to get to the top of their game, it takes hard work...'
      },
      {
        title: 'See how this award-winning mega team used Listing Toolkit to level up and serve more sellers',
        excerpt: 'The housing market has felt like a rollercoaster ride over the last five years, to say the least...'
      }
    ]
  };

  insights = [
    { category: 'Lead Conversion, MVIP, Success, Testimonials', title: 'Systems, Strategy, and Realtor.com Leads', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { category: 'Connections Plus, Listing Toolkit, MVIP, Success, Testimonials', title: 'From Classroom to Closing', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { category: 'Connections Plus, Lead Conversion, MVIP, Success, Testimonials', title: 'Trust, Tenacity, and Realtor.com', image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { category: 'Brand, Success, Testimonials, Videos', title: 'Sellers may check your profile before inviting you for an appointment', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { category: 'Success, Testimonials, Videos', title: 'Your profile on Realtor.com may provide new customers', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { category: 'Success, Testimonials, Videos', title: 'How to win listings by demonstrating exposure', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
  ];

  constructor() {}
  
  openLogin(card: ProductCard) {
    this.selectedProduct = card;
    this.isLoginOpen = true;
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeLogin() {
    this.isLoginOpen = false;
    this.selectedProduct = null;
    document.body.style.overflow = 'auto';
  }

  toggleNotif() {
    this.isNotifOpen = !this.isNotifOpen;
  }

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
    }
  ];

  resourcesMenu = ['Blog', 'PRO Campaign Hub', 'Success Stories', '#ThrivePastFive'];

  productCards: ProductCard[] = [
    {
      title: 'Home Filla PRO Dashboard',
      description: 'Access your dashboard, along with detailed information and availability for Connections Plus, Listing Toolkit, and Local Expert.',
      type: 'agent'
    },
    {
      title: 'Home Filla PRO Dashboard',
      subtitle: 'For Builders',
      description: 'Manage all your buyer leads and access your listings.',
      type: 'builder'
    },
    {
      title: 'ReadyConnect Concierge',
      subtitle: 'For Brokers',
      description: 'Access your account, view agent performance, and client status.',
      type: 'broker'
    },
    {
      title: 'ReadyConnect Concierge',
      subtitle: 'For Agents',
      description: 'View your live connection leads, manage your day to day, and update your client status.',
      type: 'concierge-agent'
    },
    {
      title: 'ReadyConnect Mortgage',
      subtitle: '(Formerly ReadyConnect Live Buyer)',
      description: 'Manage your clients and your agent network all in one place.',
      type: 'mortgage'
    },
    {
      title: 'Avail',
      subtitle: 'For Landlords',
      description: 'Manage your rental properties and collect rent with ease.',
      type: 'landlord'
    },
    {
      title: 'ListHub',
      description: 'Get your listings in front of more people and communicate with your sellers.',
      type: 'listhub'
    },
    {
      title: 'UpNest',
      description: 'Get sellers, manage your pipeline, and keep up with clients.',
      type: 'upnest'
    }
  ];

  solutions = [
    {
      id: 'connections',
      title: 'Connections Plus',
      subtitle: 'Meet motivated buyers and nurture them to close.',
      description: 'Get active buyer leads searching for homes in your market, and the tools you need to convert them.',
      ctaText: 'Claim local leads'
    },
    {
      id: 'concierge',
      title: 'ReadyConnect Concierge',
      subtitle: 'Connect live to pre-screened leads with no upfront costs.',
      description: 'Receive live-transfered leads that convert up to 5x higher than the industry average and only pay a fee on closed transactions.',
      ctaText: 'Connect with buyers'
    }
  ];
}
