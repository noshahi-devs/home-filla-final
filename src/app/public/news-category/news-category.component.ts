import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NewsService, Article } from '../../core/services/news.service';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-news-category',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SiteFooterComponent],
  templateUrl: './news-category.component.html',
  styleUrls: ['../news-insights/news-insights.css', './news-category.component.css']
})
export class NewsCategoryComponent implements OnInit {
  categorySlug: string = '';
  categoryTitle: string = '';
  allArticles: Article[] = [];
  filteredArticles: Article[] = [];
  popularArticles: Article[] = [];
  navLinks: any[] = [];

  // Filter State
  searchTerm: string = '';
  sortBy: string = 'relevance';
  selectedTags: Set<string> = new Set();
  selectedYears: Set<string> = new Set();
  miles: number | null = null;
  zipCode: string = '';
  titlesOnly: boolean = false;

  // Filter Options (Mock data for UI)
  availableTags = ['Homebuying', 'Updates', 'First-Time Home Buyer', 'Video', 'Home Inspections', 'Mortgage', 'Design'];
  availableYears = ['2024', '2023', '2022', '2021', '2020'];
  availableStates = ['California', 'New York', 'Florida', 'Texas', 'Arizona'];

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.navLinks = this.newsService.navLinks;
    
    this.route.params.subscribe(params => {
      this.categorySlug = params['category'];
      this.categoryTitle = this.categorySlug.replace(/-/g, ' ').toUpperCase();
      this.allArticles = this.newsService.getArticlesByCategory(this.categorySlug);
      this.popularArticles = this.newsService.getPopularArticles(this.categorySlug);
      
      this.applyFilters();

      // Update active state in navLinks
      this.navLinks.forEach(link => {
        link.active = link.route === `/news/${this.categorySlug}`;
      });

      // Scroll to top on route change
      window.scrollTo(0, 0);
    });
  }

  applyFilters() {
    let result = [...this.allArticles];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(a => 
        a.title.toLowerCase().includes(term) || 
        a.excerpt?.toLowerCase().includes(term)
      );
    }

    // Sort logic (Mock relevance for now)
    if (this.sortBy === 'newest') {
      // result.sort(...)
    }

    this.filteredArticles = result;
  }

  toggleTag(tag: string) {
    if (this.selectedTags.has(tag)) this.selectedTags.delete(tag);
    else this.selectedTags.add(tag);
    this.applyFilters();
  }

  toggleYear(year: string) {
    if (this.selectedYears.has(year)) this.selectedYears.delete(year);
    else this.selectedYears.add(year);
    this.applyFilters();
  }

  onSearchChange() {
    this.applyFilters();
  }

  onSortChange() {
    this.applyFilters();
  }

  resetFilters() {
    this.searchTerm = '';
    this.sortBy = 'relevance';
    this.selectedTags.clear();
    this.selectedYears.clear();
    this.miles = null;
    this.zipCode = '';
    this.titlesOnly = false;
    this.applyFilters();
  }
}
