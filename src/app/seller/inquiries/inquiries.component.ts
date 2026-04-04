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
    
    this.dataService.getPropertiesBySeller(userId).subscribe(myProps => {
      this.dataService.getInquiries().subscribe(allInquiries => {
        this.inquiries = allInquiries.filter(i => myProps.some(p => p.id === i.propertyId));
      });
    });
  }
}
