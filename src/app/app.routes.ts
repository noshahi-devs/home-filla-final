import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { ListingsComponent } from './public/listings/listings.component';
import { PropertyDetailComponent } from './public/property-detail/property-detail.component';
import { LoginComponent } from './public/login/login.component';
import { SignupComponent } from './public/signup/signup.component';
import { RentComponent } from './public/rent/rent';
import { SitemapComponent } from './public/sitemap/sitemap';
import { SellComponent } from './public/sell/sell.component';
import { MortgageComponent } from './public/mortgage/mortgage.component';
import { FindAgentComponent } from './public/find-agent/find-agent.component';
import { HomeLoanComponent } from './public/home-loan/home-loan';
import { MyHomeComponent } from './public/my-home/my-home.component';
import { SaleProceedsCalculatorComponent } from './public/sale-proceeds-calculator/sale-proceeds-calculator.component';
import { NewsInsightsComponent } from './public/news-insights/news-insights';
import { NewsCategoryComponent } from './public/news-category/news-category.component';
import { AboutAdvertiseComponent } from './public/about/advertise/advertise.component';
import { AccessibilityComponent } from './public/about/accessibility/accessibility.component';
import { CareersComponent } from './public/about/careers/careers';
import { AdvertiseComponent } from './public/advertise/advertise.component';
import { SitemapForSaleComponent } from './public/sitemap/sitemap-for-sale.component';
import { SitemapNewConstructionComponent } from './public/sitemap/sitemap-new-construction.component';
import { SitemapRecentlySoldComponent } from './public/sitemap/sitemap-recently-sold.component';
import { SitemapForeclosuresComponent } from './public/sitemap/sitemap-foreclosures.component';
import { SitemapMarketReportsComponent } from './public/sitemap/sitemap-market-reports.component';
import { MediaRoomComponent } from './public/about/media-room/media-room.component';
import { MediaSubscribeComponent } from './public/about/media-room/media-subscribe/media-subscribe.component';
import { HomemadeComponent } from './public/homemade/homemade.component';
import { TechBlogComponent } from './public/tech-blog/tech-blog.component';
import { AgentBlogComponent } from './public/agent-blog/agent-blog.component';
import { MediaSolutionsComponent } from './public/media-solutions/media-solutions.component';
import { HomeSellingGuideComponent } from './public/guide/home-selling-guide/home-selling-guide.component';

import { MarketingLoginComponent } from './public/marketing-login/marketing-login.component';
import { ContactComponent } from './public/contact/contact.component';
import { AboutComponent } from './public/about/about.component';
import { LeadershipComponent } from './public/about/leadership/leadership.component';
import { AwardsComponent } from './public/about/awards/awards.component';
import { BrandComponent } from './public/about/brands/brand.component';
import { InvestorsComponent } from './public/about/investors/investors.component';
import { NewsLivingComponent } from './public/news-living/news-living.component';
import { NewsResearchComponent } from './public/news-research/news-research.component';
import { ManageRentalsComponent } from './public/manage-rentals/manage-rentals.component';
import { GlobalAccessibilityComponent } from './public/accessibility/accessibility.component';
import { AdChoicesComponent } from './public/legal/ad-choices.component';
import { PrivacyPolicyComponent } from './public/legal/privacy-policy.component';
import { TermsOfUseComponent } from './public/legal/terms-of-use.component';
import { SellersMarketplaceComponent } from './public/sell/sellers-marketplace/sellers-marketplace.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'about/leadership', component: LeadershipComponent },
  { path: 'about/awards', component: AwardsComponent },
  { path: 'about/brands', component: BrandComponent },
  { path: 'about/investors', component: InvestorsComponent },
  { path: 'about/advertise', component: AboutAdvertiseComponent },
  { path: 'about/accessibility', component: AccessibilityComponent },
  { path: 'about/careers', component: CareersComponent },
  { path: 'about/media', component: MediaRoomComponent },
  { path: 'about/media/subscribe', component: MediaSubscribeComponent },
  { path: 'news', component: NewsInsightsComponent },
  { path: 'news/living', component: NewsLivingComponent },
  { path: 'news/research', component: NewsResearchComponent },
  { path: 'news/:category', component: NewsCategoryComponent },
  { path: 'homemade', component: HomemadeComponent },
  { path: 'tech-blog', component: TechBlogComponent },
  { path: 'agent-blog', component: AgentBlogComponent },
  { path: 'manage-rentals', component: ManageRentalsComponent },
  { path: 'accessibility', component: GlobalAccessibilityComponent },
  { path: 'ad-choices', component: AdChoicesComponent },
  { path: 'advertise', component: AdvertiseComponent },
  { path: 'media-solutions', component: MediaSolutionsComponent },
  { path: 'marketing/login', component: MarketingLoginComponent },
  { path: 'marketing/product/:id', loadComponent: () => import('./public/product-detail/product-detail.component').then(m => m.ProductDetailComponent) },
  { path: 'contact', component: ContactComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'terms', component: TermsOfUseComponent },
  { path: 'listings/rent', component: RentComponent },
  { path: 'listings/:category', component: ListingsComponent },
  { path: 'property/:category/:id', component: PropertyDetailComponent },
  { path: 'sell', component: SellComponent },
  { path: 'sell/sellers-marketplace', component: SellersMarketplaceComponent },
  { path: 'mortgages', component: MortgageComponent },
  { path: 'find-agent', component: FindAgentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'sitemap', component: SitemapComponent },
  { path: 'sitemap/for-sale', component: SitemapForSaleComponent },
  { path: 'sitemap/new-construction', component: SitemapNewConstructionComponent },
  { path: 'sitemap/recently-sold', component: SitemapRecentlySoldComponent },
  { path: 'sitemap/foreclosures', component: SitemapForeclosuresComponent },
  { path: 'sitemap/market-reports', component: SitemapMarketReportsComponent },
  { path: 'home-loan', component: HomeLoanComponent },
  { path: 'my-home', component: MyHomeComponent },
  { path: 'my-home/sale-proceeds-calculator', component: SaleProceedsCalculatorComponent },
  { path: 'guide/home-selling', component: HomeSellingGuideComponent },
  
  // Dashboards Lazy Loading
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  { 
    path: 'seller', 
    loadChildren: () => import('./seller/seller.routes').then(m => m.SELLER_ROUTES)
  },
  { 
    path: 'agent', 
    loadChildren: () => import('./agent/agent.routes').then(m => m.AGENT_ROUTES)
  },
  { 
    path: 'buyer', 
    loadChildren: () => import('./buyer/buyer.routes').then(m => m.BUYER_ROUTES)
  },

  { path: '**', redirectTo: '' }
];
