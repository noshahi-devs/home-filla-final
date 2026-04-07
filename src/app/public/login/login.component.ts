import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
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
  email = '';
  password = '';
  showPassword = false;
  rememberMe = false;
  
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Check for temporary credentials from signup hand-off
    const temp = this.authService.getTempCredentials();
    if (temp) {
      this.email = temp.email;
      this.password = temp.password;
    }

    this.route.queryParams.subscribe(params => {
      // Fallback for email if not provided via hand-off
      if (params['email'] && !this.email) {
        this.email = params['email'];
      }
      
      if (params['registered'] === 'true') {
        const role = params['role'] || 'buyer';
        if (role === 'buyer' || role === 'seller') {
          this.successMessage = 'Registration successful! You can now log in.';
        } else {
          this.successMessage = 'Registration submitted! Once approved by an admin, you can log in.';
        }
      }
    });
  }

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        this.isLoading = false;
        // Map roles safely to frontend routes
        let targetRoute = res.role?.toLowerCase() || 'buyer';
        // Now using dedicated agent dashboard
        this.router.navigate([`/${targetRoute}`]);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Invalid credentials. Please try again.';
      }
    });
  }
}
