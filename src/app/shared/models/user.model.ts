export type UserRole = 'admin' | 'buyer' | 'seller' | 'agent';
export type UserStatus = 'active' | 'blocked' | 'pending';

export interface DashboardUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
}