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
    const userId = this.authService.getUserId();
    
    // Notifications
    this.notificationService.getUnreadNotifications().subscribe(notifs => {
      this.unreadCount = notifs.length;
    });

    this.notificationService.getNotifications().subscribe(notifs => {
      this.recentNotifications = notifs.slice(0, 5);
    });

    // Inquiries badge for seller's properties
    this.propertyService.getPropertiesBySeller(userId).subscribe(myProps => {
      this.inquiryService.getInquiries().subscribe(inqs => {
        this.menuItems[2].badge = inqs.filter(i => 
          myProps.some(p => p.id === i.propertyId) && i.status === 'new'
        ).length;
      });
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
    if (route === '/seller') {
      return this.router.url === '/seller';
    }
    return this.router.url.startsWith(route);
  }
}
