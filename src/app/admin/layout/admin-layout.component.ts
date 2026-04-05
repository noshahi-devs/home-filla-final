import { PropertyService } from '../../shared/services/property.service';
import { InquiryService } from '../../shared/services/inquiry.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
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

  unreadCount: number = 0;
  recentNotifications: any[] = [];

  constructor(
    private propertyService: PropertyService, private inquiryService: InquiryService, private notificationService: NotificationService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLayoutData();
  }

  loadLayoutData(): void {
    // Inquiries badge
    this.inquiryService.getInquiries().subscribe(inqs => {
      this.menuItems[6].badge = inqs.filter(i => i.status === 'new').length;
    });

    // Pending properties badge
    this.propertyService.getPropertiesByStatus('pending').subscribe(props => {
      this.menuItems[1].badge = props.length;
    });

    // Notifications
    this.notificationService.getUnreadNotifications().subscribe(notifs => {
      this.unreadCount = notifs.length;
    });

    this.notificationService.getNotifications().subscribe(notifs => {
      this.recentNotifications = notifs.slice(0, 5);
    });
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
    this.notificationService.markAllNotificationsRead().subscribe(() => {
      this.loadLayoutData();
    });
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
