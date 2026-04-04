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
  selector: 'app-seller-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seller-layout.component.html',
  styleUrl: './seller-layout.component.css'
})
export class SellerLayoutComponent {
  sidebarCollapsed = false;
  showNotifDropdown = false;
  showProfileDropdown = false;

  menuItems: MenuItem[] = [
    { icon: 'fa-th-large', label: 'Dashboard', route: '/seller' },
    { icon: 'fa-building', label: 'My Properties', route: '/seller/my-properties' },
    { icon: 'fa-envelope-open-text', label: 'Inquiries', route: '/seller/inquiries' },
    { icon: 'fa-bell', label: 'Notifications', route: '/seller/notifications' },
    { icon: 'fa-user', label: 'My Profile', route: '/seller/profile' },
  ];

  constructor(
    public dataService: MockDataService,
    public authService: AuthService,
    private router: Router
  ) {
    const myProps = this.dataService.getPropertiesBySeller(this.authService.getUserId());
    this.menuItems[2].badge = this.dataService.getInquiries().filter(i => myProps.some(p => p.id === i.propertyId) && i.status === 'new').length;
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
    if (route === '/seller') {
      return this.router.url === '/seller';
    }
    return this.router.url.startsWith(route);
  }
}
