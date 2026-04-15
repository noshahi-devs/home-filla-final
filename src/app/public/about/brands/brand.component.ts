import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SiteHeaderComponent } from '../../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../../shared/components/site-footer/site-footer.component';

interface Brand {
  id: string;
  name: string;
  tagline?: string;
  logo: string;
  description: string;
  fullContent?: string;
  category: 'consumer' | 'professional';
}

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css',
  standalone: true,
  imports: [CommonModule, RouterLink, SiteHeaderComponent, SiteFooterComponent],
  encapsulation: ViewEncapsulation.None
})
export class BrandComponent implements OnInit {
  isModalOpen = false;
  selectedBrand: Brand | null = null;

  consumerBrands: Brand[] = [
    {
      id: 'realtor',
      name: 'realtor.com®',
      tagline: 'To each their home.™',
      logo: 'https://static.rdc.moveaws.com/rdc-ui/logos/logo-brand.svg',
      description: 'Home Filla® is the trusted resource for all things home with the most comprehensive for-sale listings than any other site. With insightful information, valuable tools, and professional expertise...',
      fullContent: 'Home Filla® is the trusted resource for all things home with the most comprehensive for-sale listings than any other site. With insightful information, valuable tools, and professional expertise, Home Filla® makes finding and living in your home easier and more enjoyable than ever.',
      category: 'consumer'
    },
    {
      id: 'moving',
      name: 'moving.com',
      tagline: 'part of the Home Filla® network',
      logo: 'https://static.rdc.moveaws.com/rdc-ui/logos/logo-brand.svg', // Placeholder logo for moving.com
      description: 'Moving.com provides consumers an easy search service to contact movers one by one, until they find help for their next move. Moving.com allows consumers to compare quotes from hundred...',
      fullContent: 'Moving.com provides consumers an easy search service to contact movers one by one, until they find help for their next move. Moving.com allows consumers to compare quotes from hundreds of moving companies and provides helpful tips and tools for every step of the move.',
      category: 'consumer'
    },
    {
      id: 'avail',
      name: 'Avail',
      tagline: 'by Home Filla®',
      logo: 'https://static.rdc.moveaws.com/rdc-ui/pictos/avail-logo.svg', // Placeholder or actual if available
      description: 'Avail is a platform that gives DIY landlords and tenants the rental experience they deserve by providing online tools, support, and educational content. With Avail, landlords and tenants can easily...',
      fullContent: 'Avail is a platform that gives DIY landlords and tenants the rental experience they deserve by providing online tools, support, and educational content. With Avail, landlords and tenants can easily navigate all aspects of the rental process — everything from listings, rental applications, leases, monthly rent payments, and maintenance tickets. Single family homes, condo units, and small multi-unit buildings all across the country are managed using Avail.',
      category: 'consumer'
    },
    {
      id: 'upnest',
      name: 'UpNest',
      tagline: 'by Home Filla®',
      logo: 'https://static.rdc.moveaws.com/rdc-ui/pictos/upnest-logo.svg', // Placeholder or actual
      description: 'UpNest.com allows consumers to compare top real estate agents in their area, giving them powerful tools to make the right decision for their needs. UpNest gives consumers transparency into their...',
      fullContent: 'UpNest.com allows consumers to compare top real estate agents in their area, giving them powerful tools to make the right decision for their needs. UpNest gives consumers transparency into their choices, ensuring they work with the best agent for their unique situation.',
      category: 'consumer'
    }
  ];

  professionalBrands: Brand[] = [
    {
      id: 'pro',
      name: 'realtor.com®',
      tagline: 'for professionals',
      logo: 'https://static.rdc.moveaws.com/rdc-ui/logos/logo-brand.svg', // Professional logo variant if available
      description: 'Lead generation, brand building and other solutions to help agents, teams and brokers leverage the strength of the Home Filla® consumer brand.',
      fullContent: 'Lead generation, brand building and other solutions to help agents, teams and brokers leverage the strength of the Home Filla® consumer brand. Our tools empower real estate professionals to grow their business and serve their clients with data-driven insights.',
      category: 'professional'
    },
    {
      id: 'listhub',
      name: 'ListHub',
      logo: 'https://static.rdc.moveaws.com/rdc-ui/pictos/listhub-logo.svg', // Placeholder
      description: 'ListHub provides a controlled platform to enable brokers to deliver accurate, MLS-sourced listings to consumers. MLSs are in the business of managing broker listing data. ListHub is an important...',
      fullContent: 'ListHub provides a controlled platform to enable brokers to deliver accurate, MLS-sourced listings to consumers. MLSs are in the business of managing broker listing data. ListHub is an important tool that ensures listings are distributed widely while maintaining data integrity.',
      category: 'professional'
    }
  ];

  ngOnInit() {}

  openModal(brand: Brand) {
    this.selectedBrand = brand;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedBrand = null;
    document.body.style.overflow = 'auto';
  }
}
