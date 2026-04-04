import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { AdminPropertiesComponent } from './properties/properties.component';
import { AdminUsersComponent } from './users/users.component';
import { AdminAgentsComponent } from './agents/agents.component';
import { AdminLocationsComponent } from './locations/locations.component';
import { AdminCategoriesComponent } from './categories/categories.component';
import { AdminInquiriesComponent } from './inquiries/inquiries.component';
import { AdminFeaturedComponent } from './featured/featured.component';
import { AdminPaymentsComponent } from './payments/payments.component';
import { AdminNotificationsComponent } from './notifications/notifications.component';
import { AdminSettingsComponent } from './settings/settings.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'properties', component: AdminPropertiesComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'agents', component: AdminAgentsComponent },
      { path: 'locations', component: AdminLocationsComponent },
      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'inquiries', component: AdminInquiriesComponent },
      { path: 'featured', component: AdminFeaturedComponent },
      { path: 'payments', component: AdminPaymentsComponent },
      { path: 'notifications', component: AdminNotificationsComponent },
      { path: 'settings', component: AdminSettingsComponent }
    ]
  }
];
