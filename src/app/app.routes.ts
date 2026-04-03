import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { ListingsComponent } from './public/listings/listings.component';
import { PropertyDetailComponent } from './public/property-detail/property-detail.component';
import { LoginComponent } from './public/login/login.component';
import { SignupComponent } from './public/signup/signup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'listings/:category', component: ListingsComponent },
  { path: 'property/:category/:id', component: PropertyDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '' }
];
