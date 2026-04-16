import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';
import { NewsService, Article, EditorialSection } from '../../core/services/news.service';

@Component({
  selector: 'app-news-insights',
  standalone: true,
  imports: [CommonModule, RouterModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './news-insights.html',
  styleUrls: ['./news-insights.css']
})
export class NewsInsightsComponent implements OnInit {
  /* Content Properties - Now from Service */
  featuredArticle!: Article;
  latestNewsList: Article[] = [];
  newsQuote: any;
  researchExpert: any;
  marketUpdate: any;
  sponsoredContent: any[] = [];
  editorsPicks: Article[] = [];
  editorialSections: EditorialSection[] = [];
  navLinks: any[] = [];
  moreResearch: any[] = [];

  todayDate: string = '';
  isMobileMenuOpen = false;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.featuredArticle = this.newsService.featuredArticle;
    this.latestNewsList = this.newsService.latestNewsList;
    this.newsQuote = this.newsService.newsQuote;
    this.researchExpert = this.newsService.researchExpert;
    this.marketUpdate = this.newsService.marketUpdate;
    this.sponsoredContent = this.newsService.sponsoredContent;
    this.editorsPicks = this.newsService.editorsPicks;
    this.editorialSections = this.newsService.editorialSections;
    this.navLinks = this.newsService.navLinks;
    this.moreResearch = this.newsService.moreResearch;
    
    this.updateTodayDate();
  }

  updateTodayDate() {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.todayDate = new Date().toLocaleDateString('en-US', options).toUpperCase();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
    }
  }
}
