import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DashboardProperty } from '../models';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private apiUrl = 'http://localhost:5230/api';

  private get headers() {
    return new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);
  }

  getProperties(): Observable<DashboardProperty[]> {
    return this.http.get<DashboardProperty[]>(`${this.apiUrl}/properties`);
  }

  getPropertyById(id: number): Observable<DashboardProperty> {
    return this.http.get<DashboardProperty>(`${this.apiUrl}/properties/${id}`);
  }

  getPropertiesByStatus(status: string): Observable<DashboardProperty[]> {
    return this.getProperties().pipe(map(props => props.filter(p => p.status === status)));
  }

  getPropertiesBySeller(sellerId: number): Observable<DashboardProperty[]> {
    return this.http.get<DashboardProperty[]>(`${this.apiUrl}/properties/seller/${sellerId}`, { headers: this.headers });
  }

  getFeaturedProperties(): Observable<DashboardProperty[]> {
    return this.getProperties().pipe(map(props => props.filter(p => p.isFeatured)));
  }

  updatePropertyStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/properties/${id}/status`, `"${status}"`, { headers: this.headers.set('Content-Type', 'application/json') });
  }

  deleteProperty(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/properties/${id}`, { headers: this.headers });
  }

  addProperty(property: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/properties`, property, { headers: this.headers });
  }

  updateProperty(id: number, property: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/properties/${id}`, property, { headers: this.headers });
  }

  toggleFeatured(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/properties/${id}/toggle-featured`, {}, { headers: this.headers });
  }
}
