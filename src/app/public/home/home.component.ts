import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';
import { FormsModule } from '@angular/forms';

declare global {
  interface Window {
    initHomeFillaPage?: () => void;
    __homeFillaInit?: boolean;
    switchDiscoverTab?: (tab: string) => void;
    openCalculator?: (type: string) => void;
    calculateMortgage?: () => void;
    calculateAffordability?: () => void;
    calculateRentVsBuy?: () => void;
    switchCalc?: (tab: string) => void;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SiteHeaderComponent, SiteFooterComponent],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements AfterViewInit {
  locationSearch: string = 'Sunnyvale, CA';

  constructor(private router: Router) {}

  onSearch(query?: string) {
    const q = query || this.locationSearch;
    if (!q) return;

    let location = q;
    let state = '';
    if (q.includes(',')) {
      const parts = q.split(',');
      location = parts[0].trim();
      state = parts[1].trim();
    }

    this.router.navigate(['/listings', 'homes-for-sale'], {
      queryParams: { location, state }
    });
  }
  ngAfterViewInit() {
    delete window.__homeFillaInit;
    setTimeout(() => {
      window.initHomeFillaPage?.();
    }, 0);
  }
}
