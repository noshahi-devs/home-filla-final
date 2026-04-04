import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../shared/services/mock-data.service';
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

  constructor(private dataService: MockDataService) {}

  ngOnInit() {
    this.properties = this.dataService.getProperties();
  }

  toggleFeatured(id: number) {
    this.dataService.toggleFeatured(id);
    this.properties = this.dataService.getProperties();
  }
}
