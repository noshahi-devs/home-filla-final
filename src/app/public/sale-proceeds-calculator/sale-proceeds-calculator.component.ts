import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-sale-proceeds-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './sale-proceeds-calculator.component.html',
  styleUrls: ['./sale-proceeds-calculator.component.css']
})
export class SaleProceedsCalculatorComponent {
  homeValue: number = 500000;
  mortgageBalance: number = 200000;
  
  // Selling Costs
  agentCommissionRate: number = 6.0; // typical 6%
  repairCosts: number = 3000;
  closingCostsRate: number = 1.5; // e.g., transfer taxes, concessions

  get agentCommission(): number {
    return this.homeValue * (this.agentCommissionRate / 100);
  }

  get closingCosts(): number {
    return this.homeValue * (this.closingCostsRate / 100);
  }

  get totalSellingCosts(): number {
    return this.agentCommission + this.closingCosts + this.repairCosts;
  }

  get netProceeds(): number {
    return this.homeValue - this.mortgageBalance - this.totalSellingCosts;
  }
}
