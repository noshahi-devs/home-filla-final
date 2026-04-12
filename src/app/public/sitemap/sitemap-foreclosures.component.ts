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
  selector: 'app-sitemap-foreclosures',
  standalone: true,
  imports: [CommonModule, RouterModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './sitemap-foreclosures.component.html',
  styleUrls: ['./sitemap-foreclosures.component.css']
})
export class SitemapForeclosuresComponent {
  states: State[] = [
    {
      name: 'Alabama', slug: 'Alabama', isOpen: false,
      cities: [
        { name: 'Birmingham', slug: 'Birmingham_AL' },
        { name: 'Montgomery', slug: 'Montgomery_AL' },
        { name: 'Mobile', slug: 'Mobile_AL' }
      ]
    },
    {
      name: 'California', slug: 'California', isOpen: false,
      cities: [
        { name: 'Los Angeles', slug: 'Los-Angeles_CA' },
        { name: 'San Francisco', slug: 'San-Francisco_CA' },
        { name: 'Sacramento', slug: 'Sacramento_CA' }
      ]
    },
    {
        name: 'Florida', slug: 'Florida', isOpen: false,
        cities: [
          { name: 'Miami', slug: 'Miami_FL' },
          { name: 'Orlando', slug: 'Orlando_FL' },
          { name: 'Tampa', slug: 'Tampa_FL' }
        ]
    },
    {
        name: 'Texas', slug: 'Texas', isOpen: false,
        cities: [
          { name: 'Houston', slug: 'Houston_TX' },
          { name: 'Dallas', slug: 'Dallas_TX' },
          { name: 'Austin', slug: 'Austin_TX' }
        ]
    }
  ];

  toggleState(state: State) {
    state.isOpen = !state.isOpen;
  }
}
