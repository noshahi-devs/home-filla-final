import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mortgage-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mortgage-banner.html',
  styleUrl: './mortgage-banner.css'
})
export class MortgageBannerComponent {
  // Always visible when rendered, as it's now placed locally on specific pages
  isVisible = true;
}
