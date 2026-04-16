import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SiteHeaderComponent } from '../../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../../shared/components/site-footer/site-footer.component';

interface RentArticle {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  imgUrl: string;
  readTimeMin: number;
}

@Component({
  selector: 'app-renters-resource',
  standalone: true,
  imports: [CommonModule, RouterModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './renters-resource.component.html',
  styleUrls: ['./renters-resource.component.css']
})
export class RentersResourceComponent {
  categories: string[] = ['All', 'Finding a Rental', 'Lease Advice', 'Renter Rights', 'Moving'];
  activeCategory: string = 'All';

  articles: RentArticle[] = [
    {
      id: 'a1',
      category: 'Finding a Rental',
      title: 'Top 10 Things to Check When Viewing an Apartment',
      excerpt: 'From water pressure to hidden pet fees, make sure you know what to look for when touring your next potential home.',
      imgUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      readTimeMin: 4
    },
    {
      id: 'a2',
      category: 'Lease Advice',
      title: 'How to Negotiate Your Lease Like a Pro',
      excerpt: 'Rent is rarely set in stone if you know the right levers to pull. Learn how to securely negotiate lease terms before signing.',
      imgUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
      readTimeMin: 6
    },
    {
      id: 'a3',
      category: 'Renter Rights',
      title: 'Understanding Security Deposits & Deductions',
      excerpt: 'Don\'t let landlords charge you for normal wear and tear. Here is the legal breakdown of what they can actually deduct.',
      imgUrl: 'https://images.unsplash.com/photo-1555529733-0e67056058e1?w=800&q=80',
      readTimeMin: 5
    },
    {
      id: 'a4',
      category: 'Moving',
      title: 'The Ultimate Renter\'s Moving Checklist',
      excerpt: 'A seamless move requires rigorous planning. Follow our 4-week structured checklist to ensure nothing is forgotten.',
      imgUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      readTimeMin: 8
    },
    {
      id: 'a5',
      category: 'Lease Advice',
      title: 'Breaking a Lease: What It Actually Costs',
      excerpt: 'Need to move out early? Understand the potential penalties and the correct legal strategy to minimize financial loss.',
      imgUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
      readTimeMin: 7
    },
    {
      id: 'a6',
      category: 'Finding a Rental',
      title: 'Red Flags on Rental Applications',
      excerpt: 'Identity theft scams and bait-and-switch listings are common. Arm yourself with knowledge of common apartment red flags.',
      imgUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
      readTimeMin: 3
    }
  ];

  setCategory(cat: string) {
    this.activeCategory = cat;
  }

  get filteredArticles(): RentArticle[] {
    if (this.activeCategory === 'All') {
      return this.articles;
    }
    return this.articles.filter(a => a.category === this.activeCategory);
  }
}
