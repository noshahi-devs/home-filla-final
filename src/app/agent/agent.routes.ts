import { Routes } from '@angular/router';
import { AgentLayoutComponent } from './layout/agent-layout.component';
import { AgentDashboardComponent } from './dashboard/dashboard.component';
import { AgentListingsComponent } from './my-listings/my-listings.component';
import { AgentLeadsComponent } from './leads/leads.component';
import { AgentProfileComponent } from './profile/profile.component';
import { AgentNotificationsComponent } from './notifications/notifications.component';

export const AGENT_ROUTES: Routes = [
  {
    path: '',
    component: AgentLayoutComponent,
    children: [
      { path: '', component: AgentDashboardComponent },
      { path: 'my-listings', component: AgentListingsComponent },
      { path: 'leads', component: AgentLeadsComponent },
      { path: 'profile', component: AgentProfileComponent },
      { path: 'notifications', component: AgentNotificationsComponent }
    ]
  }
];
