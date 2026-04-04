import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map, catchError, of } from 'rxjs';
import { DashboardProperty, DashboardUser, DashboardAgent, City, Area, Inquiry, AppNotification } from '../models';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class MockDataService { // Keeping name for minimal breaking changes, but switching to real API
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private apiUrl = 'http://localhost:5000/api';

  private get headers() {
    return new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);
  }

  // ── Properties ──────────────────────────────────────────
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

  // ── Users ───────────────────────────────────────────────
  getUsers(): Observable<DashboardUser[]> {
    return this.http.get<DashboardUser[]>(`${this.apiUrl}/users`, { headers: this.headers });
  }

  updateUserStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}/status`, `"${status}"`, { headers: this.headers.set('Content-Type', 'application/json') });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`, { headers: this.headers });
  }

  // ── Locations ──────────────────────────────────────────
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

  // ── Inquiries & Notifications (Mocked or real endpoints)
  getInquiries(): Observable<Inquiry[]> {
    return this.http.get<Inquiry[]>(`${this.apiUrl}/inquiries`, { headers: this.headers });
  }

  updateInquiryStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/inquiries/${id}/status`, `"${status}"`, { headers: this.headers.set('Content-Type', 'application/json') });
  }

  getNotifications(): Observable<AppNotification[]> {
    return this.http.get<AppNotification[]>(`${this.apiUrl}/notifications`, { headers: this.headers });
  }

  getUnreadNotifications(): Observable<AppNotification[]> {
    return this.getNotifications().pipe(map(notifs => notifs.filter(n => !n.isRead)));
  }

  markNotificationRead(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/notifications/${id}/read`, {}, { headers: this.headers });
  }

  markAllNotificationsRead(): Observable<any> {
    return this.http.put(`${this.apiUrl}/notifications/read-all`, {}, { headers: this.headers });
  }

  // ── Agents ──────────────────────────────────────────────
  getAgents(): Observable<DashboardAgent[]> {
    return this.http.get<DashboardAgent[]>(`${this.apiUrl}/agents`, { headers: this.headers });
  }

  updateAgentStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/agents/${id}/status`, `"${status}"`, { headers: this.headers.set('Content-Type', 'application/json') });
  }

  // ── Featured ──────────────────────────────────────────
  toggleFeatured(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/properties/${id}/toggle-featured`, {}, { headers: this.headers });
  }

  // ── Dashboard Stats ─────────────────────────────────────
  getAdminStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/stats`, { headers: this.headers });
  }

  getSellerStats(sellerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/seller/${sellerId}/stats`, { headers: this.headers });
  }

  getBuyerStats(buyerId: number): Observable<any> {
    // Returning mock data for now as specific endpoint isn't in plan yet, 
    // but typically would be this.http.get(`${this.apiUrl}/buyer/${buyerId}/stats`)
    return of({
      savedProperties: 5,
      inquiriesSent: 2,
      propertiesViewed: 28,
      recommended: 12,
    });
  }

  getMonthlyGrowth(): Observable<any> {
    // For now returning mock data until endpoint is ready
    return of([
      { month: 'Oct', count: 8 }, { month: 'Nov', count: 12 },
      { month: 'Dec', count: 15 }, { month: 'Jan', count: 22 },
      { month: 'Feb', count: 18 }, { month: 'Mar', count: 28 },
    ]);
  }

  getPropertiesByCity(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/properties-by-city`, { headers: this.headers });
  }

  getRecentActivity(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/recent-activity`, { headers: this.headers });
  }
}
