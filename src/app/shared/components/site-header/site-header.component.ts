import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent {
  isMobileMenuOpen = false;
  isBuyAccordionOpen = false;
  isRentAccordionOpen = false;
  isSellAccordionOpen = false;
  isMortgageAccordionOpen = false;
  isAgentAccordionOpen = false;
  isNewsAccordionOpen = false;
  
  showUserDropdown = false;

  public authService = inject(AuthService);
  private router = inject(Router);

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }

  toggleAccordion(menu: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (menu === 'buy') this.isBuyAccordionOpen = !this.isBuyAccordionOpen;
    if (menu === 'rent') this.isRentAccordionOpen = !this.isRentAccordionOpen;
    if (menu === 'sell') this.isSellAccordionOpen = !this.isSellAccordionOpen;
    if (menu === 'mortgage') this.isMortgageAccordionOpen = !this.isMortgageAccordionOpen;
    if (menu === 'agent') this.isAgentAccordionOpen = !this.isAgentAccordionOpen;
    if (menu === 'news') this.isNewsAccordionOpen = !this.isNewsAccordionOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  toggleUserDropdown(event: Event) {
    event.stopPropagation();
    this.showUserDropdown = !this.showUserDropdown;
  }

  logout() {
    this.authService.logout();
    this.showUserDropdown = false;
    this.router.navigate(['/login']);
  }

  @HostListener('document:click')
  closeDropdowns() {
    this.showUserDropdown = false;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeMobileMenu();
    this.showUserDropdown = false;
  }
}
