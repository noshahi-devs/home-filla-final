import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-agent-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SiteFooterComponent],
  templateUrl: './agent-blog.component.html',
  styleUrls: ['./agent-blog.component.css']
})
export class AgentBlogComponent implements OnInit, OnDestroy {
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

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
    document.body.classList.remove('no-scroll');
    document.documentElement.classList.remove('no-scroll');
  }

  posts = [
    {
      id: 1,
      title: 'How to Build a Powerful Personal Brand in 2026',
      author: 'David Miller',
      date: 'February 12, 2026',
      categories: ['Marketing', 'Brand'],
      excerpt: 'In today’s competitive market, your personal brand is your most valuable asset. Learn how to stand out from the crowd and attract your ideal clients...',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'Top 10 Tech Tools Every Modern Agent Needs',
      author: 'Sarah Chen',
      date: 'January 25, 2026',
      categories: ['Technology'],
      excerpt: 'From CRM automation to AI-powered virtual tours, these are the tools that are transforming the way real estate professionals work...',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'Closing the Deal: Negotiation Strategies for High-Stakes Luxury Sales',
      author: 'Robert Sterling',
      date: 'December 15, 2025',
      categories: ['Sales', 'Luxury'],
      excerpt: 'Luxury real estate requires a unique set of skills. Master the art of high-stakes negotiation with these proven strategies from industry leaders...',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'
    }
  ];

  popularTags = [
    'Marketing', 'Sales', 'Technology', 'Luxury', 'Branding', 'Lead Gen', 'Client Relations', 'Market Trends'
  ];

  categories = [
    'Marketing', 'Technology', 'Sales', 'Luxury', 'Success Stories', 'Agent Wellness'
  ];

  recentPosts = [
    'How to Build a Powerful Personal Brand',
    'Top 10 Tech Tools for Modern Agents',
    'Negotiation Strategies for Luxury Sales'
  ];
}
