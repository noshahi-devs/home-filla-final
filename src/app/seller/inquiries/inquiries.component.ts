import { InquiryService } from '../../shared/services/inquiry.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inquiry } from '../../shared/models';
import { FormsModule } from '@angular/forms';
import { UiService } from '../../shared/services/ui.service';

@Component({
  selector: 'app-seller-inquiries',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inquiries.component.html',
  styleUrl: '../my-properties/my-properties.component.css'
})
export class SellerInquiriesComponent implements OnInit {
  inquiries: Inquiry[] = [];
  isReplyOpen = false;
  isSaving = false;
  selected: Inquiry | null = null;
  replyText = '';

  constructor(
    private inquiryService: InquiryService,
    private uiService: UiService
  ) {}

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.inquiryService.getMyInquiries().subscribe({
      next: (inqs) => (this.inquiries = inqs || []),
      error: () => this.uiService.showToast('error', 'Load Failed', 'Could not load inquiries.'),
    });
  }

  openReply(i: Inquiry): void {
    this.selected = i;
    this.replyText = `Hi ${i.userName},\n\nThanks for your interest in "${i.propertyTitle}".\n\n`;
    this.isReplyOpen = true;
  }

  closeReply(): void {
    this.isReplyOpen = false;
    this.selected = null;
    this.replyText = '';
  }

  sendReply(): void {
    if (!this.selected) return;
    const msg = this.replyText.trim();
    if (!msg) {
      this.uiService.showToast('error', 'Validation', 'Reply message is required.');
      return;
    }

    this.isSaving = true;
    this.inquiryService.respondToInquiry(this.selected.id, msg).subscribe({
      next: () => {
        this.uiService.showToast('success', 'Sent', 'Reply sent and inquiry marked as responded.');
        this.isSaving = false;
        this.closeReply();
        this.load();
      },
      error: () => {
        this.isSaving = false;
        this.uiService.showToast('error', 'Send Failed', 'Could not send reply.');
      },
    });
  }
}
