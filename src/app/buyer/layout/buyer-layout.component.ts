import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MockDataService } from '../../shared/services/mock-data.service';
import { AuthService } from '../../shared/services/auth.service';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  badge?: number;
}

@Component({
  selector: 'app-buyer-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './buyer-layout.component.html',
  styleUrl: './buyer-layout.component.css'
})
export class BuyerLayoutComponent {
  sidebarCollapsed = false;
  showNotifDropdown = false;
  showProfileDropdown = false;

  menuItems: MenuItem[] = [
    { icon: 'fa-th-large', label: 'Dashboard', route: '/buyer' },
    { icon: 'fa-heart', label: 'Saved Properties', route: '/buyer/saved-properties' },
    { icon: 'fa-envelope-open-text', label: 'My Inquiries', route: '/buyer/inquiries' },
    { icon: 'fa-bell', label: 'Notifications', route: '/buyer/notifications' },
    { icon: 'fa-user', label: 'My Profile', route: '/buyer/profile' },
  ];

  constructor(
    public dataService: MockDataService,
    public authService: AuthService,
    private router: Router
  ) {}

  get unreadCount(): number {
    return this.dataService.getUnreadNotifications().length;
  }

  get recentNotifications() {
    return this.dataService.getNotifications().slice(0, 5);
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  toggleNotifications(): void {
    this.showNotifDropdown = !this.showNotifDropdown;
    this.showProfileDropdown = false;
  }

  toggleProfile(): void {
    this.showProfileDropdown = !this.showProfileDropdown;
    this.showNotifDropdown = false;
  }

  closeDropdowns(): void {
    this.showNotifDropdown = false;
    this.showProfileDropdown = false;
  }

  markAllRead(): void {
    this.dataService.markAllNotificationsRead();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isActive(route: string): boolean {
    if (route === '/buyer') {
      return this.router.url === '/buyer';
    }
    return this.router.url.startsWith(route);
  }
}
