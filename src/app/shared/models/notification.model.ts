export type NotificationType = 'property_added' | 'property_approved' | 'property_rejected' | 'new_inquiry' | 'user_registered' | 'agent_approved' | 'payment_received';

export interface AppNotification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  icon: string;
  color: string;
  isRead: boolean;
  userId?: number;
  link?: string;
  createdAt: Date;
}
