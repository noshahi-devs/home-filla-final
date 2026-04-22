export type InquiryStatus = 'new' | 'assigned' | 'responded' | 'resolved';

export interface Inquiry {
  id: number;
  propertyId: number;
  propertyTitle: string;
  sellerId?: number;
  userId: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  message: string;
  status: InquiryStatus;
  assignedAgentId?: number;
  respondedAt?: Date | string | null;
  createdAt: Date;
}
