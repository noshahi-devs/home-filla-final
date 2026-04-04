import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-seller-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: '../../admin/properties/properties.component.css'
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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.profile.name = this.authService.getUserName();
    this.profile.avatar = this.authService.getUserAvatar();
    // mock some data
    this.profile.email = 'seller@example.com';
    this.profile.phone = '+92 300 0000000';
  }

  saveProfile() {
    alert('Profile updated successfully!');
  }
}
