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
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  sidebarCollapsed = false;
  showNotifDropdown = false;
  showProfileDropdown = false;

  menuItems: MenuItem[] = [
    { icon: 'fa-th-large', label: 'Dashboard', route: '/admin' },
    { icon: 'fa-building', label: 'Properties', route: '/admin/properties' },
    { icon: 'fa-users', label: 'Users', route: '/admin/users' },
    { icon: 'fa-user-tie', label: 'Agents', route: '/admin/agents' },
    { icon: 'fa-map-marker-alt', label: 'Locations', route: '/admin/locations' },
    { icon: 'fa-tags', label: 'Categories', route: '/admin/categories' },
    { icon: 'fa-envelope-open-text', label: 'Inquiries', route: '/admin/inquiries' },
    { icon: 'fa-star', label: 'Featured', route: '/admin/featured' },
    { icon: 'fa-credit-card', label: 'Payments', route: '/admin/payments' },
    { icon: 'fa-bell', label: 'Notifications', route: '/admin/notifications' },
    { icon: 'fa-cog', label: 'Settings', route: '/admin/settings' },
  ];

  constructor(
    public dataService: MockDataService,
    public authService: AuthService,
    private router: Router
  ) {
    this.menuItems[6].badge = this.dataService.getInquiries().filter(i => i.status === 'new').length;
    this.menuItems[1].badge = this.dataService.getPropertiesByStatus('pending').length;
  }

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
    if (route === '/admin') {
      return this.router.url === '/admin';
    }
    return this.router.url.startsWith(route);
  }
}
