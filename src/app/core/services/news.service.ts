import { Injectable } from '@angular/core';

export interface Article {
  category?: string;
  title: string;
  author: string;
  imageUrl?: string;
  excerpt?: string;
}

export interface EditorialSection {
  title: string;
  headerType: 'badge' | 'title';
  mainArticle: Article;
  sideArticles: Article[];
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  /* Featured Content */
  featuredArticle: Article = {
    title: "A Great Lakes Hidden Gem Steals the Luxury Spotlight",
    excerpt: "A surprising city made the Realtor.com March 2024 Pure Luxury List. It's Petoskey, MI, on the shores of Lake Michigan.",
    category: "TRENDS",
    author: "JULIE TAYLOR",
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80"
  };

  /* Left Column Feed */
  latestNewsList: Article[] = [
    { category: 'TRENDS', title: "Inside a Resort-Style Short-Term Rental Community but There's a Catch", author: 'JULIE TAYLOR', imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80' },
    { category: 'UNIQUE HOMES', title: 'Gilded Age Manse With Ties to Financier J.P. Morgan Lists for $4.9 Million', author: 'LARISSA RUNKLE', imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80' },
    { category: 'TRENDS', title: 'An AI Data Center Is Coming for Her Backyard—and Family Cemetery', author: 'ERIC GOLDSCHEIN', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80' },
    { category: 'UNIQUE HOMES', title: 'Tiny Home That Spans Less Than 1,000 Square Feet Lists for a Huge Price', author: 'KELLIE SPEED', imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=400&q=80' },
    { category: 'REAL ESTATE NEWS', title: 'Dated 1940s Cottages Are Transformed Into $4 Million "Micro-Compound"', author: 'KELLIE SPEED', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80' },
    { category: 'FIRST PERSON', title: "'I Lost Money Every Month Renting Out My House'", author: 'BROOKE MORTON', imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=400&q=80' }
  ];

  newsQuote = {
    text: "Location in these markets is very much intentional, and demand doesn't necessarily depend on proximity to a large economic hub.",
    author: "Anthony Smith",
    title: "Senior Economist"
  };

  /* Right Column / Research Extended */
  researchExpert = {
    name: "Danielle Hale",
    title: "Home Filla Chief Economist",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  };

  marketUpdate = {
    title: "Weekly Housing Market Update",
    imageUrl: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  };

  moreResearch: any[] = [];

  sponsoredContent = [
    { title: 'If You Had an Extra 100 Square Feet of Pure Joy, What Would It Be?', imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Upgrade Your Outdoor Living Space: 10 Trends for 2024', imageUrl: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
  ];

  /* Editor's Picks */
  editorsPicks: Article[] = [
    { category: 'BUY', title: "The Secret Street That Disney Owns in Suburban California", author: 'ERIC GOLDSCHEIN', imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { category: 'TRENDS', title: 'Chicago Renters Try To Buy Their Building in Test of New Tenants Rights Law', author: 'ALLAIRE CONTE', imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  ];

  /* Editorial Sections Data */
  editorialSections: EditorialSection[] = [
    {
      title: 'Trends',
      headerType: 'badge',
      mainArticle: {
        title: "Nantucket's Oceanfront Homes Are Sliding Into the Sea. The Locals Don't Care.",
        excerpt: "Homeowners spent millions trying to save bluff's-edge properties. Their clash with other residents now includes alleged vandalism.",
        category: "TRENDS",
        author: "THE WALL STREET JOURNAL",
        imageUrl: "https://images.unsplash.com/photo-1527030280862-64139fba04ca?auto=format&fit=crop&w=1200&q=80"
      },
      sideArticles: [
        { title: "Mortgage Applications Fall as Uncertainty Prices Buyers Out, Lenders Say", author: "ALLAIRE CONTE", imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" },
        { title: "New Jersey Just Topped the Nation in Home Price Growth-and It's Not Close", author: "NEW YORK POST", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "NYC Inventory Shrinks as Sellers Wait for Better Rates", author: "ERIC GOLDSCHEIN", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
        { title: "Why Suburbs Are Becoming as Expensive as Cities", author: "JULIE TAYLOR", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "The Rise of the 40-Year Mortgage: What You Need to Know", author: "FINANCE HUB", imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80" },
        { title: "Climate Change is Redrawing the Real Estate Map", author: "THE WSJ", imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80" }
      ]
    },
    {
      title: 'Real Estate News',
      headerType: 'title',
      mainArticle: {
        title: "Kansas Gov. Kelly Vetoes Property Tax Cap Bill, Pitches Own Solution",
        excerpt: "Kansas Gov. Laura Kelly vetoed a Republican property tax cap bill, calling it flawed, and proposed her own three-point relief plan instead.",
        category: "NEWS",
        author: "TRISTAN NAVERA",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
      },
      sideArticles: [
        { title: "Climate Change is Redrawing the Real Estate Map", author: "THE WSJ", imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80" },
        { title: "New Jersey Just Topped the Nation in Home Price Growth-and It's Not Close", author: "NEW YORK POST", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "Inventory Is Up. Prices Are Down-Wait, Really?", author: "JOEL BERNER", imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80" },
        { title: "NYC Inventory Shrinks as Sellers Wait for Better Rates", author: "ERIC GOLDSCHEIN", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
        { title: "Federal Reserve Holds Rates: Impact on Homebuyers", author: "ECONOMIST", imageUrl: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=600&q=80" },
        { title: "California's Insurance Crisis Deepens for Homeowners", author: "TRISTAN NAVERA", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" }
      ]
    },
    {
      title: 'Celebrity Real Estate',
      headerType: 'title',
      mainArticle: {
        title: "Hoda Kotb Will Take Another Break From Her Suburban Life for 'Today' Return",
        excerpt: "Kotb will rejoin her former colleagues on the air from April 13, when she will spend a week hosting alongside Savannah Guthrie.",
        category: "CELEBRITY",
        author: "KELSI KARRULI",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
      },
      sideArticles: [
       { title: "Mortgage Applications Fall as Uncertainty Prices Buyers Out, Lenders Say", author: "ALLAIRE CONTE", imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" },
        { title: "New Jersey Just Topped the Nation in Home Price Growth-and It's Not Close", author: "NEW YORK POST", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "NYC Inventory Shrinks as Sellers Wait for Better Rates", author: "ERIC GOLDSCHEIN", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
        { title: "Why Suburbs Are Becoming as Expensive as Cities", author: "JULIE TAYLOR", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "The Rise of the 40-Year Mortgage: What You Need to Know", author: "FINANCE HUB", imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80" },
        { title: "Climate Change is Redrawing the Real Estate Map", author: "THE WSJ", imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80" }
      ]
    },
    {
      title: 'Unique Homes',
      headerType: 'title',
      mainArticle: {
        title: "Unfinished Quonset Hut-Style Home in Maine Hits the Market for Under $300K",
        excerpt: "The property is located on an 11-acre parcel in Maine's lake region-and is awaiting a buyer with vision who can fulfill its potential.",
        category: "UNIQUE HOMES",
        author: "KELLIE SPEED",
        imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80"
      },
      sideArticles: [
        { title: "Mortgage Applications Fall as Uncertainty Prices Buyers Out, Lenders Say", author: "ALLAIRE CONTE", imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" },
        { title: "New Jersey Just Topped the Nation in Home Price Growth-and It's Not Close", author: "NEW YORK POST", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "NYC Inventory Shrinks as Sellers Wait for Better Rates", author: "ERIC GOLDSCHEIN", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
        { title: "Why Suburbs Are Becoming as Expensive as Cities", author: "JULIE TAYLOR", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "The Rise of the 40-Year Mortgage: What You Need to Know", author: "FINANCE HUB", imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80" },
        { title: "Climate Change is Redrawing the Real Estate Map", author: "THE WSJ", imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80" }
      ]
    },
    {
      title: 'Buy',
      headerType: 'title',
      mainArticle: {
        title: "How To Score a Mortgage Rate Under 6% Right Now",
        excerpt: "While rates are hovering in the high 6s, there are still ways to find a bargain if you know where to look.",
        category: "BUY",
        author: "SARAH J.",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
      },
      sideArticles: [
      { title: "Mortgage Applications Fall as Uncertainty Prices Buyers Out, Lenders Say", author: "ALLAIRE CONTE", imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" },
        { title: "New Jersey Just Topped the Nation in Home Price Growth-and It's Not Close", author: "NEW YORK POST", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "NYC Inventory Shrinks as Sellers Wait for Better Rates", author: "ERIC GOLDSCHEIN", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
        { title: "Why Suburbs Are Becoming as Expensive as Cities", author: "JULIE TAYLOR", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "The Rise of the 40-Year Mortgage: What You Need to Know", author: "FINANCE HUB", imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80" },
        { title: "Climate Change is Redrawing the Real Estate Map", author: "THE WSJ", imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80" }
        ]
    },
    {
      title: 'Sell',
      headerType: 'title',
      mainArticle: {
        title: "The One Renovation That Will Add $50K to Your Appraisal",
        excerpt: "Before you list your home, focus on this one specific area to maximize your return on investment.",
        category: "SELL",
        author: "MARK S.",
        imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
      },
      sideArticles: [
        { title: "Mortgage Applications Fall as Uncertainty Prices Buyers Out, Lenders Say", author: "ALLAIRE CONTE", imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" },
        { title: "New Jersey Just Topped the Nation in Home Price Growth-and It's Not Close", author: "NEW YORK POST", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "NYC Inventory Shrinks as Sellers Wait for Better Rates", author: "ERIC GOLDSCHEIN", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
        { title: "Why Suburbs Are Becoming as Expensive as Cities", author: "JULIE TAYLOR", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "The Rise of the 40-Year Mortgage: What You Need to Know", author: "FINANCE HUB", imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80" },
        { title: "Climate Change is Redrawing the Real Estate Map", author: "THE WSJ", imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80" }
      ]
    },
    {
      title: 'Rent',
      headerType: 'title',
      mainArticle: {
        title: "The Rise of 'Build-to-Rent' Communities: What You Need To Know",
        excerpt: "A new type of housing is taking over the suburbs, offering the perks of a house with the ease of an apartment.",
        category: "RENT",
        author: "ELENA V.",
        imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
      },
      sideArticles: [
        { title: "Mortgage Applications Fall as Uncertainty Prices Buyers Out, Lenders Say", author: "ALLAIRE CONTE", imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" },
        { title: "New Jersey Just Topped the Nation in Home Price Growth-and It's Not Close", author: "NEW YORK POST", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "NYC Inventory Shrinks as Sellers Wait for Better Rates", author: "ERIC GOLDSCHEIN", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
        { title: "Why Suburbs Are Becoming as Expensive as Cities", author: "JULIE TAYLOR", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "The Rise of the 40-Year Mortgage: What You Need to Know", author: "FINANCE HUB", imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80" },
        { title: "Climate Change is Redrawing the Real Estate Map", author: "THE WSJ", imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80" }
      ]
    },
    {
      title: 'Advice',
      headerType: 'title',
      mainArticle: {
        title: "Should You Buy a Home or Wait for Rates To Fall? Expert Advice",
        excerpt: "The 'wait and see' strategy might be costing you more than you think. Here's how to run the numbers.",
        category: "ADVICE",
        author: "ANTHONY SMITH",
        imageUrl: "https://images.unsplash.com/photo-1527030280862-64139fba04ca?auto=format&fit=crop&w=1200&q=80"
      },
      sideArticles: [
        { title: "Mortgage Applications Fall as Uncertainty Prices Buyers Out, Lenders Say", author: "ALLAIRE CONTE", imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" },
        { title: "New Jersey Just Topped the Nation in Home Price Growth-and It's Not Close", author: "NEW YORK POST", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "NYC Inventory Shrinks as Sellers Wait for Better Rates", author: "ERIC GOLDSCHEIN", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
        { title: "Why Suburbs Are Becoming as Expensive as Cities", author: "JULIE TAYLOR", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "The Rise of the 40-Year Mortgage: What You Need to Know", author: "FINANCE HUB", imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80" },
        { title: "Climate Change is Redrawing the Real Estate Map", author: "THE WSJ", imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80" }
      ]
    },
    {
      title: 'New Construction',
      headerType: 'title',
      mainArticle: {
        title: "The 2024 Homebuilding Outlook: More Inventory on the Way",
        excerpt: "Builders are responding to the shortage by ramping up production in these key regions.",
        category: "NEW CONSTRUCTION",
        author: "TRISTAN NAVERA",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
      },
      sideArticles: [
        { title: "Mortgage Applications Fall as Uncertainty Prices Buyers Out, Lenders Say", author: "ALLAIRE CONTE", imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" },
        { title: "New Jersey Just Topped the Nation in Home Price Growth-and It's Not Close", author: "NEW YORK POST", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "NYC Inventory Shrinks as Sellers Wait for Better Rates", author: "ERIC GOLDSCHEIN", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
        { title: "Why Suburbs Are Becoming as Expensive as Cities", author: "JULIE TAYLOR", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "The Rise of the 40-Year Mortgage: What You Need to Know", author: "FINANCE HUB", imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80" },
        { title: "Climate Change is Redrawing the Real Estate Map", author: "THE WSJ", imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80" }
      ]
    },
    {
      title: 'Guides',
      headerType: 'title',
      mainArticle: {
        title: "The Ultimate Moving Checklist: Stress-Free Relocation",
        excerpt: "From packing tips to utility transfers, our guide covers everything you need for a smooth move.",
        category: "GUIDES",
        author: "ELENA V.",
        imageUrl: "https://images.unsplash.com/photo-1527030280862-64139fba04ca?auto=format&fit=crop&w=1200&q=80"
      },
      sideArticles: [
        { title: "Mortgage Applications Fall as Uncertainty Prices Buyers Out, Lenders Say", author: "ALLAIRE CONTE", imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" },
        { title: "New Jersey Just Topped the Nation in Home Price Growth-and It's Not Close", author: "NEW YORK POST", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "NYC Inventory Shrinks as Sellers Wait for Better Rates", author: "ERIC GOLDSCHEIN", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
        { title: "Why Suburbs Are Becoming as Expensive as Cities", author: "JULIE TAYLOR", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "The Rise of the 40-Year Mortgage: What You Need to Know", author: "FINANCE HUB", imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80" },
        { title: "Climate Change is Redrawing the Real Estate Map", author: "THE WSJ", imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80" }
      ]
    },
    {
      title: 'Home Improvement',
      headerType: 'title',
      mainArticle: {
        title: "10 DIY Projects That Actually Increase Your Home's Value",
        excerpt: "You don't need a massive budget to boost your curb appeal and interior charm. Try these weekend projects.",
        category: "HOME IMPROVEMENT",
        author: "DESIGN TEAM",
        imageUrl: "https://images.unsplash.com/photo-1527030280862-64139fba04ca?auto=format&fit=crop&w=1200&q=80"
      },
      sideArticles: [
        { title: "Mortgage Applications Fall as Uncertainty Prices Buyers Out, Lenders Say", author: "ALLAIRE CONTE", imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" },
        { title: "New Jersey Just Topped the Nation in Home Price Growth-and It's Not Close", author: "NEW YORK POST", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "NYC Inventory Shrinks as Sellers Wait for Better Rates", author: "ERIC GOLDSCHEIN", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
        { title: "Why Suburbs Are Becoming as Expensive as Cities", author: "JULIE TAYLOR", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "The Rise of the 40-Year Mortgage: What You Need to Know", author: "FINANCE HUB", imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80" },
        { title: "Climate Change is Redrawing the Real Estate Map", author: "THE WSJ", imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80" }
      ]
    }
  ];

  /* Navigation Links */
  navLinks = [
    { name: 'LATEST', route: '/news', active: true },
    { 
      name: 'TRENDS', 
      route: '/news/trends',
      active: false, 
      hasDropdown: true,
      items: [
        { name: 'Real Estate News', route: '/news/real-estate-news' },
        { name: 'Housing Trends', route: '/news/trends' },
        { name: 'Celebrity Real Estate', route: '/news/celebrity-real-estate' },
        { name: 'Unique Homes', route: '/news/unique-homes' },
        { name: 'Reality TV', route: '#' },
        { name: 'Sports', route: '#' },
        { name: 'Most Expensive Homes', route: '#' },
        { name: 'Most Popular Homes', route: '#' }
      ]
    },
    { name: 'BUYING', route: '/news/buy', active: false },
    { name: 'SELLING', route: '/news/sell', active: false },
    { name: 'RENTING', route: '/news/rent', active: false },
    { 
      name: 'ADVICE', 
      route: '/news/advice',
      active: false, 
      hasDropdown: true,
      items: [
        { name: 'Buying Advice', route: '/news/advice' },
        { name: 'Selling Advice', route: '/news/advice' },
        { name: 'Renting Advice', route: '/news/advice' },
        { name: 'Financing', route: '#' },
        { name: 'Living', route: '#' },
        { name: 'Moving', route: '#' },
        { name: 'Home Improvement', route: '/news/home-improvement' }
      ]
    },
    { name: 'GUIDES', route: '/news/guides', active: false },
    { name: 'LIVING', route: '#', active: false },
    { name: 'RESEARCH', route: '#', active: false }
  ];

  constructor() {}

  getFeaturedArticle(): Article { return this.featuredArticle; }
  getLatestNews(): Article[] { return this.latestNewsList; }
  getEditorialSections(): EditorialSection[] { return this.editorialSections; }
  
  getSectionsByCategory(category: string): EditorialSection[] {
    // Basic filter logic: find a section whose title matches the path
    return this.editorialSections.filter(s => s.title.toLowerCase().replace(/ /g, '-') === category.toLowerCase());
  }

  getArticlesByCategory(category: string): Article[] {
    // Extract all articles belonging to a specific category slug
    const articles: Article[] = [];
    this.editorialSections.forEach(section => {
      const sectionSlug = section.title.toLowerCase().replace(/ /g, '-');
      if (sectionSlug === category) {
        articles.push(section.mainArticle, ...section.sideArticles);
      }
    });
    return articles;
  }
}
