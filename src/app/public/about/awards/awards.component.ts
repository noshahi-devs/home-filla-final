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
      logo: 'https://b2cdata.marketing.moveaws.com/about/images/th-awards-nw.jpg', 
      title: 'Newsweek Awards', 
      year: '2020',
      description: "One of top three U.S. real estate databases \n “America’s Best Customer Service 2020.”" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/about/images/th-awards-nw.jpg', 
      title: 'Newsweek Awards', 
      year: '2019',
      description: "America’s Best \n Customer Service" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/about/images/th-awards-hw.jpg', 
      title: 'HousingWire', 
      year: '2019',
      description: "Tech100 \n Home Filla®" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/about/images/th-awards-hw.jpg', 
      title: 'HousingWire', 
      year: '2019',
      description: "Rising Star \n Danielle Hale" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/about/images/th-awards-ihaf.jpg', 
      title: 'In House Agency Forum', 
      year: '2019',
      description: "Gold Award - Infographics \n Home Filla® Creative Services" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/about/images/th-awards-ihaf.jpg', 
      title: 'In House Agency Forum', 
      year: '2019',
      description: "Silver Award – Email Marketing \n Home Filla® Creative Services" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/about/images/th-awards-twp.jpg', 
      title: 'Top Workplaces', 
      year: '2019',
      description: "Austin American-Statesman \n Austin/Opcity" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/about/images/th-awards-ris.jpg', 
      title: 'RISMedia', 
      year: '2019',
      description: "Newsmakers – Trailblazers \n Ben Rubenstein" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/about/images/th-awards-ris.jpg', 
      title: 'RISMedia', 
      year: '2019',
      description: "Newsmakers – Futurists \n Michael Lam" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/about/images/th-awards-stevie.jpg', 
      title: 'Gold Stevie', 
      year: '2018',
      description: "American Business Awards – Real Estate \n Home Filla® App" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/about/images/th-awards-mediapost.jpg', 
      title: 'Media Post', 
      year: '2018',
      description: "Appy Awards Finalist \n Home Filla® App" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/about/images/th-awards-hw.jpg', 
      title: 'HousingWire', 
      year: '2017',
      description: "Women of Influence \n Suzanne Mueller" 
    },
    { 
      logo: 'https://b2cdata.marketing.moveaws.com/about/images/th-awards-webby.jpg', 
      title: 'Webby Awards', 
      year: '2017',
      description: "Honoree" 
    }
  ];

  ngOnInit() {}
}
