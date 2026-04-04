import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../shared/services/mock-data.service';
import { UiService } from '../../shared/services/ui.service';
import { DashboardProperty } from '../../shared/models';

@Component({
  selector: 'app-admin-properties',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class AdminPropertiesComponent implements OnInit {
  properties: DashboardProperty[] = [];
  filteredProperties: DashboardProperty[] = [];
  
  // Filters
  searchTerm: string = '';
  statusFilter: string = 'all';

  // Modal State
  isModalOpen: boolean = false;
  editingProperty: Partial<DashboardProperty> = {};
  isEditMode: boolean = false;

  constructor(
    private dataService: MockDataService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.properties = this.dataService.getProperties();
    this.applyFilters();
  }

  applyFilters(): void {
    let result = this.properties;

    if (this.statusFilter !== 'all') {
      result = result.filter(p => p.status === this.statusFilter);
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(term) || 
        p.city.toLowerCase().includes(term) ||
        p.id.toString().includes(term)
      );
    }

    this.filteredProperties = result;
  }

  setFilter(status: string): void {
    this.statusFilter = status;
    this.applyFilters();
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value;
    this.applyFilters();
  }

  // Actions
  async approveProperty(id: number): Promise<void> {
    const isConfirmed = await this.uiService.showConfirmation(
      'Approve Property',
      'This property will become visible to all buyers. Proceed?',
      'info',
      'Approve Now'
    );
    if (isConfirmed) {
      this.dataService.updatePropertyStatus(id, 'approved');
      this.loadProperties();
      this.uiService.showToast('success', 'Property Approved', 'The listing is now active.');
    }
  }

  async rejectProperty(id: number): Promise<void> {
    const isConfirmed = await this.uiService.showConfirmation(
      'Reject Property',
      'Are you sure you want to reject this property listing? The seller will be notified.',
      'warning',
      'Reject Listing'
    );
    if (isConfirmed) {
      this.dataService.updatePropertyStatus(id, 'rejected');
      this.loadProperties();
      this.uiService.showToast('info', 'Property Rejected', 'The listing has been marked as rejected.');
    }
  }

  async deleteProperty(id: number): Promise<void> {
    const isConfirmed = await this.uiService.showConfirmation(
      'Delete Property',
      'Are you sure you want to delete this property? This action cannot be undone.',
      'danger'
    );

    if (isConfirmed) {
      this.uiService.showToast('processing', 'Deleting...', 'Removing property from database.', 1000);
      setTimeout(() => {
        this.dataService.deleteProperty(id);
        this.loadProperties();
        this.uiService.showToast('success', 'Deleted', 'The property has been permanently removed.');
      }, 1000);
    }
  }

  // Modal Methods
  openAddModal(): void {
    this.isEditMode = false;
    this.editingProperty = {
      type: 'house',
      purpose: 'sale',
      status: 'pending',
      sellerId: 1
    };
    this.isModalOpen = true;
  }

  openEditModal(property: DashboardProperty): void {
    this.isEditMode = true;
    this.editingProperty = { ...property };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.editingProperty = {};
  }

  saveProperty(): void {
    this.closeModal();
    this.uiService.showToast('processing', 'Saving...', 'Updating property details in system', 800);

    setTimeout(() => {
      if (this.isEditMode) {
        // In a real app, update via service
        const idx = this.properties.findIndex(p => p.id === this.editingProperty.id);
        if (idx > -1) {
          Object.assign(this.properties[idx], this.editingProperty, { updatedAt: new Date() });
        }
      } else {
        // Create new property
        const newProperty: DashboardProperty = {
          ...this.editingProperty,
          id: Math.max(0, ...this.properties.map(p => p.id)) + 1,
          images: this.editingProperty.images || ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80'],
          views: 0,
          isFeatured: false,
          createdAt: new Date(),
          updatedAt: new Date()
        } as DashboardProperty;
        this.properties.push(newProperty);
      }
      this.loadProperties();
      this.uiService.showToast('success', 'Property Saved!', 'Your changes have been fully applied.');
    }, 800);
  }
}
