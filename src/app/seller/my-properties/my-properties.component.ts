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
  isSaving: boolean = false;
  uploadingImage: boolean = false;
  selectedFiles: File[] = [];
  mySubscription: MySubscriptionInfo | null = null;

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

  // Modal logic (similar to admin but restricted to user's ID)
  async openAddModal() {
    if (this.mySubscription && this.mySubscription.remaining <= 0) {
      const goUpgrade = await this.uiService.showConfirmation(
        'Listing Limit Reached',
        `You have reached your plan limit (${this.mySubscription.plan.listingLimit}). Upgrade to add more listings.`,
        'warning',
        'Upgrade Plan'
      );
      if (goUpgrade) this.router.navigate(['/seller/subscription']);
      return;
    }

    this.isEditMode = false;
    this.editingProperty = {
      country: 'Pakistan',
      type: 'house',
      purpose: 'sale',
      listingStatus: 'active',
      status: 'pending',
      images: []
    };
    this.selectedFiles = [];
    this.isModalOpen = true;
  }

  openEditModal(property: DashboardProperty) {
    this.isEditMode = true;
    this.editingProperty = { ...property, images: property.images || [] };
    this.selectedFiles = [];
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingProperty = {};
    this.selectedFiles = [];
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
    if (!this.validateProperty()) return;

    this.isSaving = true;

    const formData = new FormData();
    formData.append('Title', this.editingProperty.title || '');
    formData.append('Description', (this.editingProperty.description || '').toString());
    formData.append('Price', (this.editingProperty.price || 0).toString());
    formData.append('Purpose', this.editingProperty.purpose || 'sale');
    formData.append('Country', (this.editingProperty.country || 'Pakistan').toString());
    formData.append('City', (this.editingProperty.city || '').toString());
    formData.append('Area', (this.editingProperty.area || '').toString());
    formData.append('Type', (this.editingProperty.type || 'house').toString());
    formData.append('Beds', (this.editingProperty.beds || 0).toString());
    formData.append('Baths', (this.editingProperty.baths || 0).toString());
    formData.append('Sqft', (this.editingProperty.sqft || 0).toString());
    formData.append('ListingStatus', (this.editingProperty.listingStatus || 'active').toString());

    if (this.editingProperty.images) {
      (this.editingProperty.images as any[]).forEach((img: any) => {
        if (typeof img === 'string' && img.startsWith('/uploads')) formData.append('Images', img);
      });
    }

    this.selectedFiles.forEach((file) => formData.append('ImageFiles', file, file.name));

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
