import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Toast {
  id: number;
  type: 'success' | 'error' | 'info' | 'processing';
  title: string;
  message: string;
  timeout?: number;
}

export interface ConfirmationRequest {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  resolve: (value: boolean) => void;
}

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private toastSubject = new Subject<Toast>();
  private confirmationSubject = new Subject<ConfirmationRequest | null>();

  toast$ = this.toastSubject.asObservable();
  confirmation$ = this.confirmationSubject.asObservable();

  private toastId = 0;

  showToast(type: Toast['type'], title: string, message: string, timeout: number = 4000): void {
    const id = ++this.toastId;
    this.toastSubject.next({ id, type, title, message, timeout });
  }

  showConfirmation(
    title: string,
    message: string,
    type: 'danger' | 'warning' | 'info' = 'danger',
    confirmText = 'Yes, Continue',
    cancelText = 'Cancel'
  ): Promise<boolean> {
    // Fallback to native window.confirm since there's no global modal listening to this Subject
    const result = window.confirm(`${title}\n\n${message}`);
    return Promise.resolve(result);
  }

  closeConfirmation(): void {
    this.confirmationSubject.next(null);
  }
}
