import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../shared/services/mock-data.service';
import { UiService } from '../../shared/services/ui.service';
import { City, Area } from '../../shared/models';

@Component({
  selector: 'app-admin-locations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css'
})
export class AdminLocationsComponent implements OnInit {
  cities: City[] = [];
  selectedCityId: number | null = null;
  areas: Area[] = [];

  newCityName = '';
  newCityProv = '';
  newAreaName = '';

  constructor(private dataService: MockDataService, private uiService: UiService) {}

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities(): void {
    this.cities = this.dataService.getCities();
    if (this.cities.length > 0 && !this.selectedCityId) {
      this.selectCity(this.cities[0].id);
    }
  }

  selectCity(cityId: number): void {
    this.selectedCityId = cityId;
    this.loadAreas();
  }

  loadAreas(): void {
    if (this.selectedCityId) {
      this.areas = this.dataService.getAreas(this.selectedCityId);
    } else {
      this.areas = [];
    }
  }

  addCity(): void {
    if (this.newCityName.trim() && this.newCityProv.trim()) {
      this.dataService.addCity(this.newCityName, this.newCityProv);
      this.newCityName = '';
      this.newCityProv = '';
      this.loadCities();
      this.uiService.showToast('success', 'City Added', 'The new city has been added successfully.');
    } else {
      this.uiService.showToast('error', 'Incomplete', 'Please provide both city name and province.');
    }
  }

  async deleteCity(id: number): Promise<void> {
    const isConfirmed = await this.uiService.showConfirmation(
      'Delete City',
      'Delete this city and all its affiliated areas?',
      'danger'
    );
    if (isConfirmed) {
      this.dataService.deleteCity(id);
      if (this.selectedCityId === id) this.selectedCityId = null;
      this.loadCities();
      this.loadAreas();
      this.uiService.showToast('success', 'Deleted', 'City and areas deleted successfully.');
    }
  }

  addArea(): void {
    if (this.newAreaName.trim() && this.selectedCityId) {
      this.dataService.addArea(this.selectedCityId, this.newAreaName);
      this.newAreaName = '';
      this.loadAreas();
      this.uiService.showToast('success', 'Area Added', 'The new area has been created.');
    } else {
      this.uiService.showToast('error', 'Incomplete', 'Please provide an area name.');
    }
  }

  async deleteArea(id: number): Promise<void> {
    const isConfirmed = await this.uiService.showConfirmation(
      'Delete Area',
      'Are you sure you want to delete this specific area?',
      'warning'
    );
    if (isConfirmed) {
      this.dataService.deleteArea(id);
      this.loadAreas();
      this.uiService.showToast('success', 'Deleted', 'Area removed successfully.');
    }
  }
}
