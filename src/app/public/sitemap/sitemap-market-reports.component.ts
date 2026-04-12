import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

interface City {
  name: string;
  slug: string;
}

interface State {
  name: string;
  isOpen: boolean;
  slug: string;
  cities: City[];
}

@Component({
  selector: 'app-sitemap-market-reports',
  standalone: true,
  imports: [CommonModule, RouterModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './sitemap-market-reports.component.html',
  styleUrls: ['./sitemap-market-reports.component.css']
})
export class SitemapMarketReportsComponent {
  states: State[] = [
    {
      name: 'Alabama', slug: 'Alabama', isOpen: false,
      cities: [
        { name: 'Birmingham Market Trends', slug: 'Birmingham_AL' },
        { name: 'Huntsville Market Trends', slug: 'Huntsville_AL' }
      ]
    },
    {
      name: 'California', slug: 'California', isOpen: false,
      cities: [
        { name: 'Los Angeles Market Trends', slug: 'Los-Angeles_CA' },
        { name: 'San Diego Market Trends', slug: 'San-Diego_CA' }
      ]
    },
    {
        name: 'Illinois', slug: 'Illinois', isOpen: false,
        cities: [
          { name: 'Chicago Market Trends', slug: 'Chicago_IL' }
        ]
    },
    {
        name: 'New York', slug: 'New-York', isOpen: false,
        cities: [
          { name: 'New York City Market Trends', slug: 'New-York-City_NY' }
        ]
    }
  ];

  toggleState(state: State) {
    state.isOpen = !state.isOpen;
  }
}
