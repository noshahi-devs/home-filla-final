import { Routes } from '@angular/router';
import { BuyerLayoutComponent } from './layout/buyer-layout.component';
import { BuyerDashboardComponent } from './dashboard/dashboard.component';
import { BuyerSavedPropertiesComponent } from './saved-properties/saved-properties.component';
import { BuyerInquiriesComponent } from './inquiries/inquiries.component';
import { BuyerProfileComponent } from './profile/profile.component';
import { BuyerNotificationsComponent } from './notifications/notifications.component';

export const BUYER_ROUTES: Routes = [
  {
    path: '',
    component: BuyerLayoutComponent,
    children: [
      { path: '', component: BuyerDashboardComponent },
      { path: 'saved-properties', component: BuyerSavedPropertiesComponent },
      { path: 'inquiries', component: BuyerInquiriesComponent },
      { path: 'profile', component: BuyerProfileComponent },
      { path: 'notifications', component: BuyerNotificationsComponent }
    ]
  }
];
