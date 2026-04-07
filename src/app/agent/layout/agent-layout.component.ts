import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { PropertyService } from '../../shared/services/property.service';
import { InquiryService } from '../../shared/services/inquiry.service';
import { NotificationService } from '../../shared/services/notification.service';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  badge?: number;
}

@Component({
  selector: 'app-agent-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './agent-layout.component.html',
  styleUrl: './agent-layout.component.css'
})
export class AgentLayoutComponent implements OnInit {
  sidebarCollapsed = false;
  showNotifDropdown = false;
  showProfileDropdown = false;
  currentYear = new Date().getFullYear();

  menuItems: MenuItem[] = [
    { icon: 'fa-th-large', label: 'Dashboard', route: '/agent' },
    { icon: 'fa-home', label: 'My Listings', route: '/agent/my-listings' },
    { icon: 'fa-users', label: 'Leads & Inquiries', route: '/agent/leads' },
    { icon: 'fa-bell', label: 'Notifications', route: '/agent/notifications' },
    { icon: 'fa-user-circle', label: 'Agent Profile', route: '/agent/profile' },
  ];

  unreadCount: number = 0;
  recentNotifications: any[] = [];

  constructor(
    private propertyService: PropertyService, 
    private inquiryService: InquiryService, 
    private notificationService: NotificationService,
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

    // Inquiries badge for agent's properties
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
    if (route === '/agent') {
      return this.router.url === '/agent';
    }
    return this.router.url.startsWith(route);
  }
}
