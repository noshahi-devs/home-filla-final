import { Routes } from '@angular/router';
import { SellerLayoutComponent } from './layout/seller-layout.component';
import { SellerDashboardComponent } from './dashboard/dashboard.component';
import { SellerMyPropertiesComponent } from './my-properties/my-properties.component';
import { SellerInquiriesComponent } from './inquiries/inquiries.component';
import { SellerProfileComponent } from './profile/profile.component';
import { SellerNotificationsComponent } from './notifications/notifications.component';

export const SELLER_ROUTES: Routes = [
  {
    path: '',
    component: SellerLayoutComponent,
    children: [
      { path: '', component: SellerDashboardComponent },
      { path: 'my-properties', component: SellerMyPropertiesComponent },
      { path: 'inquiries', component: SellerInquiriesComponent },
      { path: 'profile', component: SellerProfileComponent },
      { path: 'notifications', component: SellerNotificationsComponent }
    ]
  }
];
