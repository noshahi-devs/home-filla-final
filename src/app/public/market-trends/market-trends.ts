import { Component, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-market-trends',
  standalone: true,
  imports: [CommonModule, RouterLink, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './market-trends.html',
  styleUrls: ['./market-trends.css'],
})
export class MarketTrends implements AfterViewInit {
  // Active tabs for charts
  activeChartTab: 'prices' | 'properties' | 'dom' = 'prices';
  activeNeighborhoodTab: 'prices' | 'properties' | 'dom' = 'prices';
  activeZipTab: 'prices' | 'properties' | 'dom' = 'prices';
  activeSchoolTab: 'elementary' | 'middle' | 'high' | 'private' = 'elementary';
  activeFaqTab: 'buyers' | 'sellers' | 'renters' = 'buyers';

  // FAQ open states
  openBuyerFaq: number | null = null;
  openSellerFaq: number | null = null;
  openRenterFaq: number | null = null;
  openExtraFaq: number | null = null;

  // Sticky nav
  isSticky = false;

  @HostListener('window:scroll')
  onScroll() {
    this.isSticky = window.pageYOffset > 100;
  }

  // Set tab methods
  setChartTab(tab: 'prices' | 'properties' | 'dom') {
    this.activeChartTab = tab;
  }

  setNeighborhoodTab(tab: 'prices' | 'properties' | 'dom') {
    this.activeNeighborhoodTab = tab;
  }

  setZipTab(tab: 'prices' | 'properties' | 'dom') {
    this.activeZipTab = tab;
  }

  setSchoolTab(tab: 'elementary' | 'middle' | 'high' | 'private') {
    this.activeSchoolTab = tab;
  }

  setFaqTab(tab: 'buyers' | 'sellers' | 'renters') {
    this.activeFaqTab = tab;
  }

  // Toggle FAQ
  toggleFaq(type: 'buyer' | 'seller' | 'renter', index: number) {
    if (type === 'buyer') {
      this.openBuyerFaq = this.openBuyerFaq === index ? null : index;
    } else if (type === 'seller') {
      this.openSellerFaq = this.openSellerFaq === index ? null : index;
    } else {
      this.openRenterFaq = this.openRenterFaq === index ? null : index;
    }
  }

  toggleExtraFaq(index: number) {
    this.openExtraFaq = this.openExtraFaq === index ? null : index;
  }

  // Neighborhood price data
  neighborhoodPriceData = [
    { name: 'Sunnyvale West', price: '$2,043,475', percent: 100 },
    { name: 'Lakewood', price: '$1,468,000', percent: 72 },
    { name: 'East Sunnyvale', price: '$1,490,000', percent: 73 },
    { name: 'Morse Park', price: '$1,428,000', percent: 70 },
    { name: 'Ponderosa', price: '$1,398,950', percent: 68 },
    { name: 'East Murphy', price: '$1,398,500', percent: 68 },
    { name: 'West Murphy', price: '$1,349,800', percent: 66 },
  ];

  // Neighborhood property data
  neighborhoodPropertyData = [
    { name: 'East Sunnyvale', forSale: 223, price: '$1,490,000' },
    { name: 'Lakewood', forSale: 77, price: '$1,468,000' },
    { name: 'Ponderosa', forSale: 58, price: '$1,398,950' },
    { name: 'Sunnyvale West', forSale: 51, price: '$2,043,475' },
    { name: 'Morse Park', forSale: 36, price: '$1,428,000' },
    { name: 'East Murphy', forSale: 32, price: '$1,398,500' },
    { name: 'West Murphy', forSale: 29, price: '$1,349,800' },
  ];

  // Neighborhood DOM data
  neighborhoodDomData = [
    { name: 'East Sunnyvale', dom: 17, price: '$1,490,000' },
    { name: 'Ortega', dom: 17, price: '$1,650,000' },
    { name: 'Ponderosa', dom: 17, price: '$1,398,950' },
    { name: 'SNAIL', dom: 17, price: '$1,725,000' },
    { name: 'Serra', dom: 17, price: '$1,550,000' },
    { name: 'Sunnyvale West', dom: 17, price: '$2,043,475' },
    { name: 'West Murphy', dom: 17, price: '$1,349,800' },
  ];

  // ZIP price data
  zipPriceData = [
    { zip: '94086', price: '$1,749,000', forSale: 68 },
    { zip: '94087', price: '$1,698,000', forSale: 82 },
    { zip: '94085', price: '$1,475,000', forSale: 45 },
    { zip: '94089', price: '$1,198,000', forSale: 32 },
  ];

  // ZIP property data
  zipPropertyData = [
    { zip: '94086', count: 68 },
    { zip: '94087', count: 82 },
    { zip: '94085', count: 45 },
    { zip: '94089', count: 32 },
  ];

