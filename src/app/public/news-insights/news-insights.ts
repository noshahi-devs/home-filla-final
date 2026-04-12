import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-news-insights',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './news-insights.html',
  styleUrls: ['./news-insights.css']
})
export class NewsInsightsComponent implements OnInit {
  categories = [
    { name: 'Latest', active: true },
    { name: 'Trends', active: false },
    { name: 'Buying', active: false },
    { name: 'Selling', active: false },
    { name: 'Renting', active: false },
    { name: 'Celebrity', active: false },
    { name: 'Advice', active: false },
    { name: 'Research', active: false }
  ];

  featuredArticle = {
    title: "The 2024 Market Shift: What Every Home Filla User Needs to Know",
    excerpt: "New data shows a significant cooling in major urban hubs, providing a unique window for first-time buyers with the right expert guidance.",
    category: "Market Trends",
    author: "Elena Vance",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
  };

  articles = [
    {
      title: "5 Hidden Costs of Selling Your Home in Today's Market",
      category: "Selling",
      author: "Mark S.",
      date: "Oct 24",
      imageUrl: "https://images.unsplash.com/photo-1572120339911-cf624ccf4648?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Inside the Smart Home Revolution: Beyond the Voice Assistant",
      category: "Technology",
      author: "Tech Desk",
      date: "Oct 23",
      imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "How to Win a Bidding War Without Overpaying",
      category: "Buying",
      author: "Sarah J.",
      date: "Oct 22",
      imageUrl: "https://images.unsplash.com/photo-1448630360428-654e6d65b674?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Modern Minimalist Interior Design: A 2024 Guide",
      category: "Living",
      author: "Design Team",
      date: "Oct 20",
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "The Ultimate First-Time Landlord Checklist",
      category: "Renting",
      author: "Elena V.",
      date: "Oct 18",
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Why Experts Say Mid-Sized Cities are the New Gold Mine",
      category: "Trends",
      author: "Research Hub",
      date: "Oct 15",
      imageUrl: "https://images.unsplash.com/photo-1449156059431-789955427ec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  trendingNow = [
    "Mortgage rate predictions for Q4",
    "Elon Musk's latest real estate move",
    "Best cities for remote workers in 2024",
    "How Fed changes affect your home equity"
  ];

  constructor() {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  setActiveCategory(category: any) {
    this.categories.forEach(c => c.active = (c === category));
  }
}
