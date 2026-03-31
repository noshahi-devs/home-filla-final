import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { ListingsComponent } from './public/listings/listings.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'listings/:category', component: ListingsComponent },
  { path: '**', redirectTo: '' }
];
