import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { UiService } from '../../shared/services/ui.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-seller-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: '../my-properties/my-properties.component.css'
})
export class SellerProfileComponent implements OnInit {
  profile = {
    name: '',
    email: '',
    phone: '',
    agency: '',
    about: '',
    avatar: ''
  };

  constructor(private authService: AuthService, private uiService: UiService, private users: UserService) {}

  ngOnInit() {
    this.users.getMe().subscribe({
      next: (me) => {
        this.profile.name = me.name;
        this.profile.email = me.email;
        this.profile.phone = me.phone || '';
        this.profile.agency = me.agencyName || '';
        this.profile.about = me.bio || '';
        this.profile.avatar = me.avatar || this.authService.getUserAvatar();
      },
      error: () => {
        // Fallback to local values if API is unavailable.
        this.profile.name = this.authService.getUserName();
        this.profile.avatar = this.authService.getUserAvatar();
      }
    });
  }

  saveProfile() {
    this.uiService.showToast('processing', 'Saving...', 'Updating profile settings', 800);
    this.users.updateMe({
      name: this.profile.name,
      phone: this.profile.phone,
      agencyName: this.profile.agency,
      bio: this.profile.about,
      avatar: this.profile.avatar
    }).subscribe({
      next: () => this.uiService.showToast('success', 'Profile Updated', 'Your profile details have been saved.'),
      error: () => this.uiService.showToast('error', 'Save Failed', 'Could not update your profile.')
    });
  }
}
