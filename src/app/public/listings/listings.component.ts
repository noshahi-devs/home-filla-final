import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { getCategoryData, CategoryInfo, Property } from '../../data/listings.data';

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
  imports: [CommonModule, RouterLink]
})
export class ListingsComponent implements OnInit, AfterViewInit {
  category: CategoryInfo | null = null;
  visibleProperties: Property[] = [];
  pageSize = 12;
  
  // Map and Favorite State
  isMapOpen = false;
  activeMapFilter = 'Layers';
  savedPropertyIds: Set<number> = new Set();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('category') || '';
      this.category = getCategoryData(slug);
      this.visibleProperties = this.category?.properties.slice(0, this.pageSize) || [];
    });
  }

  ngAfterViewInit() {
    delete window.__homeFillaInit;
    setTimeout(() => {
      window.initHomeFillaPage?.();
    }, 0);
  }

  get hasMore(): boolean {
    return (this.category?.properties.length || 0) > this.visibleProperties.length;
  }

  get remaining(): number {
    return (this.category?.properties.length || 0) - this.visibleProperties.length;
  }

  loadMore() {
    const all = this.category?.properties || [];
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
}
