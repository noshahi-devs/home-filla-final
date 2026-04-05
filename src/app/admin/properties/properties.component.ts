import { PropertyService } from '../../shared/services/property.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  // Status States
  isLoading: boolean = true;
  hasError: boolean = false;
  errorMessage: string = '';

  // Filters
  searchTerm: string = '';
  statusFilter: string = 'all';
  typeFilter: string = 'all';
  cityFilter: string = 'all';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  // Pagination
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  paginatedProperties: DashboardProperty[] = [];
  pageSizeOptions: number[] = [5, 10, 20, 50];

  // Modal State
  isModalOpen: boolean = false;
  editingProperty: Partial<DashboardProperty> = { images: [] };
  isEditMode: boolean = false;
  uploadingImage: boolean = false;
  selectedFiles: File[] = [];
  protected readonly Math = Math;

  constructor(
    private propertyService: PropertyService,
    private uiService: UiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.isLoading = true;
    this.hasError = false;
    
    this.propertyService.getProperties().subscribe({
      next: (properties) => {
        this.properties = properties;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching properties:', err);
        this.hasError = true;
        this.isLoading = false;
        this.errorMessage = 'Failed to load properties. Please make sure the backend server is running.';
        this.uiService.showToast('error', 'API Error', 'Could not connect to the server.');
      }
    });
  }

  applyFilters(): void {
    let result = this.properties;

    // Status Filter
    if (this.statusFilter !== 'all') {
      result = result.filter(p => p.status === this.statusFilter);
    }

    // Type Filter
    if (this.typeFilter !== 'all') {
      result = result.filter(p => p.type.toLowerCase() === this.typeFilter.toLowerCase());
    }

    // City Filter
    if (this.cityFilter !== 'all') {
      result = result.filter(p => p.city === this.cityFilter);
    }

    // Price Filter
    if (this.minPrice !== null) {
      result = result.filter(p => p.price >= (this.minPrice as number));
    }
    if (this.maxPrice !== null) {
      result = result.filter(p => p.price <= (this.maxPrice as number));
    }

    // Search Term
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

  // Actions
  async approveProperty(id: number): Promise<void> {
    const isConfirmed = await this.uiService.showConfirmation(
      'Approve Property',
      'This property will become visible to all buyers. Proceed?',
      'info',
      'Approve Now'
    );
    if (isConfirmed) {
      this.propertyService.updatePropertyStatus(id, 'approved').subscribe(() => {
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
      this.propertyService.updatePropertyStatus(id, 'rejected').subscribe(() => {
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
      this.propertyService.deleteProperty(id).subscribe(() => {
        this.loadProperties();
        this.uiService.showToast('success', 'Deleted', 'The property has been permanently removed.');
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
    this.uiService.showToast('processing', 'Saving...', 'Updating property details in system', 800);
    
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

    // Include any existing URL images (not base64 ones)
    if (this.editingProperty.images) {
      this.editingProperty.images.forEach(img => {
        if (img.startsWith('/uploads')) {
          formData.append('Images', img);
        }
      });
    }

    // Attach physical files
    this.selectedFiles.forEach(file => {
      formData.append('ImageFiles', file, file.name);
    });

    if (this.isEditMode && this.editingProperty.id) {
       this.propertyService.updateProperty(this.editingProperty.id, formData).subscribe({
         next: () => {
           this.closeModal();
           this.loadProperties();
           this.uiService.showToast('success', 'Property Updated!', 'Your changes have been saved.');
         },
         error: (err) => {
           console.error('Update error:', err);
           this.uiService.showToast('error', 'Update Failed', 'There was a problem updating your property.');
         }
       });
    } else {
      this.propertyService.addProperty(formData).subscribe({
        next: () => {
          this.closeModal();
          this.loadProperties();
          this.uiService.showToast('success', 'Property Saved!', 'Your property has been listed.');
        },
        error: (err) => {
          console.error('Save error:', err);
          this.uiService.showToast('error', 'Save Failed', 'There was a problem saving your property.');
        }
      });
    }
  }

  // Helpers for UI
  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getCities(): string[] {
    const cities = this.properties.map(p => p.city);
    return [...new Set(cities)].sort();
  }
}
