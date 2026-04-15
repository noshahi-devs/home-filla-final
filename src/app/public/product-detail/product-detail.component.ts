import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId: string = '';
  product: any = null;

  private productsData: { [key: string]: any } = {
    'connections-plus': {
      name: 'Connections℠ Plus',
      heroTitle: 'Stop chasing leads — let motivated buyers come to you',
      heroSubtitle: 'Pre-screened, local buyer leads delivered directly to you with automated follow-up, so you spend less time prospecting and more time closing.',
      ctaText: 'Claim leads',
      formTitle: 'Get High-Intent Local Buyer Leads',
      bgImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
    },
    'market-vip': {
      name: 'Market VIP',
      heroTitle: 'Dominate your local market with exclusive branding',
      heroSubtitle: 'Be the first agent buyers see when they search in your area. exclusive visibility, premium branding, and top-tier lead generation.',
      ctaText: 'Check availability',
      formTitle: 'Secure Your Exclusive Market',
      bgImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.product = this.productsData[this.productId] || this.productsData['connections-plus'];
    });
  }
}
