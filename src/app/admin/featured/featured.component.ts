import { PropertyService } from '../../shared/services/property.service';
import { UiService } from '../../shared/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardProperty } from '../../shared/models';

@Component({
  selector: 'app-admin-featured',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css'
})
export class AdminFeaturedComponent implements OnInit {
  properties: DashboardProperty[] = [];
  filteredProperties: DashboardProperty[] = [];

  searchQuery = '';
  currentFilter: 'all' | 'featured' | 'unfeatured' = 'all';
  loading = false;

  // Pagination
  propertiesPage = 1;
  propertiesPageSize = 6;

  constructor(private propertyService: PropertyService, private uiService: UiService) { }

  ngOnInit() {
    this.loadProperties();
  }

  loadProperties() {
    this.loading = true;
    this.propertyService.getProperties().subscribe({
      next: (props) => {
        this.properties = props;
        this.filterProperties();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.uiService.showToast('error', 'Fetch Failed', 'Could not load properties.');
      }
    });
  }

  get featuredCount(): number {
    return this.properties.filter(p => p.isFeatured).length;
  }

  filterProperties() {
    let filtered = this.properties;

    if (this.currentFilter === 'featured') {
      filtered = filtered.filter(p => p.isFeatured);
    } else if (this.currentFilter === 'unfeatured') {
      filtered = filtered.filter(p => !p.isFeatured);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q)
      );
    }

    this.filteredProperties = filtered;
    this.propertiesPage = 1; // Reset to page 1 on filter
  }

  get pagedProperties(): DashboardProperty[] {
    const start = (this.propertiesPage - 1) * this.propertiesPageSize;
    return this.filteredProperties.slice(start, start + this.propertiesPageSize);
  }

  get totalPropertiesPages(): number {
    return Math.ceil(this.filteredProperties.length / this.propertiesPageSize) || 1;
  }

  setFilter(filter: 'all' | 'featured' | 'unfeatured') {
    this.currentFilter = filter;
    this.filterProperties();
  }

  toggleFeatured(property: DashboardProperty) {
    const act = property.isFeatured ? 'Removed' : 'Featured';
    this.propertyService.toggleFeatured(property.id).subscribe({
      next: () => {
        this.uiService.showToast('success', 'Status Updated', `Property has been ${act} successfully.`);
        this.loadProperties();
      },
      error: () => {
        this.uiService.showToast('error', 'Error', 'Failed to update feature status');
      }
    });
  }
}

