import { PropertyService } from '../../shared/services/property.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardProperty } from '../../shared/models';

@Component({
  selector: 'app-admin-featured',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured.component.html',
  styleUrl: '../properties/properties.component.css'
})
export class AdminFeaturedComponent implements OnInit {
  properties: DashboardProperty[] = [];

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.loadProperties();
  }

  loadProperties() {
    this.propertyService.getProperties().subscribe(props => {
      this.properties = props;
    });
  }

  toggleFeatured(id: number) {
    this.propertyService.toggleFeatured(id).subscribe(() => {
      this.loadProperties();
    });
  }
}
