import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../shared/services/mock-data.service';
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

  constructor(private dataService: MockDataService) {}

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
    }
  }

  deleteCity(id: number): void {
    if (confirm('Delete city and all its areas?')) {
      this.dataService.deleteCity(id);
      if (this.selectedCityId === id) this.selectedCityId = null;
      this.loadCities();
      this.loadAreas();
    }
  }

  addArea(): void {
    if (this.newAreaName.trim() && this.selectedCityId) {
      this.dataService.addArea(this.selectedCityId, this.newAreaName);
      this.newAreaName = '';
      this.loadAreas();
    }
  }

  deleteArea(id: number): void {
    if (confirm('Delete this area?')) {
      this.dataService.deleteArea(id);
      this.loadAreas();
    }
  }
}
