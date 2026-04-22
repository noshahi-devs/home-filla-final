import { PropertyService } from '../../shared/services/property.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { UiService } from '../../shared/services/ui.service';
import { DashboardProperty } from '../../shared/models';
import { SubscriptionService, MySubscriptionInfo } from '../../shared/services/subscription.service';
import { Router } from '@angular/router';
import { LineSparklineComponent } from '../../shared/components/charts/line-sparkline.component';
import { BarMiniComponent } from '../../shared/components/charts/bar-mini.component';

@Component({
  selector: 'app-seller-my-properties',
  standalone: true,
  imports: [CommonModule, FormsModule, LineSparklineComponent, BarMiniComponent],
  templateUrl: './my-properties.component.html',
  styleUrl: './my-properties.component.css'
})
export class SellerMyPropertiesComponent implements OnInit {
  properties: DashboardProperty[] = [];
  filteredProperties: DashboardProperty[] = [];
  searchTerm: string = '';
  statusFilter: string = 'all';

  isModalOpen: boolean = false;
  editingProperty: Partial<DashboardProperty> = {};
  isEditMode: boolean = false;
  isSaving: boolean = false;
  uploadingImage: boolean = false;
  selectedFiles: File[] = [];
  mySubscription: MySubscriptionInfo | null = null;

  // ── Add-property stepper state ─────────────────────────────
  currentStep = 1;
  addForm: any = { type: 'house', purpose: 'sale', country: 'Pakistan', beds: 0, baths: 0 };
  addFiles: File[] = [];

  isAnalyticsOpen = false;
  analyticsLoading = false;
  analytics: any = null;
  userId!: number;

  constructor(
    private propertyService: PropertyService,
    private authService: AuthService,
    private uiService: UiService,
    private subscriptionService: SubscriptionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.loadSubscription();
    this.loadProperties();
  }

  loadSubscription(): void {
    this.subscriptionService.getMySubscription().subscribe({
      next: (info) => (this.mySubscription = info),
      error: () => (this.mySubscription = null),
    });
  }

