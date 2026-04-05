export type AgentStatus = 'pending' | 'approved' | 'rejected' | 'active';

export interface DashboardAgent {
  id: number;
  userId: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  agencyName: string;
  listingsCount: number;
  totalSales: number;
  rating: number;
  status: AgentStatus;
  createdAt: Date;
}
