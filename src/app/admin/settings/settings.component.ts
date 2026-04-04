import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: '../properties/properties.component.css'
})
export class AdminSettingsComponent {
  settings = {
    websiteName: 'Home Filla',
    contactEmail: 'contact@homefilla.com',
    contactPhone: '+92 300 0000000',
    address: '123 Main Street, Lahore',
    facebook: 'https://facebook.com/homefilla',
    twitter: 'https://twitter.com/homefilla',
    instagram: 'https://instagram.com/homefilla'
  };

  saveSettings() {
    alert('Settings saved successfully!');
  }
}
