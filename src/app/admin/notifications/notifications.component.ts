import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  loading = false;
  notifications: AppNotification[] = [];

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.loading = true;
    this.notificationService.getAdminActivity().pipe(take(1)).subscribe({
      next: (notifs) => {
        this.notifications = notifs;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
        this.uiService.showToast('error', 'Error', 'Failed to load activities');
      }
    });
  }

  markAsRead(id: number): void {
    this.notificationService.markNotificationRead(id).pipe(take(1)).subscribe({
      next: () => {
        this.loadNotifications();
        this.uiService.showToast('success', 'Clear', 'Activity marked as read');
      }
    });
  }

  markAllAsRead(): void {
    // For admin, we call the same read-all but with userId=0 context handled in backend
    this.notificationService.markAllNotificationsRead().pipe(take(1)).subscribe({
      next: () => {
        this.loadNotifications();
        this.uiService.showToast('success', 'All Clear', 'All platform activities cleared');
      }
    });
  }

  getIconClass(icon: string | undefined): string {
    return icon && icon.startsWith('fa-') ? `fas ${icon}` : 'fas fa-bell';
  }

  getTypeLabel(type: string): string {
    return type.replace('_', ' ').toUpperCase();
  }
}
