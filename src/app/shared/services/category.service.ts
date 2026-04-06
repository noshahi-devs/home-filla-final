import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Category {
  id: number;
  name: string;
  icon?: string;
  sortOrder: number;
}

export interface CategoryInput {
  name: string;
  icon?: string;
  sortOrder: number;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private apiUrl = 'http://localhost:5230/api';

  private get headers() {
    return new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  createCategory(input: CategoryInput): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/categories`, input, { headers: this.headers });
  }

  updateCategory(id: number, input: CategoryInput): Observable<any> {
    return this.http.put(`${this.apiUrl}/categories/${id}`, input, { headers: this.headers });
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categories/${id}`, { headers: this.headers });
  }
}
