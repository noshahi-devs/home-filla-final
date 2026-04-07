import { LocationService } from '../../shared/services/location.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiService } from '../../shared/services/ui.service';
import { HttpErrorResponse } from '@angular/common/http';
import { City, Area } from '../../shared/models';
import * as L from 'leaflet';

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
  isAreasLoading = false;

  // Search
  citySearch = '';
  areaSearch = '';

  // Pagination
  citiesPage = 1;
  citiesPageSize = 5;
  areasPage = 1;
  areasPageSize = 5;

  // Modal State
  showCityModal = false;
  showAreaModal = false;
  editMode = false;
  
  // Current Item being added/edited
  currentCity: Partial<City> = { name: '', province: '', lat: 31.5204, lng: 74.3587 };
  currentArea: Partial<Area> = { name: '', lat: 31.5204, lng: 74.3587 };

  private map: L.Map | undefined;
  private marker: L.Marker | undefined;

  constructor(
    private locationService: LocationService, 
    private uiService: UiService,
    private cdr: ChangeDetectorRef
  ) {}

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
      this.cdr.detectChanges();
    });
  }

  filterCities(): void {
    const query = this.citySearch.toLowerCase().trim();
    this.filteredCities = this.cities.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.province?.toLowerCase().includes(query)
    );
    this.citiesPage = 1; // Reset to page 1 on search
  }

  get pagedCities(): City[] {
    const start = (this.citiesPage - 1) * this.citiesPageSize;
    return this.filteredCities.slice(start, start + this.citiesPageSize);
  }

  get totalCitiesPages(): number {
    return Math.ceil(this.filteredCities.length / this.citiesPageSize) || 1;
  }

  selectCity(cityId: number): void {
    this.selectedCityId = cityId;
    this.loadAreas();
  }

  loadAreas(): void {
    if (this.selectedCityId) {
      this.isAreasLoading = true;
      this.locationService.getAreas(this.selectedCityId).subscribe({
        next: (areas) => {
          this.areas = areas;
          this.filterAreas();
          this.isAreasLoading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.isAreasLoading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.areas = [];
      this.filteredAreas = [];
      this.isAreasLoading = false;
    }
  }

  filterAreas(): void {
    const query = this.areaSearch.toLowerCase().trim();
    this.filteredAreas = this.areas.filter(a => 
      a.name.toLowerCase().includes(query)
    );
    this.areasPage = 1; // Reset to page 1 on search
  }

  get pagedAreas(): Area[] {
    const start = (this.areasPage - 1) * this.areasPageSize;
    return this.filteredAreas.slice(start, start + this.areasPageSize);
  }

  get totalAreasPages(): number {
    return Math.ceil(this.filteredAreas.length / this.areasPageSize) || 1;
  }

  // --- Modal Actions ---
  
  openAddCity() {
    this.editMode = false;
    this.currentCity = { name: '', province: '', lat: 31.5204, lng: 74.3587 };
    this.showCityModal = true;
    this.initMap('cityMap', this.currentCity.lat, this.currentCity.lng, true);
  }

  openEditCity(city: City) {
    this.editMode = true;
    this.currentCity = { ...city };
    this.showCityModal = true;
    this.initMap('cityMap', city.lat, city.lng, true);
  }

  openAddArea() {
    if (!this.selectedCityId) return;
    
    // Default to city center if available
    const parentCity = this.cities.find(c => c.id === this.selectedCityId);
    this.editMode = false;
    this.currentArea = { 
      name: '', 
      cityId: this.selectedCityId, 
      lat: parentCity?.lat || 31.5204, 
      lng: parentCity?.lng || 74.3587 
    };
    this.showAreaModal = true;
    this.initMap('areaMap', this.currentArea.lat, this.currentArea.lng, false);
  }

  openEditArea(area: Area) {
    this.editMode = true;
    this.currentArea = { ...area };
    this.showAreaModal = true;
    this.initMap('areaMap', area.lat, area.lng, false);
  }
  
  closeModal() {
    this.showCityModal = false;
    this.showAreaModal = false;
    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }
  }

  private initMap(elementId: string, lat: number = 31.5204, lng: number = 74.3587, isCity: boolean) {
    setTimeout(() => {
      if (this.map) this.map.remove();
      
      this.map = L.map(elementId).setView([lat, lng], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

      this.marker = L.marker([lat, lng], { draggable: true }).addTo(this.map);
      
      this.marker.on('dragend', (e) => {
        const position = e.target.getLatLng();
        if (isCity) {
          this.currentCity.lat = position.lat;
          this.currentCity.lng = position.lng;
        } else {
          this.currentArea.lat = position.lat;
          this.currentArea.lng = position.lng;
        }
      });
      
      // Fix map layout issues in modals
      setTimeout(() => this.map?.invalidateSize(), 200);
    }, 100);
  }

  handleError(err: HttpErrorResponse) {
    if (err.status === 400 && err.error?.error) {
      this.uiService.showToast('error', 'Validation Error', err.error.error);
    } else {
      this.uiService.showToast('error', 'Error', 'Something went wrong while saving.');
    }
  }

  saveCity() {
    if (!this.currentCity.name?.trim()) {
      this.uiService.showToast('error', 'Incomplete', 'City name is required.');
      return;
    }

    if (this.editMode && this.currentCity.id) {
      this.locationService.updateCity(this.currentCity.id, this.currentCity.name, this.currentCity.province || '', this.currentCity.lat, this.currentCity.lng).subscribe({
        next: () => {
          this.uiService.showToast('success', 'City Updated', 'Changes saved successfully.');
          this.closeModal();
          this.loadCities();
        },
        error: (err) => this.handleError(err)
      });
    } else {
      this.locationService.addCity(this.currentCity.name, this.currentCity.province || '', this.currentCity.lat, this.currentCity.lng).subscribe({
        next: () => {
          this.uiService.showToast('success', 'City Added', 'The new city has been created.');
          this.closeModal();
          this.loadCities();
        },
        error: (err) => this.handleError(err)
      });
    }
  }

  saveArea() {
    if (!this.currentArea.name?.trim()) {
      this.uiService.showToast('error', 'Incomplete', 'Area name is required.');
      return;
    }

    if (this.editMode && this.currentArea.id) {
      this.locationService.updateArea(this.currentArea.id, this.selectedCityId!, this.currentArea.name, this.currentArea.lat, this.currentArea.lng).subscribe({
        next: () => {
          this.uiService.showToast('success', 'Area Updated', 'Changes saved successfully.');
          this.closeModal();
          this.loadAreas();
        },
        error: (err) => this.handleError(err)
      });
    } else if (this.selectedCityId) {
      this.locationService.addArea(this.selectedCityId, this.currentArea.name, this.currentArea.lat, this.currentArea.lng).subscribe({
        next: () => {
          this.uiService.showToast('success', 'Area Added', 'The new area has been created.');
          this.closeModal();
          this.loadAreas();
        },
        error: (err) => this.handleError(err)
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