  // ZIP DOM data
  zipDomData = [
    { zip: '94086', dom: 15, price: '$1,749,000' },
    { zip: '94087', dom: 18, price: '$1,698,000' },
    { zip: '94085', dom: 16, price: '$1,475,000' },
    { zip: '94089', dom: 22, price: '$1,198,000' },
  ];

  // Schools data
  elementarySchools = [
    { name: 'Cumberland Elementary School', rating: 9, location: 'Cupertino', ratio: '22:1', students: '480', type: 'Public' },
    { name: 'Cherry Chase Elementary School', rating: 8, location: 'Sunnyvale', ratio: '24:1', students: '520', type: 'Public' },
    { name: 'Louis E. Stocklmeir Elementary', rating: 9, location: 'Sunnyvale', ratio: '23:1', students: '610', type: 'Public' },
    { name: 'Bishop Elementary School', rating: 7, location: 'Sunnyvale', ratio: '25:1', students: '380', type: 'Public' },
  ];

  middleSchools = [
    { name: 'Sunnyvale Middle School', rating: 7, location: 'Sunnyvale', ratio: '26:1', students: '890', type: 'Public' },
    { name: 'Cupertino Middle School', rating: 9, location: 'Sunnyvale', ratio: '24:1', students: '1,050', type: 'Public' },
    { name: 'Kennedy Middle School', rating: 8, location: 'Cupertino', ratio: '25:1', students: '920', type: 'Public' },
  ];

  highSchools = [
    { name: 'Homestead High School', rating: 9, location: 'Cupertino', ratio: '27:1', students: '2,400', type: 'Public' },
    { name: 'Fremont High School', rating: 7, location: 'Sunnyvale', ratio: '26:1', students: '1,850', type: 'Public' },
    { name: 'Monta Vista High School', rating: 10, location: 'Cupertino', ratio: '28:1', students: '2,200', type: 'Public' },
  ];

  privateSchools = [
    { name: 'Kings Academy', rating: 9, location: 'Sunnyvale', grades: 'PK-12', students: '950', type: 'Private' },
    { name: 'The Harker School', rating: 10, location: 'San Jose', grades: 'K-12', students: '2,000', type: 'Private' },
    { name: 'Saint Francis High School', rating: 9, location: 'Mountain View', grades: '9-12', students: '1,700', type: 'Private' },
  ];

  // FAQ data
  buyerFaqs = [
    { question: 'How is the Sunnyvale housing market doing?', answer: 'Sunnyvale remains a competitive market with high demand. The median home price is $1.5M, showing relative stability. Inventory has increased 8% year-over-year, giving buyers more options.' },
    { question: 'What types of homes are for sale in Sunnyvale?', answer: 'Sunnyvale offers diverse housing options including single-family homes, townhouses, condos, and newer construction homes. The market features everything from mid-century ranch homes to modern luxury builds.' },
    { question: 'What is the median home price in Sunnyvale?', answer: 'The current median listing price in Sunnyvale is $1,499,000, with a median price per square foot of $942. Prices vary significantly by neighborhood, with Sunnyvale West commanding premium prices.' },
  ];

  sellerFaqs = [
    { question: 'When is the best time to sell my home in Sunnyvale?', answer: 'Spring and early summer (March-May) typically see the highest buyer activity. However, Sunnyvale\'s strong tech economy means there\'s year-round demand, and homes sold in winter months often face less competition.' },
    { question: 'How long does it typically take to sell a home in Sunnyvale?', answer: 'The median days on market in Sunnyvale is currently 17 days. Well-priced, well-presented homes in desirable neighborhoods often sell within the first week, sometimes receiving multiple offers.' },
    { question: 'What improvements should I make before selling?', answer: 'Focus on kitchen and bathroom updates, fresh paint, landscaping, and staging. Tech workers value modern finishes, energy efficiency, and smart home features.' },
  ];

  renterFaqs = [
    { question: 'How is the Sunnyvale rental market doing?', answer: 'The rental market remains stable with a median rent of $3,500. Year-over-year rent has increased 1.6%, indicating modest growth. With 163 rental listings, there is moderate inventory.' },
    { question: 'What is the average rent in Sunnyvale?', answer: 'The median rent in Sunnyvale is $3,500 per month. Prices vary by neighborhood and property type, with apartments in Sunnyvale West and Lakewood typically commanding premium rents.' },
    { question: 'Where can I find rentals in Sunnyvale?', answer: 'Popular platforms include Zillow, Apartments.com, and local property management companies. The downtown area, near major tech campuses, and along transit corridors offer the most rental options.' },
  ];

  // Nearby cities
  nearbyCities = [
    'Cupertino', 'Mountain View', 'Palo Alto', 'San Jose', 'Santa Clara', 'Los Altos', 'Los Gatos', 'Campbell'
  ];

