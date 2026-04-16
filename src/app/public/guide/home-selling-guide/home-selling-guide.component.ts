import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SiteHeaderComponent } from '../../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../../shared/components/site-footer/site-footer.component';
import { FormsModule } from '@angular/forms';
import { NewsService } from '../../../core/services/news.service';

interface GuideStep {
  id: number;
  imageUrl: string;
  title: string;
  category: string;
  description: string;
  tips: string[];
  timeframe: string;
}

@Component({
  selector: 'app-home-selling-guide',
  standalone: true,
  imports: [CommonModule, RouterModule, SiteHeaderComponent, SiteFooterComponent, FormsModule],
  templateUrl: './home-selling-guide.component.html',
  styleUrls: ['./home-selling-guide.component.css']
})
export class HomeSellingGuideComponent {
  searchQuery = '';
  activeFilter = 'All';
  selectedStep: GuideStep | null = null;

  navLinks: any[] = [];
  isMobileMenuOpen = false;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.navLinks = this.newsService.navLinks;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  categories = ['All', 'Preparation', 'Pricing', 'Marketing', 'Negotiation', 'Closing'];

  steps: GuideStep[] = [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80',
      title: 'Assess Your Home\'s Value',
      category: 'Pricing',
      description: 'Get a professional valuation or use a Comparative Market Analysis (CMA) to determine a competitive asking price based on recent sales in your neighborhood.',
      tips: ['Hire a licensed appraiser', 'Review recent comps in your zip code', 'Use Home Filla\'s instant estimate tool'],
      timeframe: '1–2 weeks before listing'
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=600&q=80',
      title: 'How to Get Your House Ready to Sell',
      category: 'Preparation',
      description: 'Address high-ROI repairs first — fix leaks, update lighting, refresh paint, and ensure HVAC, plumbing, and electrical are in top condition.',
      tips: ['Focus on kitchen and bathrooms', 'Fresh neutral paint boosts appeal', 'Fix broken windows and squeaky doors'],
      timeframe: '2–4 weeks before listing'
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?auto=format&fit=crop&w=600&q=80',
      title: 'Stage Your Home Professionally',
      category: 'Marketing',
      description: 'Staged homes sell 73% faster and for more money. Declutter every room, depersonalize, deep clean, and consider hiring a professional stager.',
      tips: ['Remove personal photos', 'Maximize natural light', 'Add fresh flowers and neutral decor'],
      timeframe: '1 week before listing'
    },
    {
      id: 4,
      imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      title: 'How to Find the Right Real Estate Agent',
      category: 'Marketing',
      description: 'Listings with professional photos receive 118% more online views. Invest in HDR photography, drone shots, and a 3D virtual walkthrough.',
      tips: ['Schedule during golden hour lighting', 'Include aerial drone footage', 'Create a Matterport 3D tour'],
      timeframe: '3–5 days before listing'
    },
    {
      id: 5,
      imageUrl: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=600&q=80',
      title: 'How Much Is My House Worth?',
      category: 'Pricing',
      description: 'Pricing strategy is everything. Overpricing leads to stale listings. Price at or slightly below market to generate competitive offers.',
      tips: ['Price in search-friendly brackets', 'Consider pre-listing inspections', 'Review days-on-market for comps'],
      timeframe: '1–2 days before listing'
    },
    {
      id: 6,
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      title: 'Real Estate Ad Ideas to Attract Buyers',
      category: 'Marketing',
      description: 'Go live on the MLS, Home Filla, Zillow, and social media simultaneously. Use targeted social ads, email campaigns, and open house events.',
      tips: ['Syndicate to 50+ portals', 'Host a broker preview first', 'Run targeted Facebook and Instagram ads'],
      timeframe: 'Day of listing'
    },
    {
      id: 7,
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
      title: 'Home Showing and Open House Advice',
      category: 'Negotiation',
      description: 'Don\'t just focus on price — evaluate contingencies, closing timelines, financing type, and earnest money. Counter strategically to maximize your net proceeds.',
      tips: ['Compare all offer terms holistically', 'Counter with a deadline to create urgency', 'Consider backup offers'],
      timeframe: '1–7 days after listing'
    },
    {
      id: 8,
      imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
      title: 'The Negotiation Process of Selling a Home',
      category: 'Negotiation',
      description: 'Buyers will inspect and appraise your home. Be prepared to negotiate repairs or price adjustments. A low appraisal can derail a deal.',
      tips: ['Be present for the inspection', 'Credit repairs rather than fixing them', 'Challenge low appraisals with data'],
      timeframe: '2–3 weeks after offer accepted'
    },
    {
      id: 9,
      imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80',
      title: 'You\'ve Got a Buyer! What Next?',
      category: 'Closing',
      description: 'Review all closing documents, coordinate with your attorney and title company, and understand all fees. You\'ll sign a mountain of paperwork on closing day.',
      tips: ['Review HUD-1 settlement statement', 'Confirm wire transfer details', 'Do a final walkthrough with buyer'],
      timeframe: '1–3 days before closing'
    },
    {
      id: 10,
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
      title: 'The Home Closing Process for Sellers',
      category: 'Closing',
      description: 'Sign the final paperwork, hand over keys, and receive your proceeds. Coordinate your move-out to align with the closing date and possession transfer.',
      tips: ['Schedule movers in advance', 'Leave the home broom-clean', 'Forward your mail and update your address'],
      timeframe: 'Closing day'
    }
  ];

  openStepDetail(step: GuideStep) {
    this.selectedStep = step;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeStepDetail() {
    this.selectedStep = null;
    document.body.style.overflow = 'auto';
  }

  get filteredSteps(): GuideStep[] {
    return this.steps.filter(step => {
      const matchesCategory = this.activeFilter === 'All' || step.category === this.activeFilter;
      const matchesSearch = this.searchQuery === '' ||
        step.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        step.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        step.category.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  setFilter(category: string) {
    this.activeFilter = category;
  }
}
