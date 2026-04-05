import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inquiry } from '../models';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class InquiryService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private apiUrl = 'http://localhost:5230/api';

  private get headers() {
    return new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);
  }

  getInquiries(): Observable<Inquiry[]> {
    return this.http.get<Inquiry[]>(`${this.apiUrl}/inquiries`, { headers: this.headers });
  }

  updateInquiryStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/inquiries/${id}/status`, `"${status}"`, { headers: this.headers.set('Content-Type', 'application/json') });
  }
}
