import { PropertyService } from '../../shared/services/property.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardProperty } from '../../shared/models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-buyer-saved-properties',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './saved-properties.component.html',
  styleUrl: '../../admin/properties/properties.component.css'
})
export class BuyerSavedPropertiesComponent implements OnInit {
  savedProperties: DashboardProperty[] = [];

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.propertyService.getPropertiesByStatus('approved').subscribe(props => {
      this.savedProperties = props.slice(0, 3);
    });
  }

  removeSaved(id: number) {
    this.savedProperties = this.savedProperties.filter(p => p.id !== id);
  }
}
