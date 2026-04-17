import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name = '';
  email = '';
  phone = '';
  countryCode = '+92'; // Default country code
  password = '';
  confirmPassword = '';
  role = 'buyer'; // Default role
  
  showPassword = false;
  showConfirmPassword = false;
  
  isLoading = false;
  errorMessage = '';
  isSelectorActive = false;

  countries = [
    { name: 'Afghanistan', code: 'af', dialCode: '+93' },
    { name: 'Albania', code: 'al', dialCode: '+355' },
    { name: 'Algeria', code: 'dz', dialCode: '+213' },
    { name: 'Andorra', code: 'ad', dialCode: '+376' },
    { name: 'Angola', code: 'ao', dialCode: '+244' },
    { name: 'Argentina', code: 'ar', dialCode: '+54' },
    { name: 'Australia', code: 'au', dialCode: '+61' },
    { name: 'Austria', code: 'at', dialCode: '+43' },
    { name: 'Azerbaijan', code: 'az', dialCode: '+994' },
    { name: 'Bahamas', code: 'bs', dialCode: '+1242' },
    { name: 'Bahrain', code: 'bh', dialCode: '+973' },
    { name: 'Bangladesh', code: 'bd', dialCode: '+880' },
    { name: 'Belgium', code: 'be', dialCode: '+32' },
    { name: 'Brazil', code: 'br', dialCode: '+55' },
    { name: 'Canada', code: 'ca', dialCode: '+1' },
    { name: 'China', code: 'cn', dialCode: '+86' },
    { name: 'Denmark', code: 'dk', dialCode: '+45' },
    { name: 'Egypt', code: 'eg', dialCode: '+20' },
    { name: 'France', code: 'fr', dialCode: '+33' },
    { name: 'Germany', code: 'de', dialCode: '+49' },
    { name: 'Greece', code: 'gr', dialCode: '+30' },
    { name: 'India', code: 'in', dialCode: '+91' },
    { name: 'Indonesia', code: 'id', dialCode: '+62' },
    { name: 'Italy', code: 'it', dialCode: '+39' },
    { name: 'Japan', code: 'jp', dialCode: '+81' },
    { name: 'Kuwait', code: 'kw', dialCode: '+965' },
    { name: 'Malaysia', code: 'my', dialCode: '+60' },
    { name: 'Mexico', code: 'mx', dialCode: '+52' },
    { name: 'Myanmar', code: 'mm', dialCode: '+95' },
    { name: 'Netherlands', code: 'nl', dialCode: '+31' },
    { name: 'New Zealand', code: 'nz', dialCode: '+64' },
    { name: 'Norway', code: 'no', dialCode: '+47' },
    { name: 'Oman', code: 'om', dialCode: '+968' },
    { name: 'Pakistan', code: 'pk', dialCode: '+92' },
    { name: 'Philippines', code: 'ph', dialCode: '+63' },
    { name: 'Portugal', code: 'pt', dialCode: '+351' },
    { name: 'Qatar', code: 'qa', dialCode: '+974' },
    { name: 'Russia', code: 'ru', dialCode: '+7' },
    { name: 'Saudi Arabia', code: 'sa', dialCode: '+966' },
    { name: 'Singapore', code: 'sg', dialCode: '+65' },
    { name: 'South Africa', code: 'za', dialCode: '+27' },
    { name: 'South Korea', code: 'kr', dialCode: '+82' },
    { name: 'Spain', code: 'es', dialCode: '+34' },
    { name: 'Sri Lanka', code: 'lk', dialCode: '+94' },
    { name: 'Sweden', code: 'se', dialCode: '+46' },
    { name: 'Switzerland', code: 'ch', dialCode: '+41' },
    { name: 'Thailand', code: 'th', dialCode: '+66' },
    { name: 'Turkey', code: 'tr', dialCode: '+90' },
    { name: 'United Arab Emirates', code: 'ae', dialCode: '+971' },
    { name: 'United Kingdom', code: 'gb', dialCode: '+44' },
    { name: 'United States', code: 'us', dialCode: '+1' },
    { name: 'Vietnam', code: 'vn', dialCode: '+84' },
    { name: 'Yemen', code: 'ye', dialCode: '+967' },
    { name: 'Zambia', code: 'zm', dialCode: '+260' },
    { name: 'Zimbabwe', code: 'zw', dialCode: '+263' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  getFlag(): string {
    const code = (this.countryCode || '').trim();
    const country = this.countries.find(c => c.dialCode === code);
    return country ? country.code : 'un'; 
  }

  onCountryCodeInput() {
    // Standardize input
    let val = this.countryCode || '';
    if (val && !val.startsWith('+') && /^\d/.test(val)) {
      this.countryCode = '+' + val;
    }
  }

  onPhoneInput() {
    if (this.phone && this.phone.startsWith('+')) {
      let matchedCode = '';
      // Sort countries by dialCode length descending to match longest code first (e.g. +971 vs +9)
      const sortedCountries = [...this.countries].sort((a, b) => b.dialCode.length - a.dialCode.length);
      
      for (const c of sortedCountries) {
        if (this.phone.startsWith(c.dialCode)) {
          matchedCode = c.dialCode;
          break;
        }
      }

      if (matchedCode) {
        this.countryCode = matchedCode;
        this.phone = this.phone.substring(matchedCode.length).trim();
      }
    }
  }

  register() {
    if (!this.name || !this.email || !this.phone || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const registerData = {
      name: this.name,
      email: this.email,
      phone: `${this.countryCode}${this.phone}`,
      password: this.password,
      role: this.role
    };

    this.authService.register(registerData).subscribe({
      next: (res) => {
        this.isLoading = false;
        // Store credentials temporarily for the login page
        this.authService.setTempCredentials({ email: this.email, password: this.password });
        // Redirect to Login page instead of logging in automatically
        this.router.navigate(['/login'], { queryParams: { registered: 'true', role: this.role } });
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
