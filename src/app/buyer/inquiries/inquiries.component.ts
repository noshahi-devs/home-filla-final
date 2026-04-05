import { InquiryService } from '../../shared/services/inquiry.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { Inquiry } from '../../shared/models';

@Component({
  selector: 'app-buyer-inquiries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inquiries.component.html',
  styleUrl: '../../admin/properties/properties.component.css'
})
export class BuyerInquiriesComponent implements OnInit {
  inquiries: Inquiry[] = [];

  constructor(
    private inquiryService: InquiryService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    this.inquiryService.getInquiries().subscribe(inqs => {
      this.inquiries = inqs.filter(i => i.userId === userId);
    });
  }
}
