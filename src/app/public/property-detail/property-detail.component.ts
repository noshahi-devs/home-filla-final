import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { getCategoryData, getProperty, Property } from '../../data/listings.data';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../../shared/services/property.service';
import { InquiryService } from '../../shared/services/inquiry.service';
import { UiService } from '../../shared/services/ui.service';

import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, SiteFooterComponent, FormsModule],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent implements OnInit {
  property: Property | null = null;
  similarHomes: Property[] = [];
  categorySlug: string = '';
  isSaved: boolean = false;
  showContactModal: boolean = false;
  showShareModal: boolean = false;
  isSendingInquiry = false;

  inquiryForm = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private propertyService: PropertyService,
    private inquiryService: InquiryService,
    private ui: UiService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categorySlug = params.get('category') || '';
      const id = Number(params.get('id'));
      
      this.property = getProperty(this.categorySlug, id);
      if (this.property) {
        // Best-effort view tracking (only increments if the ID exists in the API DB).
        this.propertyService.trackView(id).subscribe({ error: () => {} });
        this.inquiryForm.message = `I'm interested in ${this.property.address}.`;
      }
      
      if (this.categorySlug) {
        const cat = getCategoryData(this.categorySlug);
        this.similarHomes = cat?.properties.filter(p => p.id !== id).slice(0, 8) || [];
      }
      
      // Reset scroll to top on navigation
      window.scrollTo(0, 0);
    });
  }

  goBack() {
    this.location.back();
  }

  toggleSave() {
    this.isSaved = !this.isSaved;
  }

  openContactModal() {
    this.showContactModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeContactModal() {
    this.showContactModal = false;
    document.body.style.overflow = 'auto';
  }

  submitInquiry(event?: Event) {
    event?.preventDefault();
    if (!this.property) return;

    const message = (this.inquiryForm.message || '').trim();
    if (!message) {
      this.ui.showToast('error', 'Validation', 'Message is required.');
      return;
    }

    this.isSendingInquiry = true;
    this.inquiryService.createInquiry({
      propertyId: (this.property as any).id,
      message,
      name: this.inquiryForm.name,
      email: this.inquiryForm.email,
      phone: this.inquiryForm.phone
    }).subscribe({
      next: () => {
        this.isSendingInquiry = false;
        this.ui.showToast('success', 'Inquiry Sent', 'The seller has been notified.');
        this.closeContactModal();
        this.inquiryForm = { ...this.inquiryForm, message: `I'm interested in ${this.property?.address}.` };
      },
      error: () => {
        this.isSendingInquiry = false;
        this.ui.showToast('error', 'Send Failed', 'Could not send inquiry. Please try again.');
      }
    });
  }

  openShareModal() {
    this.showShareModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeShareModal() {
    this.showShareModal = false;
    document.body.style.overflow = 'auto';
  }

  formatCount(n: number): string {
    return n >= 1000 ? n.toLocaleString() : n.toString();
  }
}
