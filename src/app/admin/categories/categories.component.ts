import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: '../locations/locations.component.css' // Reusing locations grid mostly
})
export class AdminCategoriesComponent {
  propertyTypes = [
    { id: 'house', label: 'House', count: 124 },
    { id: 'apartment', label: 'Apartment', count: 86 },
    { id: 'plot', label: 'Plot', count: 45 },
    { id: 'commercial', label: 'Commercial', count: 12 }
  ];

  purposes = [
    { id: 'sale', label: 'For Sale', count: 180 },
    { id: 'rent', label: 'For Rent', count: 87 }
  ];
}
