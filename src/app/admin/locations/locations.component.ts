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
  filteredCities: City[] = [];
  selectedCityId: number | null = null;
  areas: Area[] = [];
  filteredAreas: Area[] = [];

  // Search
  citySearch = '';
  areaSearch = '';

  // Modal State
  showCityModal = false;
  showAreaModal = false;
  editMode = false;
  
  // Current Item being added/edited
  currentCity: Partial<City> = { name: '', province: '' };
  currentArea: Partial<Area> = { name: '' };

  constructor(private locationService: LocationService, private uiService: UiService) {}

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities(): void {
    this.locationService.getCities().subscribe(cities => {
      this.cities = cities;
      this.filterCities();
      if (this.cities.length > 0 && !this.selectedCityId) {
        this.selectCity(this.cities[0].id);
      }
    });
  }

  filterCities(): void {
    const query = this.citySearch.toLowerCase().trim();
    this.filteredCities = this.cities.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.province?.toLowerCase().includes(query)
    );
  }

  selectCity(cityId: number): void {
    this.selectedCityId = cityId;
    this.loadAreas();
  }

  loadAreas(): void {
    if (this.selectedCityId) {
      this.locationService.getAreas(this.selectedCityId).subscribe(areas => {
        this.areas = areas;
        this.filterAreas();
      });
    } else {
      this.areas = [];
      this.filteredAreas = [];
    }
  }

  filterAreas(): void {
    const query = this.areaSearch.toLowerCase().trim();
    this.filteredAreas = this.areas.filter(a => 
      a.name.toLowerCase().includes(query)
    );
  }

  // --- Modal Actions ---
  
  openAddCity() {
    this.editMode = false;
    this.currentCity = { name: '', province: '' };
    this.showCityModal = true;
  }

  openEditCity(city: City) {
    this.editMode = true;
    this.currentCity = { ...city };
    this.showCityModal = true;
  }

  openAddArea() {
    if (!this.selectedCityId) return;
    this.editMode = false;
    this.currentArea = { name: '', cityId: this.selectedCityId };
    this.showAreaModal = true;
  }

  openEditArea(area: Area) {
    this.editMode = true;
    this.currentArea = { ...area };
    this.showAreaModal = true;
  }

  saveCity() {
    if (!this.currentCity.name?.trim()) {
      this.uiService.showToast('error', 'Incomplete', 'City name is required.');
      return;
    }

    if (this.editMode && this.currentCity.id) {
      this.locationService.updateCity(this.currentCity.id, this.currentCity.name, this.currentCity.province || '').subscribe(() => {
        this.uiService.showToast('success', 'City Updated', 'Changes saved successfully.');
        this.showCityModal = false;
        this.loadCities();
      });
    } else {
      this.locationService.addCity(this.currentCity.name, this.currentCity.province || '').subscribe(() => {
        this.uiService.showToast('success', 'City Added', 'The new city has been created.');
        this.showCityModal = false;
        this.loadCities();
      });
    }
  }

  saveArea() {
    if (!this.currentArea.name?.trim()) {
      this.uiService.showToast('error', 'Incomplete', 'Area name is required.');
      return;
    }

    if (this.editMode && this.currentArea.id) {
      this.locationService.updateArea(this.currentArea.id, this.currentArea.name).subscribe(() => {
        this.uiService.showToast('success', 'Area Updated', 'Changes saved successfully.');
        this.showAreaModal = false;
        this.loadAreas();
      });
    } else if (this.selectedCityId) {
      this.locationService.addArea(this.selectedCityId, this.currentArea.name).subscribe(() => {
        this.uiService.showToast('success', 'Area Added', 'The new area has been created.');
        this.showAreaModal = false;
        this.loadAreas();
      });
    }
  }

  async deleteCity(id: number) {
    const confirmed = await this.uiService.showConfirmation(
      'Delete City',
      'Are you sure? This will remove all affiliated areas and property links.',
      'danger'
    );
    if (confirmed) {
      this.locationService.deleteCity(id).subscribe(() => {
        this.uiService.showToast('success', 'Deleted', 'City removed successfully.');
        if (this.selectedCityId === id) this.selectedCityId = null;
        this.loadCities();
      });
    }
  }

  async deleteArea(id: number) {
    const confirmed = await this.uiService.showConfirmation(
      'Delete Area',
      'Are you sure you want to delete this specific area?',
      'warning'
    );
    if (confirmed) {
      this.locationService.deleteArea(id).subscribe(() => {
        this.uiService.showToast('success', 'Deleted', 'Area removed successfully.');
        this.loadAreas();
      });
    }
  }
}
