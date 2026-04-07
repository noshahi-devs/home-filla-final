import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AppNotification } from '../models';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private apiUrl = 'http://localhost:5230/api';

  private get headers() {
    return new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);
  }

  getNotifications(): Observable<AppNotification[]> {
    const userId = this.auth.getUserId() || 1;
    return this.http.get<AppNotification[]>(`${this.apiUrl}/notifications?userId=${userId}`, { headers: this.headers });
  }

  getUnreadNotifications(): Observable<AppNotification[]> {
    return this.getNotifications().pipe(map(notifs => notifs.filter(n => !n.isRead)));
  }

  getAdminActivity(): Observable<AppNotification[]> {
    return this.http.get<AppNotification[]>(`${this.apiUrl}/notifications?userId=0`, { headers: this.headers });
  }

  markNotificationRead(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/notifications/${id}/read`, {}, { headers: this.headers });
  }

  markAllNotificationsRead(): Observable<any> {
    const userId = this.auth.getUserId() || 1;
    return this.http.put(`${this.apiUrl}/notifications/read-all?userId=${userId}`, {}, { headers: this.headers });
  }
}
