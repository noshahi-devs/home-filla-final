import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface ConversationSummary {
  threadKey: string;
  otherUser: { id: number; name: string; email: string; avatar?: string } | null;
  property: { id: number; title: string } | null;
  lastMessage: string;
  lastSentAt: string;
  unreadCount: number;
}

export interface ChatMessage {
  id: number;
  propertyId?: number | null;
  senderUserId: number;
  recipientUserId: number;
  body: string;
  sentAt: string;
  readAt?: string | null;
  threadKey: string;
}

@Injectable({ providedIn: 'root' })
export class MessageService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private apiUrl = 'http://localhost:5230/api';

  private get headers() {
    return new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);
  }

  getConversations(): Observable<ConversationSummary[]> {
    return this.http.get<ConversationSummary[]>(`${this.apiUrl}/messages/conversations`, { headers: this.headers });
  }

  getThread(otherUserId: number, propertyId?: number | null): Observable<ChatMessage[]> {
    const prop = propertyId ? `&propertyId=${propertyId}` : '';
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/messages/thread?otherUserId=${otherUserId}${prop}`, { headers: this.headers });
  }

  send(recipientUserId: number, body: string, propertyId?: number | null): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(
      `${this.apiUrl}/messages`,
      { recipientUserId, body, propertyId: propertyId ?? null },
      { headers: this.headers.set('Content-Type', 'application/json') }
    );
  }
}

