import { LocationService } from '../../shared/services/location.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  constructor(private locationService: LocationService, private uiService: UiService) {}

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities(): void {
    this.locationService.getCities().subscribe(cities => {
      this.cities = cities;
      if (this.cities.length > 0 && !this.selectedCityId) {
        this.selectCity(this.cities[0].id);
      }
    });
  }

  selectCity(cityId: number): void {
    this.selectedCityId = cityId;
    this.loadAreas();
  }

  loadAreas(): void {
    if (this.selectedCityId) {
      this.locationService.getAreas(this.selectedCityId).subscribe(areas => {
        this.areas = areas;
      });
    } else {
      this.areas = [];
    }
  }

  addCity(): void {
    if (this.newCityName.trim() && this.newCityProv.trim()) {
      this.locationService.addCity(this.newCityName, this.newCityProv).subscribe(() => {
        this.uiService.showToast('success', 'City Added', 'The new city has been added successfully.');
        this.loadCities();
        this.newCityName = '';
        this.newCityProv = '';
      });
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
      this.locationService.deleteCity(id).subscribe(() => {
        this.uiService.showToast('success', 'Deleted', 'City and areas deleted successfully.');
        if (this.selectedCityId === id) this.selectedCityId = null;
        this.loadCities();
      });
    }
  }

  addArea(): void {
    if (this.newAreaName.trim() && this.selectedCityId) {
      this.locationService.addArea(this.selectedCityId, this.newAreaName).subscribe(() => {
        this.uiService.showToast('success', 'Area Added', 'The new area has been created.');
        this.newAreaName = '';
        this.loadAreas();
      });
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
      this.locationService.deleteArea(id).subscribe(() => {
        this.uiService.showToast('success', 'Deleted', 'Area removed successfully.');
        this.loadAreas();
      });
    }
  }
}
