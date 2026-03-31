import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  imports: [RouterLink, RouterLinkActive],
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
