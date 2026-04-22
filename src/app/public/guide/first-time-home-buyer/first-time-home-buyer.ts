import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SiteHeaderComponent } from '../../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../../shared/components/site-footer/site-footer.component';

interface ResourceLink {
  label: string;
  url: string;
  isExternal: boolean;
}

interface ResourceItem {
  title: string;
  description: string;
  icon: string;
  links: ResourceLink[];
}

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  link: string;
}

interface NewsItem {
  title: string;
  thumbnail: string;
  link: string;
}

@Component({
  selector: 'app-first-time-home-buyer',
  standalone: true,
  imports: [CommonModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './first-time-home-buyer.html',
  styleUrl: './first-time-home-buyer.css',
})
export class FirstTimeHomeBuyerComponent implements AfterViewInit {
  navItems = [
    { label: 'GET STARTED', id: 'get-started' },
    { label: 'UNDERSTANDING MORTGAGES', id: 'mortgages' },
    { label: 'HOME BUYING RESOURCES', id: 'resources' },
    { label: 'START SEARCHING', id: 'searching' },
  ];

  gettingStarted: ResourceItem[] = [
    {
      title: '12 Step Home Buying Guide',
      icon: 'clipboard-list',
      description: "Buying a home is one of the most exciting—and daunting—things you'll ever do. With so many choices to make and so much at stake, it's essential that you be prepared. Check out these secrets from industry professionals to find your dream home, land a loan, and ace your home buying adventure without a hitch.",
      links: [
        { label: 'Read guide', url: 'https://www.realtor.com/advice/guides/first-time-home-buyer/?iid=int-rdc_firstTimeBuyer_landing', isExternal: true },
        { label: 'Lee la guía', url: 'https://www.realtor.com/espanol/consejo/guias/comprador-de-casa-primerizo', isExternal: true }
      ]
    },
    {
      title: 'Home Affordability Calculator',
      icon: 'calculator',
      description: 'Use this calculator to determine what price range you can afford. Enter details about your income, monthly debt, and down payment to find a home within your budget.',
      links: [
        { label: 'Calculate now', url: 'https://www.realtor.com/mortgage/tools/affordability-calculator/?iid=int-rdc_firstTimeBuyer_landing', isExternal: true }
      ]
    },
    {
      title: 'Homebuying process from A-Z',
      icon: 'sync-alt',
      description: 'Buying a home is one of the most exciting things you’ll ever do. But it can also be one of the most confusing. Watch our video 23 part series on the home buying process.',
      links: [
        { label: 'Watch now', url: 'https://www.youtube.com/embed?autoplay=1&listType=playlist&list=PLmlKLrMX62MY5lhn-oqBH3XgSJ9fOL3xO', isExternal: true }
      ]
    },
    {
      title: 'Looking For Even More Home Buying Help?',
      icon: 'lightbulb',
      description: 'Order our book on Amazon today.',
      links: [
        { label: 'Buy now', url: 'https://www.amazon.com/Essential-First-Time-Home-Buyers-Book/dp/1543965717/ref=sr_1_1?crid=14ZXF256ZBTLG&keywords=realtor.com+book&qid=1557360262&s=gateway&sprefix=realtor.com%2Caps%2C181&sr=8-1', isExternal: true }
      ]
    }
  ];

  understandingMortgages: ResourceItem[] = [
    {
      title: 'Stress Free Guide to Getting a Mortgage',
      icon: 'file-invoice-dollar',
      description: 'Read our series of articles for everything you need to know in order to make this essential, mysterious, and sometimes frustrating process of getting a mortgage to work in your favor.',
      links: [
        { label: 'Read guide', url: 'https://www.realtor.com/advice/finance/what-you-need-to-get-a-mortgage/?iid=int-rdc_firstTimeBuyer_landing', isExternal: true }
      ]
    },
    {
      title: 'Mortgage Calculator',
      icon: 'calculator',
      description: 'Enter your home location and the desired home price in the fields and in seconds, you will have an estimate of your monthly house payment.',
      links: [
        { label: 'Calculate now', url: 'https://www.realtor.com/mortgage/tools/mortgage-calculator/?iid=int-rdc_firstTimeBuyer_landing', isExternal: true }
      ]
    },
    {
      title: 'Mortgage 101',
      icon: 'file-pdf',
      description: 'Before you head out to find your new home be sure to download this Mortgage 101 primer with six-mortgage must-knows.',
      links: [
        { label: 'Download PDF', url: 'https://b2cdata.marketing.moveaws.com/first-time-buyer/docs/RDC-mortgage-101.pdf?iid=int-rdc_firstTimeBuyer_landing', isExternal: true }
      ]
    }
  ];

  moreResources: ResourceItem[] = [
    {
      title: 'Common Terms and Acronyms',
      icon: 'book-open',
      description: 'Check out the realtor.com glossary of frequently used words and phrases you need to know as a home buyer.',
      links: [{ label: 'Learn more', url: 'https://www.realtor.com/advice/buy/first-time-home-buyers-glossary/?iid=int-rdc_firstTimeBuyer_landing', isExternal: true }]
    },
    {
      title: 'Find a REALTOR®',
      icon: 'map-marker-alt',
      description: 'Search for your agent from more than 1 million REALTORS® nationwide.',
      links: [{ label: 'Search', url: 'https://www.realtor.com/realestateagents?iid=int-rdc_firstTimeBuyer_landing', isExternal: true }]
    },
    {
      title: 'Rent vs. Buy Calculator',
      icon: 'balance-scale',
      description: 'Should you rent or buy? This tool can help you calculate the net cost of buying a home versus the cost of renting over time.',
      links: [{ label: 'Calculate now', url: 'https://www.realtor.com/mortgage/tools/rent-or-buy-calculator/?iid=int-rdc_firstTimeBuyer_landing', isExternal: true }]
    },
    {
      title: 'Learn about home insurance',
      icon: 'shield-alt',
      description: "Find home insurance that fits your needs. It's free and fast.",
      links: [{ label: 'Learn more', url: 'https://www.realtor.com/mortgage/home-insurance/compare', isExternal: true }]
    }
  ];

  buyingVideosList: VideoItem[] = [
    { id: 'v1', title: 'How to make the best offer', thumbnail: 'https://b2cdata.marketing.moveaws.com/first-time-buyer/images/housing-market-2019-v3.jpg', link: 'https://www.youtube.com/embed/6guhAjKus5Q' },
    { id: 'v2', title: 'Which mortgage is right for you?', thumbnail: 'https://b2cdata.marketing.moveaws.com/first-time-buyer/images/amazon-impact-v2.jpg', link: 'https://www.youtube.com/embed/b8Be5cMZP2I' },
    { id: 'v3', title: 'First time home buyer tips and tricks', thumbnail: 'https://b2cdata.marketing.moveaws.com/first-time-buyer/images/tax-bill-and-housing-v3.jpg', link: 'https://www.youtube.com/embed/nHQqA_hzae8' },
    { id: 'v4', title: 'How to find your dream home', thumbnail: 'https://b2cdata.marketing.moveaws.com/first-time-buyer/images/housing-forecast-v2.jpg', link: 'https://www.youtube.com/embed/_0yI_wfWNA4' },
    { id: 'v5', title: 'Mortgage Myths Busted', thumbnail: 'https://b2cdata.marketing.moveaws.com/first-time-buyer/images/when-to-buy-a-home-v2.jpg', link: 'https://www.youtube.com/embed/6vz7onVgw8Y' }
  ];

  newsInsightsList: NewsItem[] = [
    { title: 'Download the First Time Home Buyer Buyers Guide', thumbnail: 'https://b2cdata.marketing.moveaws.com/first-time-buyer/images/housing-market-2019-v3.jpg', link: '#' },
    { title: '5 Things Every First-Time Home Buyer Needs to Know', thumbnail: 'https://b2cdata.marketing.moveaws.com/first-time-buyer/images/amazon-impact-v2.jpg', link: '#' },
    { title: "Home Buyers Reveal: 'What I Wish I Had Known Before Buying My First", thumbnail: 'https://b2cdata.marketing.moveaws.com/first-time-buyer/images/tax-bill-and-housing-v3.jpg', link: '#' },
    { title: 'Fact or Fiction? 6 Down Payment Myths You Should Stop Believing', thumbnail: 'https://b2cdata.marketing.moveaws.com/first-time-buyer/images/housing-forecast-v2.jpg', link: '#' },
    { title: 'What Is a Home Warranty? Peace of Mind for Home Buyers and Sellers', thumbnail: 'https://b2cdata.marketing.moveaws.com/first-time-buyer/images/when-to-buy-a-home-v2.jpg', link: '#' }
  ];

  currentVideoIndex = 0;
  currentNewsIndex = 0;
  itemsPerPage = 4;

  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
    this.updateItemsPerPage();
    window.onresize = () => this.updateItemsPerPage();
  }

  updateItemsPerPage() {
    if (window.innerWidth < 768) {
      this.itemsPerPage = 1;
    } else if (window.innerWidth < 1024) {
      this.itemsPerPage = 2;
    } else {
      this.itemsPerPage = 4;
    }
  }

  get displayedVideos() {
    return this.buyingVideosList.slice(this.currentVideoIndex, this.currentVideoIndex + this.itemsPerPage);
  }

  get displayedNews() {
    return this.newsInsightsList.slice(this.currentNewsIndex, this.currentNewsIndex + this.itemsPerPage);
  }

  nextVideo() {
    if (this.currentVideoIndex + this.itemsPerPage < this.buyingVideosList.length) {
      this.currentVideoIndex++;
    }
  }

  prevVideo() {
    if (this.currentVideoIndex > 0) {
      this.currentVideoIndex--;
    }
  }

  nextNews() {
    if (this.currentNewsIndex + this.itemsPerPage < this.newsInsightsList.length) {
      this.currentNewsIndex++;
    }
  }

  prevNews() {
    if (this.currentNewsIndex > 0) {
      this.currentNewsIndex--;
    }
  }

  scrollToSection(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
