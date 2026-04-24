import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { UiService } from '../../shared/services/ui.service';

@Component({
  selector: 'app-buyer-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class BuyerSettingsComponent {
  public authService = inject(AuthService);
  private uiService = inject(UiService);

  settings = {
    notifications: {
      email: true,
      push: true,
      sms: false,
      newProperties: true,
      priceDrops: true,
      marketReports: false
    },
    privacy: {
      profilePublic: false,
      showActivity: true
    }
  };

  saveSettings() {
    this.uiService.showToast('processing', 'Saving...', 'Updating your preferences', 800);
    setTimeout(() => {
      this.uiService.showToast('success', 'Settings Saved', 'Your preferences have been updated successfully.');
    }, 800);
  }
}
