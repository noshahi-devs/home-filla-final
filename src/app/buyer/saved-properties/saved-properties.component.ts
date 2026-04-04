import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../shared/services/mock-data.service';
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

  constructor(private dataService: MockDataService) {}

  ngOnInit() {
    // Just mock fetching the first 3 approved properties as "saved"
    this.savedProperties = this.dataService.getPropertiesByStatus('approved').slice(0, 3);
  }

  removeSaved(id: number) {
    this.savedProperties = this.savedProperties.filter(p => p.id !== id);
  }
}
