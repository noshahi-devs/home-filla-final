import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.html',
  styleUrl: './sitemap.css',
  standalone: true,
  imports: [RouterModule, SiteHeaderComponent, SiteFooterComponent]
})
export class SitemapComponent { }
