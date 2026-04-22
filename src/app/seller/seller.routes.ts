import { Routes } from '@angular/router';
import { SellerLayoutComponent } from './layout/seller-layout.component';
import { SellerDashboardComponent } from './dashboard/dashboard.component';
import { SellerMyPropertiesComponent } from './my-properties/my-properties.component';
import { SellerInquiriesComponent } from './inquiries/inquiries.component';
import { SellerProfileComponent } from './profile/profile.component';
import { SellerNotificationsComponent } from './notifications/notifications.component';
import { SellerAnalyticsComponent } from './analytics/analytics.component';
import { SellerSubscriptionComponent } from './subscription/subscription.component';
import { SellerChatComponent } from './chat/chat.component';

export const SELLER_ROUTES: Routes = [
  {
    path: '',
    component: SellerLayoutComponent,
    children: [
      { path: '', component: SellerDashboardComponent },
      { path: 'properties', component: SellerMyPropertiesComponent },
      { path: 'my-properties', redirectTo: 'properties', pathMatch: 'full' },
      { path: 'inquiries', component: SellerInquiriesComponent },
      { path: 'analytics', component: SellerAnalyticsComponent },
      { path: 'subscription', component: SellerSubscriptionComponent },
      { path: 'chat', component: SellerChatComponent },
      { path: 'profile', component: SellerProfileComponent },
      { path: 'notifications', component: SellerNotificationsComponent }
    ]
  }
];
