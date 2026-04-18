import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-success-stories',
  standalone: true,
  imports: [CommonModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './success-stories.html',
  styleUrls: ['./success-stories.css'],
})
export class SuccessStoriesComponent {
  activeCategory: 'all' | 'buyers' | 'sellers' | 'renters' = 'all';

  categories = [
    { id: 'all', label: 'All Stories' },
    { id: 'buyers', label: 'Home Buyers' },
    { id: 'sellers', label: 'Home Sellers' },
    { id: 'renters', label: 'Renters' },
  ];

  stats = [
    { value: '50K+', label: 'Happy Clients' },
    { value: '$2.5B', label: 'In Sales Closed' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '15+', label: 'Years Experience' },
  ];

  stories = [
    {
      id: 1,
      name: 'Sarah & Michael Johnson',
      location: 'Sunnyvale, CA',
      category: 'buyers',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      quote: 'Home Filla helped us find our dream home in just 3 weeks! The agents were incredibly knowledgeable about the local market.',
      outcome: 'Purchased a 4-bedroom home for $1.2M',
      rating: 5,
    },
    {
      id: 2,
      name: 'David Chen',
      location: 'San Francisco, CA',
      category: 'sellers',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      quote: 'Sold my condo for 15% above asking price. The marketing strategy and professional photography made all the difference.',
      outcome: 'Sold condo for $950K (15% over asking)',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      location: 'San Jose, CA',
      category: 'renters',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      quote: 'Found the perfect rental apartment within my budget. The search filters made it so easy to find exactly what I needed.',
      outcome: 'Rented 2BR apartment for $2,800/mo',
      rating: 5,
    },
    {
      id: 4,
      name: 'Robert & Lisa Thompson',
      location: 'Palo Alto, CA',
      category: 'buyers',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      quote: 'As first-time homebuyers, we were nervous. Our agent walked us through every step and negotiated a great deal.',
      outcome: 'First home purchased for $1.8M',
      rating: 5,
    },
    {
      id: 5,
      name: 'Jennifer Park',
      location: 'Mountain View, CA',
      category: 'sellers',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      quote: 'Multiple offers within the first weekend! The team handled everything smoothly from listing to closing.',
      outcome: 'Sold in 5 days for $2.1M',
      rating: 5,
    },
    {
      id: 6,
      name: 'Ahmed Hassan',
      location: 'Cupertino, CA',
      category: 'renters',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      quote: 'Relocated from overseas and needed a rental fast. Found a great place near Apple campus within a week.',
      outcome: 'Secured rental near tech companies',
      rating: 5,
    },
  ];

  featuredStory = {
    name: 'The Martinez Family',
    location: 'Los Altos, CA',
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800',
    videoThumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    quote: 'We were looking for a family home with great schools and a big backyard. Home Filla not only found us the perfect house but also helped us negotiate during a competitive bidding war. Their expertise saved us $50,000!',
    outcome: 'Dream home purchased: 5BR/4BA for $2.4M',
    agent: 'Agent: Maria Santos',
    timeline: '3 months from search to closing',
  };

  get filteredStories() {
    if (this.activeCategory === 'all') {
      return this.stories;
    }
    return this.stories.filter((story) => story.category === this.activeCategory);
  }

  setCategory(category: 'all' | 'buyers' | 'sellers' | 'renters') {
    this.activeCategory = category;
  }
}
