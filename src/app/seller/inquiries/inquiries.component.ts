import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../shared/services/mock-data.service';
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
    private dataService: MockDataService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    const myProps = this.dataService.getPropertiesBySeller(userId);
    const allInquiries = this.dataService.getInquiries();
    
    // Filter inquiries only for my properties
    this.inquiries = allInquiries.filter(i => myProps.some(p => p.id === i.propertyId));
  }
}
