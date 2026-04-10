import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-mortgage-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mortgage-banner.html',
  styleUrl: './mortgage-banner.css'
})
export class MortgageBannerComponent implements OnInit {
  isVisible = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Hide banner on the home-loan page
      this.isVisible = !event.url.includes('home-loan');
    });

    // Check initial route
    this.isVisible = !this.router.url.includes('home-loan');
  }
}
