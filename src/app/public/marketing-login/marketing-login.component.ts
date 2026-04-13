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
