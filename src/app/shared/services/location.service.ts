import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City, Area } from '../models';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private apiUrl = 'http://localhost:5230/api';

  private get headers() {
    return new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);
  }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/locations/cities`);
  }

  getAreas(cityId?: number): Observable<Area[]> {
    const url = cityId ? `${this.apiUrl}/locations/cities/${cityId}/areas` : `${this.apiUrl}/locations/areas`;
    return this.http.get<Area[]>(url);
  }

  addCity(name: string, province: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/locations/cities`, { name, province }, { headers: this.headers });
  }

  deleteCity(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/locations/cities/${id}`, { headers: this.headers });
  }

  addArea(cityId: number, name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/locations/cities/${cityId}/areas`, { name }, { headers: this.headers });
  }

  deleteArea(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/locations/areas/${id}`, { headers: this.headers });
  }
}
