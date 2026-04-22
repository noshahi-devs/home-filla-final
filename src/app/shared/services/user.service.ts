import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardUser } from '../models';
import { AuthService } from './auth.service';

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  role: string;
}

export interface UpdateUserPayload {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  avatar?: string;
  role: string;
}

export interface MyProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  status: string;
  agencyName?: string;
  bio?: string;
  rating?: number;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private apiUrl = 'http://localhost:5230/api';

  private get headers() {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${this.auth.getToken()}`)
      .set('Content-Type', 'application/json');
  }

  getUsers(): Observable<DashboardUser[]> {
    return this.http.get<DashboardUser[]>(`${this.apiUrl}/users`, { headers: this.headers });
  }

  getMe(): Observable<MyProfile> {
    return this.http.get<MyProfile>(`${this.apiUrl}/users/me`, { headers: this.headers });
  }

  updateMe(payload: { name: string; phone?: string; agencyName?: string; bio?: string; avatar?: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/me`, payload, { headers: this.headers });
  }

  createUser(payload: CreateUserPayload): Observable<DashboardUser> {
    return this.http.post<DashboardUser>(`${this.apiUrl}/users`, payload, { headers: this.headers });
  }

  updateUser(id: number, payload: UpdateUserPayload): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, payload, { headers: this.headers });
  }

  updateUserStatus(id: number, status: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/users/${id}/status`,
      `"${status}"`,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`).set('Content-Type', 'application/json') }
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`, { headers: this.headers });
  }
}
