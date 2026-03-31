import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { ListingsComponent } from './public/listings/listings.component';
import { PropertyDetailComponent } from './public/property-detail/property-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'listings/:category', component: ListingsComponent },
  { path: 'property/:category/:id', component: PropertyDetailComponent },
  { path: '**', redirectTo: '' }
];
