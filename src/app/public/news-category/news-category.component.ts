import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NewsService, Article } from '../../core/services/news.service';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-news-category',
  standalone: true,
  imports: [CommonModule, RouterModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './news-category.component.html',
  styleUrls: ['../news-insights/news-insights.css', './news-category.component.css']
})
export class NewsCategoryComponent implements OnInit {
  categorySlug: string = '';
  categoryTitle: string = '';
  articles: Article[] = [];
  popularArticles: Article[] = [];
  navLinks: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.navLinks = this.newsService.navLinks;
    
    this.route.params.subscribe(params => {
      this.categorySlug = params['category'];
      this.categoryTitle = this.categorySlug.replace(/-/g, ' ').toUpperCase();
      this.articles = this.newsService.getArticlesByCategory(this.categorySlug);
      this.popularArticles = this.newsService.getPopularArticles(this.categorySlug);
      
      // Update active state in navLinks
      this.navLinks.forEach(link => {
        link.active = link.route === `/news/${this.categorySlug}`;
      });

      // Scroll to top on route change
      window.scrollTo(0, 0);
    });
  }
}
