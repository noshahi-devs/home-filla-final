import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-market-trends',
  standalone: true,
  imports: [CommonModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './market-trends.html',
  styleUrl: './market-trends.css',
})
export class MarketTrends implements AfterViewInit {
  activeTab: 'Prices' | 'Properties' | 'Days on Market' = 'Prices';

  // Navigation Items
  navItems = ['OVERVIEW', 'NEIGHBORHOODS', 'ZIPS', 'SCHOOLS', 'BUYERS', 'SELLERS', 'RENTERS'];
  activeNav = 'OVERVIEW';

  summaryData = [
    { metric: 'Median listing $', citywide: '$1,499,000', change1Y: '-6.25%', change3Y: '-16.68%' },
    { metric: '$ per sq ft', citywide: '$942/sq ft', change1Y: '-6.45%', change3Y: '-16.27%' },
    { metric: 'Active listings', citywide: '277', change1Y: '8.02%', change3Y: '37.95%' },
    { metric: 'Median days on market', citywide: '17 days', change1Y: '6.25%', change3Y: '-26.09%' },
    { metric: 'Rental properties', citywide: '163', change1Y: '-3.95%', change3Y: '-45.11%' },
    { metric: 'Median rent', citywide: '$3,500/mo', change1Y: '1.60%', change3Y: '-8.62%' }
  ];

  pricesData = [
    { neighborhood: 'East Sunnyvale', listingPrice: '$1,490,000', pricePerSqFt: '$915', rentPrice: '$3,902 /mo' },
    { neighborhood: 'Lakewood', listingPrice: '$1,468,000', pricePerSqFt: '$892', rentPrice: '$3,997 /mo' },
    { neighborhood: 'Ponderosa', listingPrice: '$1,398,950', pricePerSqFt: '$888', rentPrice: '$3,438 /mo' },
    { neighborhood: 'Sunnyvale West', listingPrice: '$2,043,475', pricePerSqFt: '$1,202', rentPrice: '$3,187 /mo' },
    { neighborhood: 'Morse Park', listingPrice: '$1,428,000', pricePerSqFt: '$860', rentPrice: '–' },
    { neighborhood: 'East Murphy', listingPrice: '$1,398,500', pricePerSqFt: '$906', rentPrice: '$2,200 /mo' },
    { neighborhood: 'West Murphy', listingPrice: '$1,349,800', pricePerSqFt: '$828', rentPrice: '$3,272 /mo' },
  ];

  propertiesData = [
    { neighborhood: 'East Sunnyvale', forSale: 223, yoySale: '2.91%', forRent: 108, momRent: '-26.39%' },
    { neighborhood: 'Lakewood', forSale: 77, yoySale: '-8.96%', forRent: 13, momRent: '-72.73%' },
    { neighborhood: 'Ponderosa', forSale: 58, yoySale: '21.88%', forRent: 37, momRent: '-28.57%' },
    { neighborhood: 'Sunnyvale West', forSale: 51, yoySale: '16.67%', forRent: 53, momRent: '-13.04%' },
    { neighborhood: 'Morse Park', forSale: 36, yoySale: '0%', forRent: 5, momRent: '–' },
    { neighborhood: 'East Murphy', forSale: 32, yoySale: '41.18%', forRent: 17, momRent: '11.11%' },
    { neighborhood: 'West Murphy', forSale: 29, yoySale: '41.67%', forRent: 16, momRent: '-33.33%' },
  ];

  daysOnMarketData = [
    { neighborhood: 'East Sunnyvale', days: 17, mom: '0%', yoy: '6.25%' },
    { neighborhood: 'Ortega', days: 17, mom: '-56.41%', yoy: '112.50%' },
    { neighborhood: 'Ponderosa', days: 17, mom: '-5.56%', yoy: '6.25%' },
    { neighborhood: 'SNAIL', days: 17, mom: '0%', yoy: '-19.05%' },
    { neighborhood: 'Serra', days: 17, mom: '-37.04%', yoy: '70%' },
    { neighborhood: 'Sunnyvale West', days: 17, mom: '-5.56%', yoy: '6.25%' },
    { neighborhood: 'West Murphy', days: 17, mom: '0%', yoy: '0%' },
  ];

  ngAfterViewInit(): void {
    // initialization if needed
  }

  setTab(tab: 'Prices' | 'Properties' | 'Days on Market') {
    this.activeTab = tab;
  }
}
