import { PropertyService } from '../../shared/services/property.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiService } from '../../shared/services/ui.service';
import { AuthService } from '../../shared/services/auth.service';
import { DashboardProperty } from '../../shared/models';
import { take } from 'rxjs';

@Component({
  selector: 'app-admin-properties',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {
  private propertyService = inject(PropertyService);
  private uiService = inject(UiService);
  private authService = inject(AuthService);

  properties: DashboardProperty[] = [];
  filteredProperties: DashboardProperty[] = [];
  
  // Status States
  isLoading: boolean = true;
  isSaving: boolean = false;
  hasError: boolean = false;
  errorMessage: string = '';

  // Filters
  searchTerm: string = '';
  statusFilter: string = 'all';
  typeFilter: string = 'all';
  cityFilter: string = 'all';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 1;
  paginatedProperties: DashboardProperty[] = [];
  pageSizeOptions: number[] = [6, 12, 24, 48];

  // Modal State
  isModalOpen: boolean = false;
  editingProperty: Partial<DashboardProperty> = { images: [] };
  isEditMode: boolean = false;
  uploadingImage: boolean = false;
  selectedFiles: File[] = [];
  protected readonly Math = Math;

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.isLoading = true;
    this.hasError = false;
    
    this.propertyService.getProperties().pipe(take(1)).subscribe({
      next: (properties) => {
        this.properties = properties;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        this.hasError = true;
        this.isLoading = false;
        this.errorMessage = 'Failed to load properties. Check backend connection.';
        this.uiService.showToast('error', 'API Error', 'Could not connect to the server.');
      }
    });
  }

  applyFilters(): void {
    let result = this.properties;

    if (this.statusFilter !== 'all') {
      result = result.filter(p => p.status === this.statusFilter);
    }

    if (this.typeFilter !== 'all') {
      result = result.filter(p => p.type.toLowerCase() === this.typeFilter.toLowerCase());
    }

    if (this.cityFilter !== 'all') {
      result = result.filter(p => p.city === this.cityFilter);
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
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProperties.length / this.pageSize) || 1;
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedProperties = this.filteredProperties.slice(startIndex, startIndex + this.pageSize);
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  setFilter(status: string): void {
    this.statusFilter = status;
    this.applyFilters();
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value;
    this.applyFilters();
  }

  // Administrative Actions
  async approveProperty(id: number): Promise<void> {
    const isConfirmed = await this.uiService.showConfirmation(
      'Approve Property',
      'This property will become visible to all buyers. Proceed?',
      'info',
      'Approve Listing'
    );
    if (isConfirmed) {
      this.executeStatusUpdate(id, 'approved', 'Property Approved');
    }
  }

  async blockProperty(id: number): Promise<void> {
    const isConfirmed = await this.uiService.showConfirmation(
      'Block Property',
      'Are you sure you want to block this property? It will be hidden from the platform.',
      'warning',
      'Block Listing'
    );
    if (isConfirmed) {
      this.executeStatusUpdate(id, 'rejected', 'Property Blocked');
    }
  }

  private executeStatusUpdate(id: number, status: string, toastTitle: string) {
    this.isSaving = true;
    this.propertyService.updatePropertyStatus(id, status).pipe(take(1)).subscribe({
      next: () => {
        this.loadProperties();
        this.uiService.showToast('success', toastTitle, 'The listing status has been updated.');
        this.isSaving = false;
      },
      error: () => {
        this.uiService.showToast('error', 'Update Failed', 'There was an error updating the status.');
        this.isSaving = false;
      }
    });
  }

  async deleteProperty(id: number): Promise<void> {
    const isConfirmed = await this.uiService.showConfirmation(
      'Delete Property',
      'This action is permanent and cannot be undone. Confirm deletion?',
      'danger',
      'Delete Forever'
    );

    if (isConfirmed) {
      this.isSaving = true;
      this.propertyService.deleteProperty(id).pipe(take(1)).subscribe({
        next: () => {
          this.loadProperties();
          this.uiService.showToast('success', 'Property Deleted', 'The listing has been permanently removed.');
          this.isSaving = false;
        },
        error: () => {
          this.uiService.showToast('error', 'Deletion Error', 'Failed to remove the property.');
          this.isSaving = false;
        }
      });
    }
  }

  // Modal Methods
  getStatusCount(status: string): number {
    return this.properties.filter(p => p.status === status).length;
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.editingProperty = {
      type: 'house',
      purpose: 'sale',
      status: 'pending',
      images: [],
      sellerId: this.authService.getUserId()
    };
    this.isModalOpen = true;
  }

  openEditModal(property: DashboardProperty): void {
    this.isEditMode = true;
    this.editingProperty = { ...property, images: property.images || [] };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.editingProperty = {};
    this.selectedFiles = [];
  }

  // Image Handling
  triggerFileInput(): void {
    const fileInput = document.getElementById('property-images') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    this.uploadingImage = true;
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (!this.editingProperty.images) this.editingProperty.images = [];
        this.editingProperty.images.push(e.target.result);
        if (i === files.length - 1) this.uploadingImage = false;
      };
      reader.readAsDataURL(files[i]);
    }
  }

  removeImage(index: number): void {
    this.editingProperty.images?.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  saveProperty(): void {
    this.isSaving = true;
    const formData = new FormData();
    formData.append('Title', this.editingProperty.title || '');
    formData.append('Description', this.editingProperty.description || '');
    formData.append('Price', (this.editingProperty.price || 0).toString());
    formData.append('Purpose', this.editingProperty.purpose || 'sale');
    formData.append('City', this.editingProperty.city || '');
    formData.append('Area', this.editingProperty.area || '');
    formData.append('Type', this.editingProperty.type || 'house');
    formData.append('Beds', (this.editingProperty.beds || 0).toString());
    formData.append('Baths', (this.editingProperty.baths || 0).toString());
    formData.append('Sqft', (this.editingProperty.sqft || 0).toString());
    formData.append('SellerId', (this.authService.getUserId() || 1).toString());

    if (this.editingProperty.images) {
      this.editingProperty.images.forEach(img => {
        if (img.startsWith('/uploads')) formData.append('Images', img);
      });
    }

    this.selectedFiles.forEach(file => {
      formData.append('ImageFiles', file, file.name);
    });

    const action = (this.isEditMode && this.editingProperty.id) 
      ? this.propertyService.updateProperty(this.editingProperty.id, formData)
      : this.propertyService.addProperty(formData);

    action.pipe(take(1)).subscribe({
      next: () => {
        this.closeModal();
        this.loadProperties();
        this.uiService.showToast('success', this.isEditMode ? 'Property Updated!' : 'Property Saved!', 'Platform data has been refreshed.');
        this.isSaving = false;
      },
      error: () => {
        this.uiService.showToast('error', 'Operation Failed', 'Please check your inputs and try again.');
        this.isSaving = false;
      }
    });
  }

  // UI Helpers
  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getCities(): string[] {
    return [...new Set(this.properties.map(p => p.city))].sort();
  }
}
