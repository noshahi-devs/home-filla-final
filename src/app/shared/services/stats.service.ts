import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class StatsService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private apiUrl = 'http://localhost:5230/api';

  private get headers() {
    return new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);
  }

  getAdminStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/stats`, { headers: this.headers });
  }

  getSellerStats(sellerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/seller/${sellerId}/stats`, { headers: this.headers });
  }

  getBuyerStats(buyerId: number): Observable<any> {
    // Mocked for now to match original behavior
    return of({
      savedProperties: 5,
      inquiriesSent: 2,
      propertiesViewed: 28,
      recommended: 12,
    });
  }

  getMonthlyGrowth(): Observable<any> {
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
