import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

declare global {
  interface Window {
    initHomeFillaPage?: () => void;
    __homeFillaInit?: boolean;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [RouterLink, SiteHeaderComponent, SiteFooterComponent],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit() {
    delete window.__homeFillaInit;
    setTimeout(() => {
      window.initHomeFillaPage?.();
    }, 0);
  }
}
