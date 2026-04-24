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
  styleUrl: './profile.component.css'
})
export class BuyerProfileComponent implements OnInit {
  activeTab = 'personal';
  
  profile = {
    name: '',
    email: '',
    phone: '',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    address: 'Gulberg III, Lahore, Pakistan',
    bio: 'Looking for a 3-bedroom apartment in a peaceful neighborhood with modern amenities.'
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
