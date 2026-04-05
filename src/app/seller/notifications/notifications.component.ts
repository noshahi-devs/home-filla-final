import { NotificationService } from '../../shared/services/notification.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe(notifs => {
      this.notifications = notifs.filter(n => n.type === 'property_approved' || n.type === 'property_rejected' || n.type === 'new_inquiry');
    });
  }

  markAllRead() {
    this.notificationService.markAllNotificationsRead().subscribe(() => {
      this.loadNotifications();
    });
  }
}
