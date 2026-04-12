import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  
  // Map and Favorite State
  isMapOpen = false;
  activeMapFilter = 'Layers';
  savedPropertyIds: Set<number> = new Set();
  
  // Modal State
  showContactModal = false;
  selectedContactProperty: Property | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]).subscribe(([params, queryParams]) => {
      const slug = params.get('category') || '';
      this.locationFilter = queryParams.get('location');
      const stateSuffix = queryParams.get('state');

      const categoryData = getCategoryData(slug);
      if (categoryData) {
        this.category = { ...categoryData };
        let props = [...this.category.properties];

        if (this.locationFilter) {
           let query = this.locationFilter.toLowerCase();
           const actualFiltered = props.filter(p => p.city.toLowerCase().includes(query));
           if (actualFiltered.length > 0) {
               props = actualFiltered;
           } else {
               const fakeLocation = this.locationFilter + (stateSuffix ? ', ' + stateSuffix : '');
               props = props.map(p => ({...p, city: fakeLocation}));
           }
        }

        this.allFilteredProperties = props;
        this.visibleProperties = this.allFilteredProperties.slice(0, this.pageSize);
        if (this.locationFilter) {
          this.category.count = props.length;
        }
      } else {
        this.category = null;
        this.visibleProperties = [];
        this.allFilteredProperties = [];
      }
    });
  }

  ngAfterViewInit() {
    delete window.__homeFillaInit;
    setTimeout(() => {
      window.initHomeFillaPage?.();
    }, 0);
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
}
