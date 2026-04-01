import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { getCategoryData, CategoryInfo, Property } from '../../data/listings.data';

declare global {
  interface Window {
    initHomeFillaPage?: () => void;
  }
}

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './rent.html',
  styleUrl: './rent.css',
})
export class RentComponent implements OnInit, AfterViewInit {
  category: CategoryInfo | null = null;
  properties: Property[] = [];
  isMapOpen = false;
  activeMapFilter = 'Layers';
  
  // Accordion states
  activeAccordion: string | null = 'popular';

  // Calculator states
  sizeOfMove = '2-3 beds';
  packingNeeded = 'None';
  moveFrom = '';
  moveTo = '';
  estimateResult: string | null = null;

  ngOnInit() {
    this.category = getCategoryData('rent');
    if (this.category) {
      this.properties = this.category.properties;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      window.initHomeFillaPage?.();
    }, 0);
  }

  toggleMap() {
    this.isMapOpen = !this.isMapOpen;
    if (this.isMapOpen) {
        // Re-init scripts if needed when map opens
        setTimeout(() => window.initHomeFillaPage?.(), 100);
    }
  }

  setMapFilter(filter: string) {
    this.activeMapFilter = filter;
  }

  toggleAccordion(id: string) {
    this.activeAccordion = this.activeAccordion === id ? null : id;
  }

  getEstimate() {
    this.estimateResult = '$1,200 - $1,800';
  }

  formatCount(count: number): string {
    return count.toLocaleString();
  }

  toggleFavorite(id: number, event: MouseEvent) {
    event.stopPropagation();
    // Implementation can follow same pattern as listings
  }

  isSaved(id: number): boolean {
    return false;
  }

  toggleFilter(event: MouseEvent, dropdownId: string) {
    event.stopPropagation();
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;
    
    document.querySelectorAll('.filter-dropdown').forEach(d => {
      if (d.id !== dropdownId) d.classList.remove('show');
    });
    
    dropdown.classList.toggle('show');
    
    // Add global click listener if not already handled by top level
  }

  applyFilter(element: any) {
    const dropdown = element.closest('.filter-dropdown');
    if (dropdown) {
      dropdown.classList.remove('show');
      const chip = dropdown.parentElement.querySelector('.filter-chip');
      if (chip) {
        chip.style.borderColor = '#4a6cf7';
        chip.style.backgroundColor = '#f0f3fd';
        chip.style.color = '#4a6cf7';
      }
    }
  }
}
