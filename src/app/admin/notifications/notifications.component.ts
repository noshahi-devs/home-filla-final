import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../shared/services/mock-data.service';
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

  constructor(private dataService: MockDataService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notifications = this.dataService.getNotifications();
  }

  markAllRead() {
    this.dataService.markAllNotificationsRead();
    this.loadNotifications();
  }
}
