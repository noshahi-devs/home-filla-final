import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-news-insights',
  standalone: true,
  imports: [CommonModule, RouterModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './news-insights.html',
  styleUrls: ['./news-insights.css']
})
export class NewsInsightsComponent implements OnInit {
  /* Featured Content */
  featuredArticle = {
    title: "A Great Lakes Hidden Gem Steals the Luxury Spotlight",
    excerpt: "A surprising city made the Realtor.com March 2024 Pure Luxury List. It's Petoskey, MI, on the shores of Lake Michigan.",
    category: "TRENDS",
    author: "JULIE TAYLOR",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
  };

  /* Left Column Feed */
  latestNewsList = [
    { category: 'TRENDS', title: "Inside a Resort-Style Short-Term Rental Community but There's a Catch", author: 'JULIE TAYLOR', imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80' },
    { category: 'UNIQUE HOMES', title: 'Gilded Age Manse With Ties to Financier J.P. Morgan Lists for $4.9 Million', author: 'LARISSA RUNKLE', imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80' },
    { category: 'TRENDS', title: 'An AI Data Center Is Coming for Her Backyard—and Family Cemetery', author: 'ERIC GOLDSCHEIN', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80' },
    { category: 'UNIQUE HOMES', title: 'Tiny Home That Spans Less Than 1,000 Square Feet Lists for a Huge Price', author: 'KELLIE SPEED', imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=400&q=80' },
    { category: 'REAL ESTATE NEWS', title: 'Dated 1940s Cottages Are Transformed Into $4 Million "Micro-Compound"', author: 'KELLIE SPEED', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80' },
    { category: 'FIRST PERSON', title: "'I Lost Money Every Month Renting Out My House'", author: 'BROOKE MORTON', imageUrl: 'https://images.unsplash.com/photo-1449156059431-789955427ec6?auto=format&fit=crop&w=400&q=80' }
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
  editorsPicks = [
    { category: 'BUY', title: "The Secret Street That Disney Owns in Suburban California", author: 'ERIC GOLDSCHEIN', imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { category: 'TRENDS', title: 'Chicago Renters Try To Buy Their Building in Test of New Tenants Rights Law', author: 'ALLAIRE CONTE', imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  ];  /* Editorial Sections Data */
  editorialSections = [
    {
      title: 'Trends',
      headerType: 'badge',
      mainArticle: {
        title: "Nantucket's Oceanfront Homes Are Sliding Into the Sea. The Locals Don't Care.",
        excerpt: "Homeowners spent millions trying to save bluff's-edge properties. Their clash with other residents now includes alleged vandalism.",
        category: "TRENDS",
        author: "THE WALL STREET JOURNAL",
        imageUrl: "https://images.unsplash.com/photo-1541829070764-84a7d30dee62?auto=format&fit=crop&w=1200&q=80"
      },
      sideArticles: [
        { title: "Mortgage Applications Fall as Uncertainty Prices Buyers Out, Lenders Say", author: "ALLAIRE CONTE", imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" },
        { title: "New Jersey Just Topped the Nation in Home Price Growth-and It's Not Close", author: "NEW YORK POST", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "NYC Inventory Shrinks as Sellers Wait for Better Rates", author: "ERIC GOLDSCHEIN", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
        { title: "Why Suburbs Are Becoming as Expensive as Cities", author: "JULIE TAYLOR", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "The Rise of the 40-Year Mortgage: What You Need to Know", author: "FINANCE HUB", imageUrl: "https://images.unsplash.com/photo-1554224155-16974a4ea2c5?auto=format&fit=crop&w=600&q=80" },
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
        { title: "The Solution to the Housing Crisis That Nobody Has Fixed Yet", author: "TRISTAN NAVERA", imageUrl: "https://images.unsplash.com/photo-1460317442991-0ec239397148?auto=format&fit=crop&w=600&q=80" },
        { title: "Idaho Passes Laws To Boost Starter Home Neighborhoods", author: "TRISTAN NAVERA", imageUrl: "https://images.unsplash.com/photo-1513584684031-43d1bcaf853c?auto=format&fit=crop&w=600&q=80" },
        { title: "Inventory Is Up. Prices Are Down-Wait, Really?", author: "JOEL BERNER", imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80" },
        { title: "New York’s New Rent Laws: A Comprehensive Guide", author: "LEGAL DESK", imageUrl: "https://images.unsplash.com/photo-1449156059431-789955427ec6?auto=format&fit=crop&w=600&q=80" },
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
        imageUrl: "https://images.unsplash.com/photo-1512918766775-d56aebb309f9?auto=format&fit=crop&w=1200&q=80"
      },
      sideArticles: [
        { title: "Pink Snaps Up $21.5 Million New York Townhouse After Quitting California", author: "KELSI KARRULI", imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80" },
        { title: "Mariah Carey Lists Iconic 'MTV Cribs' Penthouse for $27 Million", author: "CHARLIE LANKSTON", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "Sam Altman's $65 Million San Francisco Mansion Targeted by Molotov Cocktail", author: "RESEARCH HUB", imageUrl: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=600&q=80" },
        { title: "Taylor Swift and Travis Kelce's 'Save the Date' Reveals New Wedding Venue", author: "KELSI KARRULI", imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80" },
        { title: "Bryan Cranston Reveals His Mom Lost Home to Foreclosure After Divorce", author: "PEOPLE", imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80" },
        { title: "TikTok Stars Savannah and Cole LaBrant Get Set To Relist $5.4M Mansion", author: "RESEARCH HUB", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" }
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
        { title: "Rare 1800s Beacon Hill Condo Steps From the Statehouse Lists for Under $9M", author: "JULIE GERSTEIN", imageUrl: "https://images.unsplash.com/photo-1513584684031-43d1bcaf853c?auto=format&fit=crop&w=600&q=80" },
        { title: "Breakfast in Brentwood: Audrey Hepburn's L.A. Rental Finds a Buyer", author: "MANSION GLOBAL", imageUrl: "https://images.unsplash.com/photo-1449156059431-789955427ec6?auto=format&fit=crop&w=600&q=80" },
        { title: "Former Trader Joe's 'Two-Buck Chuck' Founders' Estate Lists for $10M", author: "KELLIE SPEED", imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80" },
        { title: "A Midcentury Modern Masterpiece in the Heart of the Desert", author: "DESIGN LAB", imageUrl: "https://images.unsplash.com/photo-1513584684031-43d1bcaf853c?auto=format&fit=crop&w=600&q=80" },
        { title: "The 'Invisible House' in Joshua Tree Could Be Yours for $18M", author: "MANSION GLOBAL", imageUrl: "https://images.unsplash.com/photo-1513584684031-43d1bcaf853c?auto=format&fit=crop&w=600&q=80" },
        { title: "This Abandoned Church Was Transformed into a Luxury Villa", author: "UNIQUE HOMES", imageUrl: "https://images.unsplash.com/photo-1513584684031-43d1bcaf853c?auto=format&fit=crop&w=600&q=80" }
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
        imageUrl: "https://images.unsplash.com/photo-1460317442991-0ec239397148?auto=format&fit=crop&w=1200&q=80"
      },
      sideArticles: [
        { title: "5 Cities Where It's Still Cheaper To Buy Than Rent", author: "RESEARCH HUB", imageUrl: "https://images.unsplash.com/photo-1448630360428-654e6d65b674?auto=format&fit=crop&w=600&q=80" },
        { title: "The Best Time To Buy a Home in 2024 Just Arrived", author: "SARAH J.", imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80" },
        { title: "How Much Down Payment Do You Really Need?", author: "FINANCE HUB", imageUrl: "https://images.unsplash.com/photo-1554224155-16974a4ea2c5?auto=format&fit=crop&w=600&q=80" },
        { title: "Is Your Credit Score Ready for a Home Loan?", author: "SARAH J.", imageUrl: "https://images.unsplash.com/photo-1554224155-16974a4ea2c5?auto=format&fit=crop&w=600&q=80" },
        { title: "The Pros and Cons of an Adjustable-Rate Mortgage", author: "ECONOMIST", imageUrl: "https://images.unsplash.com/photo-1554224155-16974a4ea2c5?auto=format&fit=crop&w=600&q=80" },
        { title: "How to Win a Bidding War Without Overpaying", author: "ADVICE HUB", imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" }
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
        { title: "Is Your Agent Doing Enough? 5 Red Flags To Watch For", author: "MARK S.", imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80" },
        { title: "Why Sellers Are Finally Lowering Their Prices This Spring", author: "DANIELLE HALE", imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80" },
        { title: "The Best Time of Year to Sell Your Home Fast", author: "MARK S.", imageUrl: "https://images.unsplash.com/photo-1581578731522-745a05ad9ad5?auto=format&fit=crop&w=600&q=80" },
        { title: "How to Stage Your Home Like a Professional", author: "DESIGN TEAM", imageUrl: "https://images.unsplash.com/photo-1581578731522-745a05ad9ad5?auto=format&fit=crop&w=600&q=80" },
        { title: "Capital Gains Tax: What Sellers Need to Know", author: "LEGAL DESK", imageUrl: "https://images.unsplash.com/photo-1554224155-16974a4ea2c5?auto=format&fit=crop&w=600&q=80" },
        { title: "Mistakes to Avoid When Selling Your Inherited Property", author: "ADVICE HUB", imageUrl: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=600&q=80" }
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
        { title: "10 Cities Where Rents Are Dropping the Fastest", author: "ELENA V.", imageUrl: "https://images.unsplash.com/photo-1449156059431-789955427ec6?auto=format&fit=crop&w=600&q=80" },
        { title: "Is It Time To Break Your Lease? How To Calculate the Cost", author: "SARAH J.", imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80" },
        { title: "The Renter’s Guide to Negotiating Your Lease", author: "ELENA V.", imageUrl: "https://images.unsplash.com/photo-1449156059431-789955427ec6?auto=format&fit=crop&w=600&q=80" },
        { title: "Should You Get Renter's Insurance? (Yes, Here's Why)", author: "ADVICE HUB", imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da977535?auto=format&fit=crop&w=600&q=80" },
        { title: "How to Furnish Your Apartment on a Student Budget", author: "DESIGN TEAM", imageUrl: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=600&q=80" },
        { title: "The Best Apps for Finding Your Next Rental", author: "TECH DESK", imageUrl: "https://images.unsplash.com/photo-1558227815-f50eff31e355?auto=format&fit=crop&w=600&q=80" }
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
        imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da977535?auto=format&fit=crop&w=1200&q=80"
      },
      sideArticles: [
        { title: "The First-Homebuyer's Guide to Closing Costs", author: "ANTHONY SMITH", imageUrl: "https://images.unsplash.com/photo-1554224155-16974a4ea2c5?auto=format&fit=crop&w=600&q=80" },
        { title: "How Much House Can You Actually Afford in 2024?", author: "RESEARCH HUB", imageUrl: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=600&q=80" },
        { title: "Understanding the Appraisal Process: A Seller's Guide", author: "ANTHONY SMITH", imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80" },
        { title: "What to Look for During a Final Walkthrough", author: "ADVICE HUB", imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" },
        { title: "How to Deal with Difficult Neighbors", author: "ELENA V.", imageUrl: "https://images.unsplash.com/photo-1449156059431-789955427ec6?auto=format&fit=crop&w=600&q=80" },
        { title: "The Tax Benefits of Owning a Second Home", author: "ECONOMIST", imageUrl: "https://images.unsplash.com/photo-1558227815-f50eff31e355?auto=format&fit=crop&w=600&q=80" }
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
        imageUrl: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&w=1200&q=80"
      },
      sideArticles: [
        { title: "Why Custom Homes Are Becoming More Affordable", author: "DESIGN TEAM", imageUrl: "https://images.unsplash.com/photo-1513584684031-43d1bcaf853c?auto=format&fit=crop&w=600&q=80" },
        { title: "5 Trends Shaping the Future of Green Building", author: "TECH DESK", imageUrl: "https://images.unsplash.com/photo-1518005020251-58296d8fca02?auto=format&fit=crop&w=600&q=80" },
        { title: "The Risks and Rewards of Buying a Model Home", author: "TRISTAN NAVERA", imageUrl: "https://images.unsplash.com/photo-1513584684031-43d1bcaf853c?auto=format&fit=crop&w=600&q=80" },
        { title: "How to Finance Your New Build Project", author: "FINANCE HUB", imageUrl: "https://images.unsplash.com/photo-1554224155-16974a4ea2c5?auto=format&fit=crop&w=600&q=80" },
        { title: "Smart Home Tech to Install During Construction", author: "TECH DESK", imageUrl: "https://images.unsplash.com/photo-1558227815-f50eff31e355?auto=format&fit=crop&w=600&q=80" },
        { title: "Understanding the Builder’s Warranty", author: "LEGAL DESK", imageUrl: "https://images.unsplash.com/photo-1513584684031-43d1bcaf853c?auto=format&fit=crop&w=600&q=80" }
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
        { title: "How To Choose the Perfect Neighborhood for Your Family", author: "RESEARCH HUB", imageUrl: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=600&q=80" },
        { title: "A First-Timer's Guide to Property Taxes", author: "SARAH J.", imageUrl: "https://images.unsplash.com/photo-1558227815-f50eff31e355?auto=format&fit=crop&w=600&q=80" },
        { title: "Tips for Moving Long Distance with Pets", author: "ELENA V.", imageUrl: "https://images.unsplash.com/photo-1449156059431-789955427ec6?auto=format&fit=crop&w=600&q=80" },
        { title: "How to Hire the Best Moving Company", author: "ADVICE HUB", imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da977535?auto=format&fit=crop&w=600&q=80" },
        { title: "The Checklist for Your First Day in a New Home", author: "ELENA V.", imageUrl: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=600&q=80" },
        { title: "Organizing Your Home: A 30-Day Guide", author: "DESIGN TEAM", imageUrl: "https://images.unsplash.com/photo-1581578731522-745a05ad9ad5?auto=format&fit=crop&w=600&q=80" }
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
        imageUrl: "https://images.unsplash.com/photo-1581578731522-745a05ad9ad5?auto=format&fit=crop&w=1200&q=80"
      },
      sideArticles: [
        { title: "The Best Smart Home Tech for 2024", author: "TECH DESK", imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80" },
        { title: "How To Renovate Your Kitchen on a $5,000 Budget", author: "DESIGN TEAM", imageUrl: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=600&q=80" },
        { title: "Energy-Efficient Upgrades That Pay for Themselves", author: "TECH DESK", imageUrl: "https://images.unsplash.com/photo-1518005020251-58296d8fca02?auto=format&fit=crop&w=600&q=80" },
        { title: "Landscape Design: Tips for a Low-Maintenance Yard", author: "DESIGN TEAM", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
        { title: "Bathroom Remodel: What to Splurge on vs Save", author: "DESIGN TEAM", imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80" },
        { title: "How to Paint Your Home Like a Professional", author: "DESIGN TEAM", imageUrl: "https://images.unsplash.com/photo-1581578731522-745a05ad9ad5?auto=format&fit=crop&w=600&q=80" }
      ]
    }
  ];
;

  navLinks = [
    { name: 'LATEST', route: '/news', active: true },
    { 
      name: 'NEWS', 
      active: false, 
      hasDropdown: true,
      items: [
        { name: 'Real Estate News', route: '#' },
        { name: 'Housing Trends', route: '#' },
        { name: 'Celebrity Real Estate', route: '#' },
        { name: 'Unique Homes', route: '#' },
        { name: 'Reality TV', route: '#' },
        { name: 'Sports', route: '#' },
        { name: 'Most Expensive Homes', route: '#' },
        { name: 'Most Popular Homes', route: '#' }
      ]
    },
    { name: 'BUYING', route: '#', active: false },
    { name: 'SELLING', route: '#', active: false },
    { name: 'RENTING', route: '#', active: false },
    // { name: 'CELEBRITY HOMES', route: '#', active: false },
    { 
      name: 'ADVICE', 
      active: false, 
      hasDropdown: true,
      items: [
        { name: 'Buying Advice', route: '#' },
        { name: 'Selling Advice', route: '#' },
        { name: 'Renting Advice', route: '#' },
        { name: 'Financing', route: '#' },
        { name: 'Living', route: '#' },
        { name: 'Moving', route: '#' },
        { name: 'Home Improvement', route: '#' }
      ]
    },
    { name: 'GUIDES', route: '#', active: false },
    { name: 'LIVING', route: '#', active: false },
    { name: 'RESEARCH', route: '#', active: false }
  ];

  get todayDate(): string {
    return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }

  constructor() { }

  ngOnInit(): void {
  }

  setActiveLink(link: any): void {
    this.navLinks.forEach(l => l.active = false);
    link.active = true;
  }
}
