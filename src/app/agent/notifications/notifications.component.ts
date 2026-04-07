import { NotificationService } from '../../shared/services/notification.service';
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNotification } from '../../shared/models';
import { Observable, take } from 'rxjs';
import { UiService } from '../../shared/services/ui.service';

@Component({
  selector: 'app-agent-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../../shared/notifications/notifications.shared.html',
  styleUrl: '../../shared/notifications/notifications.shared.css'
})
export class AgentNotificationsComponent implements OnInit {
  private notificationService = inject(NotificationService);
  private uiService = inject(UiService);
  private cdr = inject(ChangeDetectorRef);

  notifications$: Observable<AppNotification[]> = new Observable<AppNotification[]>();
  filter: 'all' | 'unread' = 'all';

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications().pipe(take(1)).subscribe({
      next: (notifs) => {
        this.notifications$ = new Observable(s => s.next(notifs));
        this.cdr.detectChanges();
      }
    });
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
    return icon && icon.startsWith('fa-') ? `fas ${icon}` : 'fas fa-bell';
  }

  getColorStyle(color: string | undefined): string {
    return color || '#4a6cf7';
  }
}
