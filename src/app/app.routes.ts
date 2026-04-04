import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { ListingsComponent } from './public/listings/listings.component';
import { PropertyDetailComponent } from './public/property-detail/property-detail.component';
import { LoginComponent } from './public/login/login.component';
import { SignupComponent } from './public/signup/signup.component';
import { RentComponent } from './public/rent/rent';
import { SellComponent } from './public/sell/sell.component';
import { MortgageComponent } from './public/mortgage/mortgage.component';
import { FindAgentComponent } from './public/find-agent/find-agent.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'listings/rent', component: RentComponent },
  { path: 'listings/:category', component: ListingsComponent },
  { path: 'property/:category/:id', component: PropertyDetailComponent },
  { path: 'sell', component: SellComponent },
  { path: 'mortgages', component: MortgageComponent },
  { path: 'find-agent', component: FindAgentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  
  // Dashboards Lazy Loading
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  { 
    path: 'seller', 
    loadChildren: () => import('./seller/seller.routes').then(m => m.SELLER_ROUTES)
  },
  { 
    path: 'buyer', 
    loadChildren: () => import('./buyer/buyer.routes').then(m => m.BUYER_ROUTES)
  },

  { path: '**', redirectTo: '' }
];
