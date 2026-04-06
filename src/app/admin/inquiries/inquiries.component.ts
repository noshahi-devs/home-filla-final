import { InquiryService } from '../../shared/services/inquiry.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule, UpperCasePipe, TitleCasePipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Inquiry } from '../../shared/models';

@Component({
  selector: 'app-admin-inquiries',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inquiries.component.html',
  styleUrl: './inquiries.component.css'
})
export class AdminInquiriesComponent implements OnInit {
  inquiries: Inquiry[] = [];
  filteredInquiries: Inquiry[] = [];
  statusFilter = 'all';
  loading = true;
  selectedInquiry: Inquiry | null = null;

  constructor(private inquiryService: InquiryService) {}

  ngOnInit() {
    this.loadInquiries();
  }

  loadInquiries() {
    this.loading = true;
    this.inquiryService.getInquiries().subscribe({
      next: (inqs) => {
        this.inquiries = inqs;
        this.applyFilters();
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  applyFilters() {
    this.filteredInquiries = this.statusFilter === 'all'
      ? this.inquiries
      : this.inquiries.filter(i => i.status === this.statusFilter);
  }

  setFilter(status: string) {
    this.statusFilter = status;
    this.applyFilters();
  }

  getCount(status: string): number {
    return this.inquiries.filter(i => i.status === status).length;
  }

  openDetail(inq: Inquiry) {
    this.selectedInquiry = inq;
  }

  markResolved(id: number) {
    this.inquiryService.updateInquiryStatus(id, 'resolved').subscribe(() => {
      this.loadInquiries();
    });
  }

  markAssigned(id: number) {
    this.inquiryService.updateInquiryStatus(id, 'assigned').subscribe(() => {
      this.loadInquiries();
    });
  }
}
