import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../shared/services/notification.service';
import { UiService } from '../../shared/services/ui.service';
import { AppNotification } from '../../shared/models';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-admin-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class AdminNotificationsComponent implements OnInit {
  private notificationService = inject(NotificationService);
  private uiService = inject(UiService);

  notifications$: Observable<AppNotification[]> = new Observable<AppNotification[]>();
  filter: 'all' | 'unread' = 'all';

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    if (this.filter === 'unread') {
      this.notifications$ = this.notificationService.getUnreadNotifications();
    } else {
      this.notifications$ = this.notificationService.getNotifications();
    }
  }

  setFilter(filter: 'all' | 'unread'): void {
    this.filter = filter;
    this.loadNotifications();
  }

  markAsRead(id: number): void {
    this.notificationService.markNotificationRead(id).pipe(take(1)).subscribe({
      next: () => {
        this.loadNotifications();
        this.uiService.showToast('success', 'Success', 'Notification marked as read');
      }
    });
  }

  markAllAsRead(): void {
    this.notificationService.markAllNotificationsRead().pipe(take(1)).subscribe({
      next: () => {
        this.loadNotifications();
        this.uiService.showToast('success', 'Success', 'All notifications marked as read');
      }
    });
  }

  getIconClass(icon: string | undefined): string {
    return icon || 'fas fa-bell';
  }

  getColorStyle(color: string | undefined): string {
    return color || '#4a6cf7';
  }
}
