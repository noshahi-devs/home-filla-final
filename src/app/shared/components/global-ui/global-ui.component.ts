import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiService, Toast, ConfirmationRequest } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-global-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './global-ui.component.html',
  styleUrl: './global-ui.component.css'
})
export class GlobalUiComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  activeConfirmation: ConfirmationRequest | null = null;
  private subscriptions: Subscription = new Subscription();

  constructor(private uiService: UiService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.uiService.toast$.subscribe(toast => {
        this.toasts.push(toast);
        if (toast.timeout && toast.timeout > 0) {
          setTimeout(() => this.removeToast(toast.id), toast.timeout);
        }
      })
    );

    this.subscriptions.add(
      this.uiService.confirmation$.subscribe(req => {
        this.activeConfirmation = req;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  removeToast(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  handleConfirmation(result: boolean) {
    if (this.activeConfirmation) {
      this.activeConfirmation.resolve(result);
    }
  }
}
