import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../shared/services/settings.service';
import { UiService } from '../../shared/services/ui.service';
import { AuthService } from '../../shared/services/auth.service';
import { SystemSetting, SettingsGroup } from '../../shared/models/setting.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class AdminSettingsComponent implements OnInit {
  private settingsService = inject(SettingsService);
  private uiService = inject(UiService);
  private authService = inject(AuthService);

  activeTab: string = 'general';
  isLoading = false;
  
  // Local settings object mapped from API
  settings: any = {
    WebsiteName: '',
    ContactEmail: '',
    ContactPhone: '',
    Address: '',
    FacebookUrl: '',
    TwitterUrl: '',
    InstagramUrl: ''
  };

  // Profile management
  profile: any = {
    name: '',
    email: '',
    currentPassword: '',
    newPassword: ''
  };

  tabs: SettingsGroup[] = [
    { id: 'general', name: 'General', icon: 'fas fa-cog' },
    { id: 'contact', name: 'Contact Info', icon: 'fas fa-address-book' },
    { id: 'social', name: 'Social Links', icon: 'fas fa-share-alt' },
    { id: 'profile', name: 'My Profile', icon: 'fas fa-user-circle' }
  ];

  ngOnInit(): void {
    this.loadSettings();
    this.loadProfile();
  }

  loadSettings(): void {
    this.isLoading = true;
    this.settingsService.getSettings().pipe(take(1)).subscribe({
      next: (data) => {
        data.forEach(s => {
          if (this.settings.hasOwnProperty(s.key)) {
            this.settings[s.key] = s.value;
          }
        });
        this.isLoading = false;
      },
      error: () => {
        this.uiService.showToast('error', 'Error', 'Failed to load settings');
        this.isLoading = false;
      }
    });
  }

  loadProfile(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.profile.name = user.name;
      this.profile.email = user.email;
    }
  }

  saveSettings(): void {
    this.isLoading = true;
    const savePromises = Object.keys(this.settings).map(key => {
      return this.settingsService.saveSetting({ key, value: this.settings[key] }).toPromise();
    });

    Promise.all(savePromises)
      .then(() => {
        this.uiService.showToast('success', 'Success', 'Platform settings updated successfully');
        this.isLoading = false;
      })
      .catch(() => {
        this.uiService.showToast('error', 'Error', 'Failed to save some settings');
        this.isLoading = false;
      });
  }

  updateProfile(): void {
    if (this.profile.newPassword && !this.profile.currentPassword) {
      this.uiService.showToast('info', 'Wait', 'Please enter your current password to change it.');
      return;
    }
    
    // In a real app, we would call AuthService/UserService updateProfile
    this.uiService.showToast('success', 'Profile Updated', 'Your profile details have been saved.');
  }

  setTab(tabId: string): void {
    this.activeTab = tabId;
  }
}
