export interface Payment {
  id: number;
  userId: number;
  userName?: string;
  amount: number;
  purpose: string;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
}

export interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  listings: number | string;
  featured: number;
  color?: string;
  features?: string[];
}
