import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { getCategoryData, getProperty, Property } from '../../data/listings.data';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent implements OnInit {
  property: Property | null = null;
  similarHomes: Property[] = [];
  categorySlug: string = '';
  isSaved: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categorySlug = params.get('category') || '';
      const id = Number(params.get('id'));
      
      this.property = getProperty(this.categorySlug, id);
      
      if (this.categorySlug) {
        const cat = getCategoryData(this.categorySlug);
        this.similarHomes = cat?.properties.filter(p => p.id !== id).slice(0, 8) || [];
      }
      
      // Reset scroll to top on navigation
      window.scrollTo(0, 0);
    });
  }

  goBack() {
    this.location.back();
  }

  toggleSave() {
    this.isSaved = !this.isSaved;
  }

  formatCount(n: number): string {
    return n >= 1000 ? n.toLocaleString() : n.toString();
  }
}
