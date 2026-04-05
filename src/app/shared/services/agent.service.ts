import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardAgent } from '../models';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AgentService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private apiUrl = 'http://localhost:5230/api';

  private get headers() {
    return new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);
  }

  getAgents(): Observable<DashboardAgent[]> {
    return this.http.get<DashboardAgent[]>(`${this.apiUrl}/agents`, { headers: this.headers });
  }

  updateAgentStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/agents/${id}/status`, `"${status}"`, { headers: this.headers.set('Content-Type', 'application/json') });
  }
}
