import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
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

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeMobileMenu();
  }
}
