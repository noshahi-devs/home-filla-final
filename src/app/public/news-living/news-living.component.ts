import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';
import { NewsService } from '../../core/services/news.service';

@Component({
  selector: 'app-news-living',
  standalone: true,
  imports: [CommonModule, RouterModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './news-living.component.html',
  styleUrls: ['../news-insights/news-insights.css', './news-living.component.css']
})
export class NewsLivingComponent implements OnInit {
  navLinks: any[] = [];

  heroArticle = {
    title: 'Transform Your Home Into a Serene Sanctuary With These 2026 Design Trends',
    excerpt: 'From earthy palettes to biophilic design, interior designers share the looks that will define sophisticated living in 2026 and beyond.',
    category: 'Interior Design',
    author: 'ELENA V.',
    imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80'
  };

  showPopup = false;
  activeTopic = 'All Topics';

  featuredTopics = [
    { icon: '🛋️', label: 'Interior Design' },
    { icon: '🌿', label: 'Biophilic Living' },
    { icon: '🏡', label: 'Outdoor Spaces' },
    { icon: '🍳', label: 'Kitchen & Bath' },
    { icon: '💡', label: 'Smart Home' },
    { icon: '🎨', label: 'Color Trends' }
  ];

  _allSpotlightArticles = [
    {
      title: '10 Small Changes That Make Your Home Feel Instantly More Luxurious',
      excerpt: `You don't need a full renovation to elevate your living space. These surprisingly simple upgrades deliver outsized impact.`,
      category: 'Interior Design',
      author: 'ALLAIRE CONTE',
      imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
      readTime: '5 min read'
    },
    {
      title: 'The Outdoor Kitchen Trend Taking Over Suburban Backyards',
      excerpt: 'Homeowners are investing thousands in al fresco culinary setups—and real estate experts say it pays off at resale.',
      category: 'Outdoor Spaces',
      author: 'JULIE TAYLOR',
      imageUrl: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=800&q=80',
      readTime: '4 min read'
    },
    {
      title: 'How to Build a Home Office That Actually Boosts Productivity',
      excerpt: 'Remote work is here to stay. These evidence-backed design principles will help you create a space that works as hard as you do.',
      category: 'Smart Home',
      author: 'ERIC GOLDSCHEIN',
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      readTime: '6 min read'
    }
  ];
  spotlightArticles = [...this._allSpotlightArticles];

  _allTrendPosts = [
    {
      title: 'Biophilic Design: Bringing Nature Inside Your Home',
      category: 'Biophilic Living',
      author: 'DESIGN TEAM',
      imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: '2026 Color of the Year: Warm Neutrals Are Taking Over',
      category: 'Color Trends',
      author: 'KELLIE SPEED',
      imageUrl: 'https://images.unsplash.com/photo-1527030280862-64139fba04ca?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'The Rise of the "Curated Clutter" Aesthetic',
      category: 'Interior Design',
      author: 'LARISSA RUNKLE',
      imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Maximalist Kitchens Are Making a Bold Comeback',
      category: 'Kitchen & Bath',
      author: 'BROOKE MORTON',
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
    }
  ];
  trendPosts = [...this._allTrendPosts];

  expertTips = [
    { label: 'Layer your lighting — ambient, task, and accent — for a hotel-like feel.', expert: 'Emily Henderson, Interior Designer' },
    { label: 'Oversized art over your sofa instantly draws the eye and makes a room feel curated.', expert: 'Nate Berkus, Designer' },
    { label: 'A large rug anchors a living room — always size up, never down.', expert: 'Jeremiah Brent, Designer' }
  ];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.navLinks = this.newsService.navLinks.map(l => ({
      ...l,
      active: l.name === 'LIVING'
    }));
  }

  filterData(topic: string) {
    this.activeTopic = topic;
    if (topic === 'All Topics') {
      this.spotlightArticles = [...this._allSpotlightArticles];
      this.trendPosts = [...this._allTrendPosts];
    } else {
      this.spotlightArticles = this._allSpotlightArticles.filter(a => a.category === topic);
      this.trendPosts = this._allTrendPosts.filter(p => p.category === topic);
    }
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
}
