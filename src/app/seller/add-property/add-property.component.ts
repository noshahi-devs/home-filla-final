import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PropertyService } from '../../shared/services/property.service';
import { UiService } from '../../shared/services/ui.service';
import { AuthService } from '../../shared/services/auth.service';

// PrimeNG Imports
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    StepperModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    InputNumberModule,
    FileUploadModule,
    CardModule,
    MessageModule,
    ToastModule
  ],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent implements OnInit {
  private fb = inject(FormBuilder);
  private propertyService = inject(PropertyService);
  private uiService = inject(UiService);
  private authService = inject(AuthService);
  private router = inject(Router);

  basicInfoForm!: FormGroup;
  propertyDetailsForm!: FormGroup;
  locationForm!: FormGroup;
  
  uploadedFiles: File[] = [];
  limitInfo: any = null;
  isSubmitting = false;

  propertyTypes = [
    { label: 'House', value: 'house' },
    { label: 'Apartment', value: 'apartment' },
    { label: 'Plot', value: 'plot' },
    { label: 'Commercial', value: 'commercial' }
  ];

  purposes = [
    { label: 'For Sale', value: 'sale' },
    { label: 'For Rent', value: 'rent' }
  ];

  countries = [
    { label: 'Pakistan', value: 'Pakistan' },
    { label: 'United Arab Emirates', value: 'UAE' }
  ];

  cities = [
    { label: 'Lahore', value: 'Lahore' },
    { label: 'Karachi', value: 'Karachi' },
    { label: 'Islamabad', value: 'Islamabad' },
    { label: 'Dubai', value: 'Dubai' }
  ];

  ngOnInit() {
    this.initForms();
    this.checkLimits();
  }

  private initForms() {
    this.basicInfoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]]
    });

    this.propertyDetailsForm = this.fb.group({
      price: [null, [Validators.required, Validators.min(0)]],
      type: ['house', Validators.required],
      purpose: ['sale', Validators.required],
      sqft: [null, [Validators.required, Validators.min(1)]],
      beds: [0, Validators.min(0)],
      baths: [0, Validators.min(0)]
    });

    this.locationForm = this.fb.group({
      country: ['Pakistan', Validators.required],
      city: ['', Validators.required],
      area: ['', Validators.required],
      lat: [null],
      lng: [null]
    });
  }

  private checkLimits() {
    this.propertyService.getListingLimit().subscribe({
      next: (res) => {
        this.limitInfo = res;
      },
      error: (err) => {
        console.error('Error checking limits', err);
      }
    });
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  onRemove(event: any) {
    const index = this.uploadedFiles.indexOf(event.file);
    if (index > -1) {
      this.uploadedFiles.splice(index, 1);
    }
  }

  get canSubmit(): boolean {
    return (
      this.basicInfoForm.valid &&
      this.propertyDetailsForm.valid &&
      this.locationForm.valid &&
      this.uploadedFiles.length > 0 &&
      (!this.limitInfo || this.limitInfo.remaining > 0)
    );
  }

  submit(isDraft: boolean = false) {
    if (!this.canSubmit && !isDraft) {
      this.uiService.showToast('error', 'Form Invalid', 'Please fill all required fields and upload at least one image.');
      return;
    }

    this.isSubmitting = true;
    const formData = new FormData();
    
    // Step 1
    formData.append('title', this.basicInfoForm.value.title);
    formData.append('description', this.basicInfoForm.value.description);

    // Step 2
    formData.append('price', this.propertyDetailsForm.value.price);
    formData.append('type', this.propertyDetailsForm.value.type);
    formData.append('purpose', this.propertyDetailsForm.value.purpose);
    formData.append('sqft', this.propertyDetailsForm.value.sqft);
    formData.append('beds', this.propertyDetailsForm.value.beds);
    formData.append('baths', this.propertyDetailsForm.value.baths);

    // Step 3
    formData.append('country', this.locationForm.value.country);
    formData.append('city', this.locationForm.value.city);
    formData.append('area', this.locationForm.value.area);
    if (this.locationForm.value.lat) formData.append('lat', this.locationForm.value.lat);
    if (this.locationForm.value.lng) formData.append('lng', this.locationForm.value.lng);

    formData.append('listingStatus', isDraft ? 'draft' : 'active');
    formData.append('sellerId', this.authService.getUserId().toString());

    // Step 4
    this.uploadedFiles.forEach((file) => {
      formData.append('imageFiles', file, file.name);
    });

    this.propertyService.addProperty(formData).subscribe({
      next: () => {
        this.uiService.showToast('success', 'Success', isDraft ? 'Property saved as draft.' : 'Property published successfully!');
        this.router.navigate(['/seller/properties']);
        this.isSubmitting = false;
      },
      error: (err) => {
        this.isSubmitting = false;
        const msg = err?.error?.message || 'Failed to save property. Please check your data.';
        this.uiService.showToast('error', 'Submission Failed', msg);
      }
    });
  }

  // Summary helper
  getSummary() {
    return {
      ...this.basicInfoForm.value,
      ...this.propertyDetailsForm.value,
      ...this.locationForm.value,
      images: this.uploadedFiles.length
    };
  }
}
