import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../shared/services/mock-data.service';
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
    private dataService: MockDataService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    this.dataService.getInquiries().subscribe(inqs => {
      this.inquiries = inqs.filter(i => i.userId === userId);
    });
  }
}
