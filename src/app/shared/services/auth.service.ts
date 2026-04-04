import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, of } from 'rxjs';
import { UserRole, DashboardUser } from '../models';
import { LoginRequest, AuthResponse } from '../dtos/auth.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/auth'; // Default ASP.NET port

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        if (res.token) {
          localStorage.setItem('hf_token', res.token);
          localStorage.setItem('hf_user', JSON.stringify(res));
          localStorage.setItem('hf_role', res.role);
          localStorage.setItem('hf_userId', String(res.id));
        }
      })
    );
  }

  setRole(role: UserRole, userId?: number): void {
    localStorage.setItem('hf_role', role);
    if (userId) {
      localStorage.setItem('hf_userId', String(userId));
    }
  }

  getRole(): UserRole {
    return (localStorage.getItem('hf_role') as UserRole) || 'buyer';
  }

  getUserId(): number {
    return Number(localStorage.getItem('hf_userId')) || 0;
  }

  getUserName(): string {
    const user = JSON.parse(localStorage.getItem('hf_user') || '{}');
    return user.name || 'User';
  }

  getUserAvatar(): string {
    const user = JSON.parse(localStorage.getItem('hf_user') || '{}');
    return user.avatar || 'https://randomuser.me/api/portraits/men/1.jpg';
  }

  getToken(): string | null {
    return localStorage.getItem('hf_token');
  }

  logout(): void {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
