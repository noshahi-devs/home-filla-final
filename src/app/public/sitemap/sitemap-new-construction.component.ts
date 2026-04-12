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
  selector: 'app-sitemap-new-construction',
  standalone: true,
  imports: [CommonModule, RouterModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './sitemap-new-construction.component.html',
  styleUrls: ['./sitemap-for-sale.component.css']
})
export class SitemapNewConstructionComponent {
  
  states: State[] = [
    {
      name: 'Alabama', slug: 'Alabama', isOpen: false,
      cities: [
        { name: 'Birmingham', slug: 'Birmingham_AL' },
        { name: 'Huntsville', slug: 'Huntsville_AL' },
        { name: 'Orange Beach', slug: 'Orange-Beach_AL' },
        { name: 'Auburn', slug: 'Auburn_AL' },
        { name: 'Cullman', slug: 'Cullman_AL' },
        { name: 'Dothan', slug: 'Dothan_AL' },
        { name: 'Fairhope', slug: 'Fairhope_AL' },
        { name: 'Florence', slug: 'Florence_AL' }
      ]
    },
    {
      name: 'Alaska', slug: 'Alaska', isOpen: false,
      cities: [
        { name: 'Anchorage', slug: 'Anchorage_AK' },
        { name: 'Fairbanks', slug: 'Fairbanks_AK' }
      ]
    },
    {
      name: 'Arizona', slug: 'Arizona', isOpen: false,
      cities: [
        { name: 'Phoenix', slug: 'Phoenix_AZ' },
        { name: 'Tucson', slug: 'Tucson_AZ' },
        { name: 'Flagstaff', slug: 'Flagstaff_AZ' },
        { name: 'Prescott', slug: 'Prescott_AZ' },
        { name: 'Mesa', slug: 'Mesa_AZ' },
        { name: 'Scottsdale', slug: 'Scottsdale_AZ' },
        { name: 'Bullhead City', slug: 'Bullhead-City_AZ' },
        { name: 'Chandler', slug: 'Chandler_AZ' },
        { name: 'Gilbert', slug: 'Gilbert_AZ' },
        { name: 'Green Valley', slug: 'Green-Valley_AZ' }
      ]
    },
    {
      name: 'Arkansas', slug: 'Arkansas', isOpen: false,
      cities: [
        { name: 'Little Rock', slug: 'Little-Rock_AR' },
        { name: 'Fort Smith', slug: 'Fort-Smith_AR' },
        { name: 'Bella Vista', slug: 'Bella-Vista_AR' },
        { name: 'Bentonville', slug: 'Bentonville_AR' },
        { name: 'Conway', slug: 'Conway_AR' },
        { name: 'Fayetteville', slug: 'Fayetteville_AR' },
        { name: 'Harrison', slug: 'Harrison_AR' },
        { name: 'Hot Springs Village', slug: 'Hot-Springs-Village_AR' }
      ]
    },
    {
      name: 'California', slug: 'California', isOpen: false,
      cities: [
        { name: 'Los Angeles', slug: 'Los-Angeles_CA' },
        { name: 'San Diego', slug: 'San-Diego_CA' },
        { name: 'Bakersfield', slug: 'Bakersfield_CA' },
        { name: 'Beverly Hills', slug: 'Beverly-Hills_CA' },
        { name: 'Chico', slug: 'Chico_CA' },
        { name: 'Fresno', slug: 'Fresno_CA' },
        { name: 'Palm Springs', slug: 'Palm-Springs_CA' },
        { name: 'Sacramento', slug: 'Sacramento_CA' },
        { name: 'San Francisco', slug: 'San-Francisco_CA' },
        { name: 'Visalia', slug: 'Visalia_CA' }
      ]
    },
    {
      name: 'Colorado', slug: 'Colorado', isOpen: false,
      cities: [
        { name: 'Denver', slug: 'Denver_CO' },
        { name: 'Colorado Springs', slug: 'Colorado-Springs_CO' },
        { name: 'Grand Junction', slug: 'Grand-Junction_CO' },
        { name: 'Aurora', slug: 'Aurora_CO' },
        { name: 'Boulder', slug: 'Boulder_CO' },
        { name: 'Durango', slug: 'Durango_CO' },
        { name: 'Estes Park', slug: 'Estes-Park_CO' }
      ]
    },
    {
      name: 'Connecticut', slug: 'Connecticut', isOpen: false,
      cities: [
        { name: 'Bridgeport', slug: 'Bridgeport_CT' },
        { name: 'New Haven', slug: 'New-Haven_CT' },
        { name: 'Avon', slug: 'Avon_CT' },
        { name: 'Danbury', slug: 'Danbury_CT' },
        { name: 'Fairfield', slug: 'Fairfield_CT' },
        { name: 'Greenwich', slug: 'Greenwich_CT' },
        { name: 'Hartford', slug: 'Hartford_CT' }
      ]
    },
    {
      name: 'Delaware', slug: 'Delaware', isOpen: false,
      cities: [
        { name: 'Wilmington', slug: 'Wilmington_DE' },
        { name: 'Dover', slug: 'Dover_DE' }
      ]
    },
    {
      name: 'District of Columbia', slug: 'District-of-Columbia', isOpen: false,
      cities: [
        { name: 'Washington', slug: 'Washington_DC' }
      ]
    }
  ];

  toggleState(state: State) {
    state.isOpen = !state.isOpen;
  }
}
