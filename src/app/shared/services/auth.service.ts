import { Injectable } from '@angular/core';
import { UserRole } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentRole: UserRole = 'admin';
  private currentUserId = 1;

  setRole(role: UserRole, userId: number): void {
    this.currentRole = role;
    this.currentUserId = userId;
    localStorage.setItem('hf_role', role);
    localStorage.setItem('hf_userId', String(userId));
  }

  getRole(): UserRole {
    return (localStorage.getItem('hf_role') as UserRole) || this.currentRole;
  }

  getUserId(): number {
    return Number(localStorage.getItem('hf_userId')) || this.currentUserId;
  }

  getUserName(): string {
    const names: Record<string, string> = {
      '1': 'Admin User', '2': 'Ali Hassan', '3': 'Sara Ahmed',
      '6': 'Ahmed Raza', '7': 'Zara Malik'
    };
    return names[String(this.getUserId())] || 'User';
  }

  getUserAvatar(): string {
    const avatars: Record<string, string> = {
      '1': 'https://randomuser.me/api/portraits/men/1.jpg',
      '2': 'https://randomuser.me/api/portraits/men/32.jpg',
      '3': 'https://randomuser.me/api/portraits/women/44.jpg',
      '6': 'https://randomuser.me/api/portraits/men/75.jpg',
      '7': 'https://randomuser.me/api/portraits/women/65.jpg',
    };
    return avatars[String(this.getUserId())] || 'https://randomuser.me/api/portraits/men/1.jpg';
  }

  logout(): void {
    localStorage.removeItem('hf_role');
    localStorage.removeItem('hf_userId');
  }
}
