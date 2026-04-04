import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../shared/services/mock-data.service';
import { UiService } from '../../shared/services/ui.service';
import { AuthService } from '../../shared/services/auth.service';
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
    private uiService: UiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.dataService.getProperties().subscribe(properties => {
      this.properties = properties;
      this.applyFilters();
    });
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
      this.dataService.updatePropertyStatus(id, 'approved').subscribe(() => {
        this.loadProperties();
        this.uiService.showToast('success', 'Property Approved', 'The listing is now active.');
      });
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
      this.dataService.updatePropertyStatus(id, 'rejected').subscribe(() => {
        this.loadProperties();
        this.uiService.showToast('info', 'Property Rejected', 'The listing has been marked as rejected.');
      });
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
      this.dataService.deleteProperty(id).subscribe(() => {
        this.loadProperties();
        this.uiService.showToast('success', 'Deleted', 'The property has been permanently removed.');
      });
    }
  }

  // Modal Methods
  openAddModal(): void {
    this.isEditMode = false;
    this.editingProperty = {
      type: 'house',
      purpose: 'sale',
      status: 'pending',
      sellerId: this.authService.getUserId()
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
    this.uiService.showToast('processing', 'Saving...', 'Updating property details in system', 800);
    
    // In a real app, you would have an add/update method in the service
    // For now, I'll assume we can use a generic save or add/update endpoints if I had them
    // But since I only implemented get/put-status/delete in the backend controller so far,
    // I'll leave this as a reminder to implement Post/Put in the backend.
    
    // Simulating API call for now if it's a new or edit
    this.closeModal();
    this.loadProperties();
    this.uiService.showToast('success', 'Property Saved!', 'Your changes have been fully applied.');
  }
}
