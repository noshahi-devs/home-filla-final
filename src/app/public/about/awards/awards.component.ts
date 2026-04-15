import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SiteHeaderComponent } from '../../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrl: './awards.component.css',
  standalone: true,
  imports: [CommonModule, RouterLink, SiteHeaderComponent, SiteFooterComponent],
  encapsulation: ViewEncapsulation.None
})
export class AwardsComponent implements OnInit {
  awards = [
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/images/awards/newsweek.png', 
      title: 'Newsweek Awards 2020', 
      description: "One of top three U.S. real estate databases 'America's Best Customer Service 2020'." 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/images/awards/newsweek.png', 
      title: 'Newsweek Awards 2019', 
      description: "America's Best Customer Service" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/images/awards/housing-wire.png', 
      title: 'HousingWire 2019', 
      description: "Tech100 - Home Filla®" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/images/awards/housing-wire.png', 
      title: 'HousingWire 2019', 
      description: "Rising Star - Danielle Hale" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/images/awards/ihaf.png', 
      title: 'In House Agency Forum 2019', 
      description: "Gold Award - Infographics" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/images/awards/ihaf.png', 
      title: 'In House Agency Forum 2019', 
      description: "Silver Award - Email Marketing" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/images/awards/top-workplaces.png', 
      title: 'Top Workplaces 2019', 
      description: "Austin American-Statesman" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/images/awards/rismedia.png', 
      title: 'RISMedia 2019', 
      description: "Newsmakers - Trailblazers Ben Rubenstein" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/images/awards/rismedia.png', 
      title: 'RISMedia 2019', 
      description: "Newsmakers - Futurists Michael Lam" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/images/awards/stevie.png', 
      title: 'Gold Stevie 2018', 
      description: "American Business Awards - Real Estate" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/images/awards/mediapost.png', 
      title: 'Media Post 2018', 
      description: "Appy Awards Finalist - Home Filla® App" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/images/awards/housing-wire.png', 
      title: 'HousingWire 2017', 
      description: "Women of Influence - Suzanne Mueller" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/images/awards/webby.png', 
      title: 'Webby Awards 2017', 
      description: "Honoree" 
    }
  ];

  ngOnInit() {}
}
