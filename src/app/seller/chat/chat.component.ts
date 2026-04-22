import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService, ConversationSummary, ChatMessage } from '../../shared/services/message.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-seller-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class SellerChatComponent implements OnInit {
  isLoading = true;
  conversations: ConversationSummary[] = [];
  selected: ConversationSummary | null = null;
  thread: ChatMessage[] = [];
  draft = '';

  constructor(private messages: MessageService, private auth: AuthService) {}

  ngOnInit(): void {
    this.reloadConversations();
  }

  reloadConversations(): void {
    this.isLoading = true;
    this.messages.getConversations().subscribe({
      next: (convos) => {
        this.conversations = convos || [];
        this.isLoading = false;
        if (!this.selected && this.conversations.length > 0) {
          this.select(this.conversations[0]);
        }
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  select(c: ConversationSummary): void {
    this.selected = c;
    const otherId = c.otherUser?.id || 0;
    const propertyId = c.property?.id ?? null;
    if (!otherId) return;

    this.messages.getThread(otherId, propertyId).subscribe({
      next: (msgs) => {
        this.thread = msgs || [];
        this.scrollToBottom();
        this.reloadConversations();
      },
    });
  }

  send(): void {
    const text = this.draft.trim();
    if (!text || !this.selected?.otherUser) return;
    const otherId = this.selected.otherUser.id;
    const propertyId = this.selected.property?.id ?? null;

    this.draft = '';
    this.messages.send(otherId, text, propertyId).subscribe({
      next: (msg) => {
        this.thread = [...this.thread, msg];
        this.scrollToBottom();
        this.reloadConversations();
      },
    });
  }

  isMine(m: ChatMessage): boolean {
    return m.senderUserId === this.auth.getUserId();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const el = document.getElementById('chat-thread');
      if (el) el.scrollTop = el.scrollHeight;
    }, 0);
  }
}

