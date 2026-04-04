export type InquiryStatus = 'new' | 'assigned' | 'resolved';

export interface Inquiry {
  id: number;
  propertyId: number;
  propertyTitle: string;
  userId: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  message: string;
  status: InquiryStatus;
  assignedAgentId?: number;
  createdAt: Date;
}
