import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../shared/services/mock-data.service';
import { AuthService } from '../../shared/services/auth.service';
import { UiService } from '../../shared/services/ui.service';
import { DashboardProperty } from '../../shared/models';

@Component({
  selector: 'app-seller-my-properties',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-properties.component.html',
  styleUrl: '../../admin/properties/properties.component.css'
})
export class SellerMyPropertiesComponent implements OnInit {
  properties: DashboardProperty[] = [];
  filteredProperties: DashboardProperty[] = [];
  searchTerm: string = '';
  statusFilter: string = 'all';

  isModalOpen: boolean = false;
  editingProperty: Partial<DashboardProperty> = {};
  isEditMode: boolean = false;
  userId!: number;

  constructor(
    private dataService: MockDataService,
    private authService: AuthService,
    private uiService: UiService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.loadProperties();
  }

  loadProperties() {
    this.dataService.getPropertiesBySeller(this.userId).subscribe(properties => {
      this.properties = properties;
      this.applyFilters();
    });
  }

  applyFilters() {
    let result = this.properties;
    if (this.statusFilter !== 'all') {
      result = result.filter(p => p.status === this.statusFilter);
    }
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(term) || p.city.toLowerCase().includes(term));
    }
    this.filteredProperties = result;
  }

  setFilter(status: string) {
    this.statusFilter = status;
    this.applyFilters();
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value;
    this.applyFilters();
  }

  async deleteProperty(id: number): Promise<void> {
    const isConfirmed = await this.uiService.showConfirmation(
      'Delete Listing',
      'Are you sure you want to delete this property? You will lose all views and inquiries.',
      'danger'
    );
    if (isConfirmed) {
      this.uiService.showToast('processing', 'Deleting...', 'Removing your property.', 1000);
      this.dataService.deleteProperty(id).subscribe(() => {
        this.loadProperties();
        this.uiService.showToast('success', 'Deleted', 'Your listing was successfully removed.');
      });
    }
  }

  // Modal logic (similar to admin but restricted to user's ID)
  openAddModal() {
    this.isEditMode = false;
    this.editingProperty = { type: 'house', purpose: 'sale', status: 'pending', sellerId: this.userId };
    this.isModalOpen = true;
  }

  openEditModal(property: DashboardProperty) {
    this.isEditMode = true;
    this.editingProperty = { ...property };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingProperty = {};
  }

  saveProperty() {
    this.uiService.showToast('processing', 'Saving...', 'Uploading your property details.', 800);
    
    // In a real app, use this.dataService.addProperty or updateProperty
    // Simulating completion for now
    this.closeModal();
    this.loadProperties();
    this.uiService.showToast('success', 'Property Saved!', 'Your changes have been fully applied.');
  }
}
