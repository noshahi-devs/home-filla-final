import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { UserRole } from '../../shared/models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  selectedRole: UserRole = 'admin';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    // Basic mock user IDs for roles
    let userId = 1; // Admin
    if (this.selectedRole === 'seller') userId = 2; // Ali Hassan
    if (this.selectedRole === 'buyer') userId = 6;  // Ahmed Raza
    
    this.authService.setRole(this.selectedRole, userId);
    this.router.navigate([`/${this.selectedRole}`]);
  }
}
