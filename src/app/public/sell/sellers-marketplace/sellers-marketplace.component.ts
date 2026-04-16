import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SiteHeaderComponent } from '../../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../../shared/components/site-footer/site-footer.component';

interface SellingOption {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  linkText?: string;
  linkUrl?: string;
  disclaimer?: string;
}

@Component({
  selector: 'app-sellers-marketplace',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './sellers-marketplace.component.html',
  styleUrls: ['./sellers-marketplace.component.css']
})
export class SellersMarketplaceComponent {
  addressQuery = '';
  openAccordionId: string | null = 'opt-1'; // Default first open

  options: SellingOption[] = [
    {
      id: 'opt-1',
      title: 'List with an agent',
      description: '',
      benefits: [
        'Help maximize your sale profit by selling on the open market.',
        'Our agent matching service uses a unique algorithm to match you with the right agent for you.',
        'Local expertise, your agent will explore all potential selling options to build a custom marketing and pricing plan based on current local market conditions.'
      ],
      linkText: 'Compare agents',
      linkUrl: '/find-agent'
    },
    {
      id: 'opt-2',
      title: 'Sell with ease',
      description: 'Our partners provide competitive cash offers so you can skip the listing process and manage your sale entirely online. Choose your close date to avoid double-moves and floating two mortgages.',
      benefits: [
        'Sell confidently with an instant cash offer.',
        'Sell on your schedule with the ability to choose your close date.',
        'Skip the home showings and prep work.'
      ]
    },
    {
      id: 'opt-3',
      title: 'Buy now, sell later',
      description: 'Get the certainty of buying your new home first, then sell your old one.',
      benefits: [
        'Help win the new home you want with a competitive offer that is not contingent on the sale of your current home—before your current home is even listed.',
        'Live conveniently in your new home while prepping your old one for sale, and skip living through repairs and showings.',
        'Unlock your home’s value while continuing to live in your home as a renter with the option to buy it back, or move to a new home.*'
      ],
      disclaimer: '* Buy-back option is subject to availability.'
    },
    {
      id: 'opt-4',
      title: 'Sell in any condition',
      description: 'Sell your home as it stands, regardless of its condition or financial status. This option can allow you to sell within days even if your property is damaged, facing foreclosure, or in need of significant updates.',
      benefits: [
        'Fast cash to put towards your home purchase or pay off debt.',
        'Sell your home as is, even if there\'s lots of work needed.',
        'Offload the burden of extensive repairs or renovations.'
      ]
    }
  ];

  toggleAccordion(id: string) {
    this.openAccordionId = this.openAccordionId === id ? null : id;
  }
}