  // Research ZIPs
  researchZips = [
    '94086', '94087', '94085', '94089', '95014', '94043', '94041', '94040'
  ];

  // Buyer metrics
  buyerNeighborhoodMetrics = [
    { name: 'Sunnyvale West', price: '$2,043,475', forSale: 51 },
    { name: 'East Sunnyvale', price: '$1,490,000', forSale: 223 },
    { name: 'Lakewood', price: '$1,468,000', forSale: 77 },
  ];

  buyerZipMetrics = [
    { zip: '94087', price: '$1,698,000', forSale: 82 },
    { zip: '94086', price: '$1,749,000', forSale: 68 },
    { zip: '94085', price: '$1,475,000', forSale: 45 },
  ];

  // Seller metrics
  sellerNeighborhoodMetrics = [
    { name: 'Sunnyvale West', price: '$2,043,475', dom: 17 },
    { name: 'East Sunnyvale', price: '$1,490,000', dom: 17 },
    { name: 'Lakewood', price: '$1,468,000', dom: 17 },
  ];

  sellerZipMetrics = [
    { zip: '94087', price: '$1,698,000', dom: 18 },
    { zip: '94086', price: '$1,749,000', dom: 15 },
    { zip: '94085', price: '$1,475,000', dom: 16 },
  ];

  // Renter metrics
  renterNeighborhoodMetrics = [
    { name: 'Sunnyvale West', rent: '$3,187/mo', count: 53 },
    { name: 'East Sunnyvale', rent: '$3,902/mo', count: 108 },
    { name: 'Lakewood', rent: '$3,997/mo', count: 13 },
  ];

  renterZipMetrics = [
    { zip: '94087', rent: '$3,500/mo', count: 82 },
    { zip: '94086', rent: '$3,200/mo', count: 45 },
    { zip: '94085', rent: '$2,800/mo', count: 18 },
  ];

  // Rental listings
  featuredRentals = [
    { price: '$3,500/mo', beds: 3, baths: 2, sqft: '1,400', address: '1234 Sunnyvale Ave', city: 'Sunnyvale, CA 94086' },
  ];

  rentals = [
    { title: 'Modern condo in downtown Sunnyvale', price: '$3,200/mo', beds: 2, baths: 2, sqft: '1,100', address: '567 Main St', city: 'Sunnyvale, CA 94086' },
    { title: 'Spacious townhouse near tech campus', price: '$3,800/mo', beds: 3, baths: 2.5, sqft: '1,600', address: '890 Innovation Dr', city: 'Sunnyvale, CA 94085' },
    { title: 'Updated single family home', price: '$4,200/mo', beds: 4, baths: 2, sqft: '1,800', address: '234 Westwood Ln', city: 'Sunnyvale, CA 94087' },
  ];

  // Extra renter FAQs
  renterExtraFaqs = [
    { question: 'How much can I afford to pay for an apartment in Sunnyvale, CA?', answer: 'A general rule is to spend no more than 30% of gross monthly income on rent. In Sunnyvale, with median rent around $3,500, a household income of approximately $140,000+ is recommended. Consider your debt obligations, lifestyle, and savings goals when budgeting.' },
    { question: 'How many rentals are available in Sunnyvale, CA?', answer: 'Currently there are 163 rental properties available in Sunnyvale. This includes apartments, houses, townhomes, and condos. Inventory fluctuates seasonally, with more options typically available in summer months.' },
    { question: 'How do I find an apartment in Sunnyvale, CA?', answer: 'Start by browsing online platforms, filtering by your budget, desired bedrooms, and preferred amenities. Schedule tours promptly as quality rentals move quickly. Prepare application documents (pay stubs, references, credit report) in advance.' },
  ];

  // Quick links
  quickLinks = [
    'Homes for sale', 'New construction', 'Recently sold', 'Open houses', 'Pre-foreclosures',
    'Condos', 'Townhomes', 'Land', 'Luxury', 'Apartments'
  ];

  // Neighborhood rent data
  neighborhoodRentData = [
    { name: 'East Sunnyvale', rent: '$3,902/mo' },
    { name: 'Lakewood', rent: '$3,997/mo' },
    { name: 'Sunnyvale West', rent: '$3,187/mo' },
    { name: 'Ponderosa', rent: '$3,438/mo' },
    { name: 'West Murphy', rent: '$3,272/mo' },
  ];

  // Home types for pre-approval
  homeTypes = [
    { icon: '🏠', label: 'Single Family' },
    { icon: '🏢', label: 'Condo/Townhome' },
    { icon: '🏘️', label: 'Multi-Family' },
    { icon: '🏡', label: 'Manufactured' },
    { icon: '🏞️', label: 'Vacant Land' },
  ];

  ngAfterViewInit(): void {
    // Scroll animations can be added here
  }
}
