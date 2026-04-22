export type PropertyStatus = 'pending' | 'approved' | 'rejected';
export type ListingStatus = 'active' | 'sold';
export type PropertyType = 'house' | 'plot' | 'apartment' | 'commercial';
export type PropertyPurpose = 'sale' | 'rent';

export interface DashboardProperty {
  id: number;
  title: string;
  description: string;
  price: number;
  country: string;
  city: string;
  area: string;
  type: PropertyType;
  purpose: PropertyPurpose;
  status: PropertyStatus;
  listingStatus: ListingStatus;
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
  lastViewedAt?: Date | string | null;
  createdAt: Date;
  updatedAt: Date;
}
