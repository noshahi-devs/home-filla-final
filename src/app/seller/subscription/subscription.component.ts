import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubscriptionPlan, SubscriptionService } from '../../shared/services/subscription.service';
import { UiService } from '../../shared/services/ui.service';

@Component({
  selector: 'app-seller-subscription',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './subscription.component.html',
  styleUrl: '../my-properties/my-properties.component.css',
})
export class SellerSubscriptionComponent implements OnInit {
  isLoading = true;
  plans: SubscriptionPlan[] = [];
  my: any = null;

  constructor(private subs: SubscriptionService, private ui: UiService) {}

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.isLoading = true;
    this.subs.getPlans().subscribe({
      next: (plans) => {
        this.plans = plans;
        this.subs.getMySubscription().subscribe({
          next: (info) => {
            this.my = info;
            this.isLoading = false;
          },
          error: () => {
            this.isLoading = false;
          },
        });
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  upgrade(plan: SubscriptionPlan): void {
    this.ui.showToast('processing', 'Upgrading...', `Switching to ${plan.name}`, 900);
    this.subs.upgrade(plan.id).subscribe({
      next: (info) => {
        this.my = info;
        this.ui.showToast('success', 'Upgraded', `You are now on ${plan.name}.`);
      },
      error: (err) => {
        const msg = err?.error?.message || 'Upgrade failed.';
        this.ui.showToast('error', 'Upgrade Failed', msg);
      },
    });
  }

  isCurrent(plan: SubscriptionPlan): boolean {
    return !!this.my?.plan?.id && this.my.plan.id === plan.id;
  }
}

