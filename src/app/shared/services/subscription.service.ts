import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface SubscriptionPlan {
  id: number;
  name: string;
  listingLimit: number;
  price: number;
  currency: string;
}

export interface MySubscriptionInfo {
  plan: SubscriptionPlan;
  used: number;
  remaining: number;
}

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private apiUrl = 'http://localhost:5230/api';

  private get headers() {
    return new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);
  }

  getPlans(): Observable<SubscriptionPlan[]> {
    return this.http.get<SubscriptionPlan[]>(`${this.apiUrl}/subscriptions/plans`);
  }

  getMySubscription(): Observable<MySubscriptionInfo> {
    return this.http.get<MySubscriptionInfo>(`${this.apiUrl}/subscriptions/me`, { headers: this.headers });
  }

  upgrade(planId: number): Observable<MySubscriptionInfo> {
    return this.http.post<MySubscriptionInfo>(
      `${this.apiUrl}/subscriptions/upgrade`,
      { planId },
      { headers: this.headers.set('Content-Type', 'application/json') }
    );
  }
}

