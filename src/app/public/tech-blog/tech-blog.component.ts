import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-tech-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SiteFooterComponent],
  templateUrl: './tech-blog.component.html',
  styleUrls: ['./tech-blog.component.css']
})
export class TechBlogComponent implements OnInit, OnDestroy {
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
      title: 'Meet the AI Champions Driving RealInnovation at Home Filla',
      author: 'Sneha Rajen',
      date: 'January 30, 2026',
      categories: ['Engineering', 'Product'],
      tags: ['AI', 'AgenticAI', 'WorkflowAutomation'],
      excerpt: 'AI is alive at Home Filla, shaping how we build, learn, and innovate every day. It’s helping us turn data into insights and explore new ways to support our agents and consumers. This work is driven by RealInnovation, a core company value...',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'Search How You’d Say It: Building AI-Powered Search at Home Filla',
      author: 'Austin Spaeth, Matt Holihan',
      date: 'November 21, 2025',
      categories: ['Engineering'],
      tags: ['Natural Language Search', 'NLP', 'System Architecture'],
      excerpt: 'What if finding a home online felt less like filling out a form and more like having a conversation with your Realtor? That’s the question we asked ourselves when we set out to transform search on Home Filla...',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'How Home Filla’s End-to-End Validation Powers Personalized Recommendations',
      author: 'Michelle Sanchez',
      date: 'October 31, 2025',
      categories: ['Engineering'],
      tags: ['Data Quality', 'Validation', 'ETL Pipelines'],
      excerpt: 'For the Personalization team, operating at scale means delivering property recommendations that are accurate, relevant, and reliable. Our daily challenge involves architecting complex, high-throughput data pipelines...',
      image: 'https://images.unsplash.com/photo-1551288049-bbda6462674a?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 4,
      title: 'Fueling Smarter Home Decisions: Bringing Commute Costs to the Listing Page',
      author: 'Jim Rome',
      date: 'October 15, 2025',
      categories: ['Engineering', 'Product'],
      tags: ['Commute Costs', 'Consumer Insights', 'Data Integration'],
      excerpt: 'One of the most significant ongoing costs – the daily commute – is often overlooked until after move-in day. We’ve added fuel price estimates for both gas and EV owners directly to listing pages...',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800'
    }
  ];

  popularTags = [
    'AI', 'AWS', 'Design', 'Technology', 'Personalization', 'Product', 'Machine Learning', 'Engineering', 'Architecture'
  ];

  categories = [
    'Engineering', 'Product', 'Design', 'Data Science', 'Career', 'User Experience'
  ];

  recentPosts = [
    'Meet the AI Champions Driving RealInnovation',
    'Building AI-Powered Search',
    'End-to-End Validation Powers Recommendations',
    'Bringing Commute Costs to Listing Pages'
  ];
}
