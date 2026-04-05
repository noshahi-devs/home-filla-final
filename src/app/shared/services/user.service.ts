import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardUser } from '../models';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private apiUrl = 'http://localhost:5230/api';

  private get headers() {
    return new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);
  }

  getUsers(): Observable<DashboardUser[]> {
    return this.http.get<DashboardUser[]>(`${this.apiUrl}/users`, { headers: this.headers });
  }

  updateUserStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}/status`, `"${status}"`, { headers: this.headers.set('Content-Type', 'application/json') });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`, { headers: this.headers });
  }
}
