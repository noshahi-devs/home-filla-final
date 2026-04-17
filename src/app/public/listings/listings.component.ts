import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { getCategoryData, CategoryInfo, Property } from '../../data/listings.data';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';
import { combineLatest } from 'rxjs';

declare global {
  interface Window {
    initHomeFillaPage?: () => void;
    __homeFillaInit?: boolean;
    toggleFilter?: (event: Event, id: string) => void;
    applyFilter?: (btn: HTMLElement) => void;
  }
}

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css',
  standalone: true,
  imports: [CommonModule, RouterLink, SiteHeaderComponent, SiteFooterComponent]
})
export class ListingsComponent implements OnInit, AfterViewInit {
  category: CategoryInfo | null = null;
  visibleProperties: Property[] = [];
  allFilteredProperties: Property[] = [];
  pageSize = 12;
  locationFilter: string | null = null;
  stateSuffix: string | null = null;
  pageHeading = 'Homes for Sale';
  sortOrder = 'Newest';
  
  // Map and Favorite State
  isMapOpen = false;
  activeMapFilter = 'Layers';
  savedPropertyIds: Set<number> = new Set();
  
  // Modal State
  showContactModal = false;
  selectedContactProperty: Property | null = null;

  // Pagination & Discovery State
  currentPage = 1;
  totalPages = 1;
  totalPagesArray: number[] = [];
  activeSchoolTab = 'Elementary';
  activeDiscoverySection: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]).subscribe(([params, queryParams]) => {
      const slug = params.get('category') || 'homes-for-sale';
      this.locationFilter = queryParams.get('location');
      this.stateSuffix = queryParams.get('state');

      const categoryData = getCategoryData(slug);
      if (categoryData) {
        this.category = { ...categoryData };
        let props = [...this.category.properties];

        // 1. Dynamic Filtering logic
        if (this.locationFilter) {
           let query = this.locationFilter.toLowerCase();
           const actualFiltered = props.filter(p => p.city.toLowerCase().includes(query));
           if (actualFiltered.length > 0) {
               props = actualFiltered;
           } else {
               // Fallback: Mock location for demo purposes if no real match
               const fakeLocation = this.locationFilter + (this.stateSuffix ? ', ' + this.stateSuffix : '');
               props = props.map(p => ({...p, city: fakeLocation}));
           }
        }

        // 2. Dynamic Heading logic
        this.constructHeading();

        this.allFilteredProperties = props;
        this.sortProperties(this.sortOrder); // Initial sort
        this.visibleProperties = this.allFilteredProperties.slice(0, this.pageSize);
        this.totalPages = Math.ceil(this.allFilteredProperties.length / this.pageSize);
        this.updateTotalPagesArray();
        this.currentPage = 1;
        
        if (this.locationFilter) {
          this.category.count = props.length;
        }
      } else {
        this.category = null;
        this.visibleProperties = [];
        this.allFilteredProperties = [];
        this.totalPages = 0;
        this.totalPagesArray = [];
      }
    });
  }

  constructHeading() {
    const loc = this.locationFilter ? `${this.locationFilter}${this.stateSuffix ? ', ' + this.stateSuffix : ''}` : '';
    const catLabel = this.category?.label || 'Homes for Sale';

    if (loc) {
      if (this.category?.slug === 'buy' || this.category?.slug === 'homes-for-sale') {
        this.pageHeading = `${loc} homes for sale & real estate`;
      } else {
        this.pageHeading = `${catLabel} in ${loc}`;
      }
    } else {
      this.pageHeading = catLabel;
    }
  }

  ngAfterViewInit() {
    delete window.__homeFillaInit;
    setTimeout(() => {
      window.initHomeFillaPage?.();
    }, 0);
  }

  sortProperties(order: string) {
    this.sortOrder = order;
    
    // Helper to parse price/sqft
    const parseValue = (val: string) => {
        if (!val) return 0;
        return parseFloat(val.replace(/[$,\s]/g, '')) || 0;
    };

    switch (order) {
      case 'Price (High to Low)':
        this.allFilteredProperties.sort((a, b) => parseValue(b.price) - parseValue(a.price));
        break;
      case 'Price (Low to High)':
        this.allFilteredProperties.sort((a, b) => parseValue(a.price) - parseValue(b.price));
        break;
      case 'Square Feet':
        this.allFilteredProperties.sort((a, b) => parseValue(b.sqft) - parseValue(a.sqft));
        break;
      case 'Newest':
      default:
        // Mock "Newest" by keeping original order or id desc
        this.allFilteredProperties.sort((a, b) => b.id - a.id);
        break;
    }
    
    this.visibleProperties = this.allFilteredProperties.slice(0, this.visibleProperties.length || this.pageSize);
  }

  onSearch(query: string) {
    if (!query) return;
    
    // Parse city/state if comma exists
    let location = query;
    let state = '';
    if (query.includes(',')) {
      const parts = query.split(',');
      location = parts[0].trim();
      state = parts[1].trim();
    }

    this.router.navigate(['/listings', this.category?.slug || 'homes-for-sale'], {
      queryParams: { location, state }
    });
  }

  get hasMore(): boolean {
    return (this.allFilteredProperties.length || 0) > this.visibleProperties.length;
  }

  get remaining(): number {
    return (this.allFilteredProperties.length || 0) - this.visibleProperties.length;
  }

  loadMore() {
    const all = this.allFilteredProperties || [];
    const next = this.visibleProperties.length + this.pageSize;
    this.visibleProperties = all.slice(0, next);
  }

  formatCount(n: number): string {
    return n >= 1000 ? n.toLocaleString() : n.toString();
  }

  isLandCategory(): boolean {
    return this.category?.slug === 'land' || this.category?.slug === 'new-home-communities';
  }

  // Interactive Map Actions
  toggleMap(): void {
    this.isMapOpen = !this.isMapOpen;
  }

  setMapFilter(filter: string): void {
    this.activeMapFilter = filter;
  }

  // Property Favoriting
  toggleFavorite(id: number, event?: Event): void {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    if (this.savedPropertyIds.has(id)) {
      this.savedPropertyIds.delete(id);
    } else {
      this.savedPropertyIds.add(id);
    }
  }

  isSaved(id: number): boolean {
    return this.savedPropertyIds.has(id);
  }

  openContactModal(p: Property, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.selectedContactProperty = p;
    this.showContactModal = true;
  }

  closeContactModal() {
    this.showContactModal = false;
    this.selectedContactProperty = null;
  }

  // Pagination logic
  updateTotalPagesArray() {
    this.totalPagesArray = Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    this.visibleProperties = this.allFilteredProperties.slice(start, start + this.pageSize);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Supplementary Section Actions
  setSchoolTab(tab: string) {
    this.activeSchoolTab = tab;
  }

  toggleDiscoverySection(section: string) {
    if (this.activeDiscoverySection === section) {
      this.activeDiscoverySection = null;
    } else {
      this.activeDiscoverySection = section;
    }
  }
}
