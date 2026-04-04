export type PropertyStatus = 'pending' | 'approved' | 'rejected';
export type PropertyType = 'house' | 'plot' | 'apartment' | 'commercial';
export type PropertyPurpose = 'sale' | 'rent';

export interface DashboardProperty {
  id: number;
  title: string;
  description: string;
  price: number;
  city: string;
  area: string;
  type: PropertyType;
  purpose: PropertyPurpose;
  status: PropertyStatus;
  images: string[];
  beds: number;
  baths: number;
  sqft: number;
  mapLat?: number;
  mapLng?: number;
  sellerId: number;
  agentId?: number;
  isFeatured: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}
