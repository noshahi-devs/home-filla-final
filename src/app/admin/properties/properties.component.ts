import { PropertyService } from '../../shared/services/property.service';
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  properties: DashboardProperty[] = [];
  filteredProperties: DashboardProperty[] = [];
  
  isLoading: boolean = true;
  isSaving: boolean = false;
  hasError: boolean = false;
  errorMessage: string = '';

  searchTerm: string = '';
  statusFilter: string = 'all';
  typeFilter: string = 'all';
  cityFilter: string = 'all';

  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 1;
  paginatedProperties: DashboardProperty[] = [];
  pageSizeOptions: number[] = [6, 12, 24, 48];

  isModalOpen: boolean = false;
  editingProperty: Partial<DashboardProperty> = { images: [] };
  isEditMode: boolean = false;
  uploadingImage: boolean = false;
  selectedFiles: File[] = [];
  protected readonly Math = Math;

  ngOnInit(): void {
    console.log('AdminPropertiesComponent: Initializing...');
    this.loadProperties();
  }

  loadProperties(): void {
    this.isLoading = true;
    this.hasError = false;
    this.cdr.detectChanges();

    this.propertyService.getProperties().pipe(take(1)).subscribe({
      next: (properties) => {
        this.properties = properties;
        this.applyFilters();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('AdminPropertiesComponent: Load error:', err);
        this.hasError = true;
        this.isLoading = false;
        this.uiService.showToast('error', 'API Error', 'Could not connect to the server.');
        this.cdr.detectChanges();
      }
    });
  }

  applyFilters(): void {
    let result = this.properties;
    if (this.statusFilter !== 'all') result = result.filter(p => p.status === this.statusFilter);
    if (this.typeFilter !== 'all') result = result.filter(p => p.type.toLowerCase() === this.typeFilter.toLowerCase());
    if (this.cityFilter !== 'all') result = result.filter(p => p.city === this.cityFilter);
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(term) || p.city.toLowerCase().includes(term) || p.id.toString().includes(term));
    }
    this.filteredProperties = result;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProperties.length / this.pageSize) || 1;
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedProperties = this.filteredProperties.slice(startIndex, startIndex + this.pageSize);
    this.cdr.detectChanges();
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
    console.log(`AdminPropertiesComponent: Triggering Approve for ID ${id}`);
    const isConfirmed = await this.uiService.showConfirmation('Approve Property', 'This will make the listing public. Continue?', 'info', 'Approve');
    if (isConfirmed) this.executeStatusUpdate(id, 'approved', 'Property Approved');
  }

  async blockProperty(id: number): Promise<void> {
    console.log(`AdminPropertiesComponent: Triggering Block for ID ${id}`);
    const isConfirmed = await this.uiService.showConfirmation('Block Property', 'This listing will be hidden. Continue?', 'warning', 'Block');
    if (isConfirmed) this.executeStatusUpdate(id, 'rejected', 'Property Blocked');
  }

  private executeStatusUpdate(id: number, status: string, toastTitle: string) {
    console.log(`AdminPropertiesComponent: Executing status update for ${id} to ${status}`);
    this.isSaving = true;
    this.cdr.detectChanges();

    this.propertyService.updatePropertyStatus(id, status).pipe(take(1)).subscribe({
      next: () => {
        this.loadProperties();
        this.uiService.showToast('success', toastTitle, 'Status updated successfully.');
        this.isSaving = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('AdminPropertiesComponent: Status update failed:', err);
        if (err.error) console.error('SERVER ERROR REASON:', err.error);
        this.uiService.showToast('error', 'Update Failed', 'Server error. Check console.');
        this.isSaving = false;
        this.cdr.detectChanges();
      }
    });
  }

  async deleteProperty(id: number): Promise<void> {
    console.log(`AdminPropertiesComponent: Triggering Delete for ID ${id}`);
    const isConfirmed = await this.uiService.showConfirmation('Delete Property', 'Confirm permanent removal?', 'danger', 'Delete');
    if (isConfirmed) {
      this.isSaving = true;
      this.cdr.detectChanges();
      this.propertyService.deleteProperty(id).pipe(take(1)).subscribe({
        next: () => {
          this.loadProperties();
          this.uiService.showToast('success', 'Property Deleted', 'Removed successfully.');
          this.isSaving = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('AdminPropertiesComponent: Delete failed:', err);
          this.uiService.showToast('error', 'Delete Failed', 'Check backend logs.');
          this.isSaving = false;
          this.cdr.detectChanges();
        }
      });
    }
  }

  // Modal & Validation
  getStatusCount(status: string): number {
    return this.properties.filter(p => p.status === status).length;
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.editingProperty = { type: 'house', purpose: 'sale', status: 'pending', images: [], sellerId: 1 };
    this.isModalOpen = true;
    this.cdr.detectChanges();
  }

  openEditModal(property: DashboardProperty): void {
    this.isEditMode = true;
    this.editingProperty = { ...property, images: property.images || [] };
    this.isModalOpen = true;
    this.cdr.detectChanges();
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.editingProperty = {};
    this.selectedFiles = [];
    this.cdr.detectChanges();
  }

  triggerFileInput(): void {
    document.getElementById('property-images')?.click();
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
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(files[i]);
    }
  }

  removeImage(index: number): void {
    this.editingProperty.images?.splice(index, 1);
    this.selectedFiles.splice(index, 1);
    this.cdr.detectChanges();
  }

  validateProperty(): boolean {
    const p = this.editingProperty;
    if (!p.title || !p.title.trim()) {
      this.uiService.showToast('error', 'ValidationError', 'Title is mandatory.');
      return false;
    }
    if (!p.price || p.price <= 0) {
      this.uiService.showToast('error', 'ValidationError', 'Valid Price is mandatory.');
      return false;
    }
    if (!p.city || !p.area) {
      this.uiService.showToast('error', 'ValidationError', 'City and Area are mandatory.');
      return false;
    }
    if (!p.sellerId || p.sellerId <= 0) {
      this.uiService.showToast('error', 'ValidationError', 'Seller ID is mandatory.');
      return false;
    }
    return true;
  }

  saveProperty(): void {
    console.log('AdminPropertiesComponent: Attempting to Save...');
    if (!this.validateProperty()) return;

    this.isSaving = true;
    this.cdr.detectChanges();

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
    formData.append('SellerId', (this.editingProperty.sellerId || 1).toString());

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
        console.log('AdminPropertiesComponent: Save successful!');
        this.closeModal();
        this.loadProperties();
        this.uiService.showToast('success', this.isEditMode ? 'Updated' : 'Created', 'Listing saved.');
        this.isSaving = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('AdminPropertiesComponent: Save failed:', err);
        this.uiService.showToast('error', 'Save Failed', 'Server error.');
        this.isSaving = false;
        this.cdr.detectChanges();
      }
    });
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getCities(): string[] {
    return [...new Set(this.properties.map(p => p.city))].sort();
  }
}