  loadProperties() {
    this.propertyService.getPropertiesBySeller(this.userId).subscribe(properties => {
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
      this.propertyService.deleteProperty(id).subscribe(() => {
        this.loadProperties();
        this.loadSubscription();
        this.uiService.showToast('success', 'Deleted', 'Your listing was successfully removed.');
      });
    }
  }

  // Modal logic
  openAddModal() {
    this.isEditMode = false;
    this.currentStep = 1;
    this.addForm = { type: 'house', purpose: 'sale', country: 'Pakistan', beds: 0, baths: 0 };
    this.addFiles = [];
    this.isModalOpen = true;
  }

  // Add-form step navigation
  canNextStep(step: number): boolean {
    switch (step) {
      case 1: return !!(this.addForm.title?.trim().length >= 5) && !!(this.addForm.description?.trim().length >= 20);
      case 2: return !!(this.addForm.price > 0) && !!this.addForm.type && !!this.addForm.purpose && !!(this.addForm.sqft > 0);
      case 3: return !!this.addForm.country && !!this.addForm.city && !!this.addForm.area?.trim();
      case 4: return this.addFiles.length > 0;
      default: return true;
    }
  }

  nextStep() { if (this.canNextStep(this.currentStep)) this.currentStep++; }
  prevStep() { if (this.currentStep > 1) this.currentStep--; }
  goToStep(n: number) { if (n < this.currentStep) this.currentStep = n; }

  onAddFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) this.addFiles.push(files[i]);
  }

  removeAddFile(i: number): void { this.addFiles.splice(i, 1); }

  triggerAddFileInput(): void { document.getElementById('add-prop-images')?.click(); }

  submitNewProperty(): void {
    if (!this.canNextStep(4)) return;
    this.isSaving = true;
    const fd = new FormData();
    fd.append('Title', this.addForm.title || '');
    fd.append('Description', this.addForm.description || '');
    fd.append('Price', (this.addForm.price || 0).toString());
    fd.append('Type', this.addForm.type || 'house');
    fd.append('Purpose', this.addForm.purpose || 'sale');
    fd.append('Sqft', (this.addForm.sqft || 0).toString());
    fd.append('Beds', (this.addForm.beds || 0).toString());
    fd.append('Baths', (this.addForm.baths || 0).toString());
    fd.append('Country', this.addForm.country || 'Pakistan');
    fd.append('City', this.addForm.city || '');
    fd.append('Area', this.addForm.area || '');
    fd.append('ListingStatus', 'active');
    this.addFiles.forEach(f => fd.append('ImageFiles', f, f.name));
    this.uiService.showToast('processing', 'Saving...', 'Uploading your property details.', 900);
    this.propertyService.addProperty(fd).subscribe({
      next: () => {
        this.isSaving = false;
        this.closeModal();
        this.loadProperties();
        this.loadSubscription();
        this.uiService.showToast('success', 'Published', 'Your listing is live!');
      },
      error: (err) => {
        this.isSaving = false;
        const msg = err?.error?.message || 'Could not save property.';
        this.uiService.showToast('error', 'Save Failed', msg);
        if (err?.status === 409) this.router.navigate(['/seller/subscription']);
      }
    });
  }

  openEditModal(property: DashboardProperty) {
    this.isEditMode = true;
    this.editingProperty = { ...property, images: property.images || [] };
    this.currentStep = 1;
    this.addForm = {
      title: property.title,
      description: property.description || '',
      price: property.price,
      type: property.type || 'house',
      purpose: property.purpose || 'sale',
      sqft: property.sqft || 0,
      beds: property.beds || 0,
      baths: property.baths || 0,
      country: property.country || 'Pakistan',
      city: property.city || '',
      area: property.area || ''
    };
    this.addFiles = [];
    this.selectedFiles = [];
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.isEditMode = false;
    this.editingProperty = {};
    this.selectedFiles = [];
    this.addFiles = [];
    this.currentStep = 1;
  }

  openAnalytics(property: DashboardProperty): void {
    this.isAnalyticsOpen = true;
    this.analyticsLoading = true;
    this.analytics = { property };
    this.propertyService.getPropertyAnalytics(property.id, 30).subscribe({
      next: (res) => {
        this.analytics = { property, ...res };
        this.analyticsLoading = false;
      },
      error: () => {
        this.analyticsLoading = false;
        this.uiService.showToast('error', 'Analytics', 'Could not load property analytics.');
      }
    });
  }

  closeAnalytics(): void {
    this.isAnalyticsOpen = false;
    this.analytics = null;
  }

  triggerFileInput(): void {
    document.getElementById('seller-property-images')?.click();
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
        (this.editingProperty.images as any[]).push(e.target.result);
        if (i === files.length - 1) this.uploadingImage = false;
      };
      reader.readAsDataURL(files[i]);
    }
  }

  removeImage(index: number): void {
    (this.editingProperty.images as any[])?.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  private validateProperty(): boolean {
    const p = this.editingProperty;
    if (!p.title || !p.title.trim()) {
      this.uiService.showToast('error', 'Validation', 'Title is required.');
      return false;
    }
    if (!p.price || p.price <= 0) {
      this.uiService.showToast('error', 'Validation', 'A valid price is required.');
      return false;
    }
    if (!p.country || !p.city) {
      this.uiService.showToast('error', 'Validation', 'Country and City are required.');
      return false;
    }
    if (!p.area) {
      this.uiService.showToast('error', 'Validation', 'Area is required.');
      return false;
    }
    return true;
  }

  saveProperty(): void {
    this.isSaving = true;

    const formData = new FormData();
    formData.append('Title', this.addForm.title || '');
    formData.append('Description', (this.addForm.description || '').toString());
    formData.append('Price', (this.addForm.price || 0).toString());
    formData.append('Purpose', this.addForm.purpose || 'sale');
    formData.append('Country', (this.addForm.country || 'Pakistan').toString());
    formData.append('City', (this.addForm.city || '').toString());
    formData.append('Area', (this.addForm.area || '').toString());
    formData.append('Type', (this.addForm.type || 'house').toString());
    formData.append('Beds', (this.addForm.beds || 0).toString());
    formData.append('Baths', (this.addForm.baths || 0).toString());
    formData.append('Sqft', (this.addForm.sqft || 0).toString());
    formData.append('ListingStatus', (this.editingProperty.listingStatus || 'active').toString());

    // Keep existing images for edit
    if (this.editingProperty.images) {
      (this.editingProperty.images as any[]).forEach((img: any) => {
        if (typeof img === 'string' && img.startsWith('/uploads')) formData.append('Images', img);
      });
    }

    this.addFiles.forEach((file) => formData.append('ImageFiles', file, file.name));

    const action =
      this.isEditMode && this.editingProperty.id
        ? this.propertyService.updateProperty(this.editingProperty.id, formData)
        : this.propertyService.addProperty(formData);

    this.uiService.showToast('processing', 'Saving...', 'Uploading your property details.', 900);
    action.subscribe({
      next: () => {
        this.isSaving = false;
        this.closeModal();
        this.loadProperties();
        this.loadSubscription();
        this.uiService.showToast('success', 'Saved', 'Your listing has been saved.');
      },
      error: (err) => {
        this.isSaving = false;
        const msg = err?.error?.message || 'Could not save property.';
        this.uiService.showToast('error', 'Save Failed', msg);
        if (err?.status === 409) {
          this.router.navigate(['/seller/subscription']);
        }
      },
    });
  }
}
