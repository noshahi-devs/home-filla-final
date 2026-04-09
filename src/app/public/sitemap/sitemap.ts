import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.html',
  styleUrl: './sitemap.css',
  standalone: true,
  imports: [RouterLink, SiteHeaderComponent]
})
export class SitemapComponent {}
