import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';

@Component({
  selector: 'app-mortgage',
  standalone: true,
  templateUrl: './mortgage.component.html',
  styleUrl: './mortgage.component.css',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, SiteHeaderComponent]
})
export class MortgageComponent {
  // Mortgage Calculator State
  homePrice = 500000;
  downPaymentPercent = 20;
  loanTerm = 30;
  interestRate = 6.5;

  // Estimated constants
  propertyTaxRate = 1.2;
  homeInsurance = 1200;

  get downPaymentAmount(): number {
    return (this.homePrice * this.downPaymentPercent) / 100;
  }

  get loanAmount(): number {
    return this.homePrice - this.downPaymentAmount;
  }

  get principalAndInterest(): number {
    const p = this.loanAmount;
    const r = (this.interestRate / 100) / 12;
    const n = this.loanTerm * 12;

    if (r === 0) return p / n;
    
    // M = P [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]
    const numerator = r * Math.pow(1 + r, n);
    const denominator = Math.pow(1 + r, n) - 1;
    return p * (numerator / denominator);
  }

  get monthlyPropertyTax(): number {
    return (this.homePrice * (this.propertyTaxRate / 100)) / 12;
  }

  get monthlyHomeInsurance(): number {
    return this.homeInsurance / 12;
  }

  get totalMonthlyPayment(): number {
    return this.principalAndInterest + this.monthlyPropertyTax + this.monthlyHomeInsurance;
  }

}
