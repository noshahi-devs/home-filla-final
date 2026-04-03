import { AfterViewInit, Component, HostListener, ViewEncapsulation } from '@angular/core';
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
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape() { this.closeMobileMenu(); }

  ngAfterViewInit() {
    delete window.__homeFillaInit;
    setTimeout(() => {
      window.initHomeFillaPage?.();
    }, 0);
  }
}
