import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SiteHeaderComponent } from '../../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-leadership',
  templateUrl: './leadership.component.html',
  styleUrl: './leadership.component.css',
  standalone: true,
  imports: [CommonModule, RouterLink, SiteHeaderComponent, SiteFooterComponent],
  encapsulation: ViewEncapsulation.None
})
export class LeadershipComponent implements OnInit {
  searchTerm: string = '';
  selectedCategory: string = '';
  
  allLeaders = [
    { name: 'Peter Beyer', title: 'SVP, Finance & Operations', category: 'Finance', image: 'https://b2cdata.marketing.moveaws.com/images/leadership/peter-beyer.jpg?a=1' },
    { name: 'Anna Marie Castiglioni', title: 'Head of RDC Next', category: 'Executive Team', image: 'https://b2cdata.marketing.moveaws.com/images/leadership/anna-marie-castiglioni.jpg?a=1' },
    { name: 'Jim Caulfield', title: 'EVP, General Counsel', category: 'Executive Team', image: 'https://b2cdata.marketing.moveaws.com/images/leadership/jim-caulfield.jpg?a=1' },
    { name: 'Bryan Charap', title: 'Chief Financial Officer', category: 'Executive Team', image: 'https://b2cdata.marketing.moveaws.com/images/leadership/bryan-charap.jpg?a=1' },
    { name: 'Damian Eales', title: 'Chief Executive Officer', category: 'Executive Team', image: 'https://b2cdata.marketing.moveaws.com/images/leadership/damian-eales.jpg?a=1' },
    { name: 'Bryan Ellis', title: 'Chief Client and Revenue Officer', category: 'Executive Team', image: 'https://b2cdata.marketing.moveaws.com/images/leadership/bryan-ellis.jpg?a=1' },
    { name: 'Bob Evans', title: 'SVP, Industry Relations', category: 'Industry Relations', image: 'https://b2cdata.marketing.moveaws.com/images/leadership/bob-evans.jpg?a=1' },
    { name: 'Danielle Hale', title: 'Chief Economist', category: 'Research', image: 'https://b2cdata.marketing.moveaws.com/images/leadership/danielle-hale.jpg?a=1' },
    { name: 'Dave Herman', title: 'SVP Consumer Product', category: 'Product', image: 'https://b2cdata.marketing.moveaws.com/images/leadership/dave-herman.jpg?a=1' },
    { name: 'Karthikeyan Janakiraman', title: 'Chief Technology Officer', category: 'Executive Team', image: 'https://b2cdata.marketing.moveaws.com/images/leadership/karthikeyan-janakiraman.jpg?a=1' },
    { name: 'Kat Koutsantonis', title: 'Chief People Officer', category: 'Executive Team', image: 'https://b2cdata.marketing.moveaws.com/images/leadership/kat-koutsantonis.jpg?a=1' },
    { name: 'Vidya Krishnakumar', title: 'SVP of Data Science & Analytics', category: 'Data', image: 'https://b2cdata.marketing.moveaws.com/images/leadership/vidya-krishnakumar.jpg?a=1' },
    { name: 'Frank Livaudais', title: 'SVP, Client Engineering', category: 'Engineering', image: 'https://b2cdata.marketing.moveaws.com/images/leadership/frank-livaudais.jpg?a=1' },
    { name: 'Andrew Mattie', title: 'SVP, Engineering', category: 'Engineering', image: 'https://b2cdata.marketing.moveaws.com/images/leadership/andrew-mattie.jpg?a=1' },
    { name: 'Ellen Murphy', title: 'SVP, Deputy General Counsel', category: 'Legal', image: 'https://b2cdata.marketing.moveaws.com/images/leadership/ellen-murphy.jpg?a=1' },
    { name: 'Debbie Neuberger', title: 'SVP, Customer Care', category: 'Customer Care', image: 'https://b2cdata.marketing.moveaws.com/images/leadership/debbie-neuberger.jpg?a=1' },
    { name: 'Mickey Neuberger', title: 'Chief Consumer & Marketing Officer', category: 'Executive Team', image: 'https://b2cdata.marketing.moveaws.com/images/leadership/mickey-neuberger.jpg?a=1' },
    { name: 'Dan Seiffert', title: 'SVP, Accounting', category: 'Finance', image: 'https://b2cdata.marketing.moveaws.com/images/leadership/dan-seiffert.jpg?a=1' },
    { name: 'Greg Taylor', title: 'SVP, Performance Marketing', category: 'Marketing', image: 'https://b2cdata.marketing.moveaws.com/images/leadership/greg-taylor.jpg?a=1' },
    { name: 'Tricia Smith', title: 'SVP, Sales and Operations', category: 'Sales', image: 'https://b2cdata.marketing.moveaws.com/images/leadership/-tricia-smith.jpg?a=1' },
    { name: 'Yi Fang Yen', title: 'SVP, Digital Media', category: 'Media', image: 'https://b2cdata.marketing.moveaws.com/images/leadership/yi-fang-yen.jpg?a=1' }
  ];

  filteredLeaders = this.allLeaders;

  ngOnInit() {}

  onSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.applyFilters();
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.target.value;
    this.applyFilters();
  }

  private applyFilters() {
    this.filteredLeaders = this.allLeaders.filter(leader => {
      const matchesSearch = leader.name.toLowerCase().includes(this.searchTerm) || 
                            leader.title.toLowerCase().includes(this.searchTerm);
      const matchesCategory = !this.selectedCategory || leader.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }
}
