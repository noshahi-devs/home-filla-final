import { PropertyService } from '../../shared/services/property.service';
import { InquiryService } from '../../shared/services/inquiry.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { Inquiry } from '../../shared/models';

@Component({
  selector: 'app-seller-inquiries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inquiries.component.html',
  styleUrl: '../../admin/properties/properties.component.css'
})
export class SellerInquiriesComponent implements OnInit {
  inquiries: Inquiry[] = [];

  constructor(
    private propertyService: PropertyService, private inquiryService: InquiryService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    
    this.propertyService.getPropertiesBySeller(userId).subscribe(myProps => {
      this.inquiryService.getInquiries().subscribe(allInquiries => {
        this.inquiries = allInquiries.filter(i => myProps.some(p => p.id === i.propertyId));
      });
    });
  }
}
