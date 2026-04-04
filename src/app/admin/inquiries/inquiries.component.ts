import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../shared/services/mock-data.service';
import { Inquiry } from '../../shared/models';

@Component({
  selector: 'app-admin-inquiries',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inquiries.component.html',
  styleUrl: '../properties/properties.component.css'
})
export class AdminInquiriesComponent implements OnInit {
  inquiries: Inquiry[] = [];
  filteredInquiries: Inquiry[] = [];
  statusFilter: string = 'all';

  constructor(private dataService: MockDataService) {}

  ngOnInit() {
    this.loadInquiries();
  }

  loadInquiries() {
    this.inquiries = this.dataService.getInquiries();
    this.applyFilters();
  }

  applyFilters() {
    if (this.statusFilter === 'all') {
      this.filteredInquiries = this.inquiries;
    } else {
      this.filteredInquiries = this.inquiries.filter(i => i.status === this.statusFilter);
    }
  }

  setFilter(status: string) {
    this.statusFilter = status;
    this.applyFilters();
  }

  markResolved(id: number) {
    this.dataService.updateInquiryStatus(id, 'resolved');
    this.loadInquiries();
  }
}
