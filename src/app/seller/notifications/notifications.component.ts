import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../shared/services/mock-data.service';
import { AppNotification } from '../../shared/models';

@Component({
  selector: 'app-seller-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../../admin/notifications/notifications.component.html',
  styleUrl: '../../admin/properties/properties.component.css'
})
export class SellerNotificationsComponent implements OnInit {
  notifications: AppNotification[] = [];

  constructor(private dataService: MockDataService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    // Shared template handles rendering
    this.notifications = this.dataService.getNotifications().filter(n => n.type === 'property_approved' || n.type === 'property_rejected' || n.type === 'new_inquiry');
  }

  markAllRead() {
    this.notifications.forEach(n => n.isRead = true);
  }
}
