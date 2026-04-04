import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { UiService } from '../../shared/services/ui.service';

@Component({
  selector: 'app-buyer-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: '../../admin/properties/properties.component.css'
})
export class BuyerProfileComponent implements OnInit {
  profile = {
    name: '',
    email: '',
    phone: '',
    avatar: ''
  };

  constructor(private authService: AuthService, private uiService: UiService) {}

  ngOnInit() {
    this.profile.name = this.authService.getUserName();
    this.profile.avatar = this.authService.getUserAvatar();
    this.profile.email = 'buyer@homefilla.com';
    this.profile.phone = '+92 300 0000000';
  }

  saveProfile() {
    this.uiService.showToast('processing', 'Saving...', 'Updating profile settings', 800);
    setTimeout(() => {
      this.uiService.showToast('success', 'Profile Updated', 'Your buyer profile details have been saved.');
    }, 800);
  }
}
