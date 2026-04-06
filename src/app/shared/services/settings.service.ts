import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SystemSetting } from '../models/setting.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5230/api/settings';

  getSettings(): Observable<SystemSetting[]> {
    return this.http.get<SystemSetting[]>(this.apiUrl);
  }

  getSettingByKey(key: string): Observable<SystemSetting> {
    return this.http.get<SystemSetting>(`${this.apiUrl}/${key}`);
  }

  saveSetting(setting: any): Observable<SystemSetting> {
    return this.http.post<SystemSetting>(this.apiUrl, setting);
  }

  updateSetting(id: number, setting: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, setting);
  }
}
