import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-homemade',
  templateUrl: './homemade.component.html',
  styleUrl: './homemade.component.css',
  standalone: true,
  imports: [CommonModule, RouterLink, SiteFooterComponent],
  encapsulation: ViewEncapsulation.None
})
export class HomemadeComponent implements OnInit {
  isMobileMenuOpen = false;

  toggleMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.updateBodyScroll();
  }

  closeMenu() {
    this.isMobileMenuOpen = false;
    this.updateBodyScroll();
  }

  private updateBodyScroll() {
    if (this.isMobileMenuOpen) {
      document.body.classList.add('no-scroll');
      document.documentElement.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    }
  }

  ngOnDestroy() {
    document.body.classList.remove('no-scroll');
    document.documentElement.classList.remove('no-scroll');
  }

  articles = [
    {
      id: 1,
      title: 'Navigating the "Pre-Search" Phase with the Realtor.com App in ChatGPT',
      category: 'Innovation',
      excerpt: 'Discover how we\'re revolutionizing the home search experience with AI-powered insights and conversational interfaces.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      date: 'Oct 24, 2023'
    },
    {
      id: 2,
      title: 'Sellers Deserve Clicks, Not Cliques: Why Maximum Exposure Wins',
      category: 'Market Trends',
      excerpt: 'In a competitive market, reach is everything. Here is why broad exposure is the key to selling success and beating the competition.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
      date: 'Oct 22, 2023'
    },
    {
      id: 3,
      title: 'Building for the Future: Our Commitment to Sustainable Homeownership',
      category: 'Company News',
      excerpt: 'Sustainability is at the core of our long-term vision for the real estate industry, focusing on green building and efficiency.',
      image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800',
      date: 'Oct 18, 2023'
    },
    {
      id: 4,
      title: 'The Evolution of Home: Adapting to Modern Living Needs',
      category: 'Design',
      excerpt: 'How the concept of "home" has changed and what it means for the next generation of buyers looking for flexibility.',
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800',
      date: 'Oct 15, 2023'
    },
    {
      id: 5,
      title: 'Data-Driven Decisions: How Analytics are Shaping Real Estate',
      category: 'Technology',
      excerpt: 'Leveraging big data to provide accurate valuations and market forecasts for buyers and sellers alike.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      date: 'Oct 12, 2023'
    },
    {
      id: 6,
      title: 'Community First: Strengthening Neighborhood Bond Through Tech',
      category: 'Giving Back',
      excerpt: 'Our latest initiatives to support local communities and promote inclusive homeownership opportunities.',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800',
      date: 'Oct 10, 2023'
    }
  ];

  categories = [
    'Company News',
    'Leadership Perspectives',
    'Innovation',
    'Knowledge Center',
    'Real Stories'
  ];

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
