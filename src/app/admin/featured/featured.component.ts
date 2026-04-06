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

  constructor(private propertyService: PropertyService, private uiService: UiService) { }

  ngOnInit() {
    this.loadProperties();
  }

  loadProperties() {
    this.propertyService.getProperties().subscribe(props => {
      this.properties = props;
      this.filterProperties();
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

