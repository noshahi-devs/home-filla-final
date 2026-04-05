import { NotificationService } from '../../shared/services/notification.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNotification } from '../../shared/models';

@Component({
  selector: 'app-admin-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: '../properties/properties.component.css'
})
export class AdminNotificationsComponent implements OnInit {
  notifications: AppNotification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe(notifs => {
      this.notifications = notifs;
    });
  }

  markAllRead() {
    this.notificationService.markAllNotificationsRead().subscribe(() => {
      this.loadNotifications();
    });
  }
}
