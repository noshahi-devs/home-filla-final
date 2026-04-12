import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-home-loan',
  standalone: true,
  imports: [CommonModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './home-loan.html',
  styleUrl: './home-loan.css'
})
export class HomeLoanComponent {
  currentStep = 1;
  totalSteps = 4; // Property, Timeline, Details, Wrap-Up
  selectedLoanType = 'purchase';
  selectedHomeType = 'single';

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
