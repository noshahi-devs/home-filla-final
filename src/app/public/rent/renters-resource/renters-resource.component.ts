import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SiteHeaderComponent } from '../../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../../shared/components/site-footer/site-footer.component';

interface RoadmapStep {
  stepNum: number;
  title: string;
  description: string;
  imgUrl: string;
  btnText: string;
  btnLink: string;
}

interface ResourceCard {
  title: string;
  imgUrl: string;
  linkUrl: string;
}

@Component({
  selector: 'app-renters-resource',
  standalone: true,
  imports: [CommonModule, RouterModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './renters-resource.component.html',
  styleUrls: ['./renters-resource.component.css']
})
export class RentersResourceComponent {

  steps: RoadmapStep[] = [
    {
      stepNum: 1,
      title: 'Set your budget',
      description: 'Before you start hunting, pinpoint exactly how much rent you can comfortably afford each month.',
      imgUrl: 'https://b2cdata.marketing.moveaws.com/mk/images/roadmap/2/step-1.png',
      btnText: 'Calculate budget',
      btnLink: '/my-home/sale-proceeds-calculator' // placeholder for budget calculator
    },
    {
      stepNum: 2,
      title: 'Find the right neighborhood',
      description: 'It’s all about location, location, location! Our interactive map can help you pick the ideal spot.',
      imgUrl: 'https://b2cdata.marketing.moveaws.com/mk/images/roadmap/2/step-2.png',
      btnText: 'Define your search area',
      btnLink: '/listings/rent'
    },
    {
      stepNum: 3,
      title: 'Prioritize your wish list',
      description: 'Figure out what you can (and can’t) live without. In-unit laundry, a doorman, a pet-friendly place—you name it!',
      imgUrl: 'https://b2cdata.marketing.moveaws.com/mk/images/roadmap/2/step-3.png',
      btnText: 'Consider these amenities',
      btnLink: '/listings/rent'
    },
    {
      stepNum: 4,
      title: 'Start your search',
      description: 'Use our free apartment hunting checklist to narrow your top choices.',
      imgUrl: 'https://b2cdata.marketing.moveaws.com/mk/images/roadmap/2/step-4.png',
      btnText: 'Start searching',
      btnLink: '/listings/rent'
    },
    {
      stepNum: 5,
      title: 'Sign the lease',
      description: 'Review the fine print thoroughly before making anything official.',
      imgUrl: 'https://b2cdata.marketing.moveaws.com/mk/images/roadmap/2/step-5.png',
      btnText: 'Read the ultimate lease guide',
      btnLink: '/rent/resource-center'
    },
    {
      stepNum: 6,
      title: 'Make your move',
      description: 'Once you’re approved for the new digs, hire movers, arrange temporary storage if needed, and transfer utilities and other services.',
      imgUrl: 'https://b2cdata.marketing.moveaws.com/mk/images/roadmap/2/step-6.png',
      btnText: 'Follow these steps',
      btnLink: '/rent/resource-center'
    }
  ];

  tips: ResourceCard[] = [
    {
      title: 'Apartments offering move-in specials: how to find them to save on rent',
      imgUrl: 'https://b2cdata.marketing.moveaws.com/mk/images/roadmap/2/article-1.jpg',
      linkUrl: '/rent/resource-center'
    },
    {
      title: 'The best time to rent an apartment: a comprehensive guide',
      imgUrl: 'https://b2cdata.marketing.moveaws.com/mk/images/roadmap/2/article-2.jpg',
      linkUrl: '/rent/resource-center'
    },
    {
      title: 'How to get approved for an apartment: 6 tips to make your rental application stand out',
      imgUrl: 'https://b2cdata.marketing.moveaws.com/mk/images/roadmap/2/article-3.jpg',
      linkUrl: '/rent/resource-center'
    },
    {
      title: 'For rent by owner: a guide to finding rental homes with private landlords',
      imgUrl: 'https://b2cdata.marketing.moveaws.com/mk/images/roadmap/2/article-4.jpg',
      linkUrl: '/rent/resource-center'
    },
    {
      title: 'Renting an apartment vs. renting a house: how to choose which Is right for you',
      imgUrl: 'https://b2cdata.marketing.moveaws.com/mk/images/roadmap/2/article-5.jpg',
      linkUrl: '/rent/resource-center'
    },
    {
      title: 'Share your renter profile with landlords in minutes.',
      imgUrl: 'https://b2cdata.marketing.moveaws.com/mk/images/roadmap/2/article-6.jpg',
      linkUrl: '/rent/resource-center'
    }
  ];
}
