export interface City {
  id: number;
  name: string;
  province: string;
  propertyCount: number;
  lat?: number;
  lng?: number;
}

export interface Area {
  id: number;
  cityId: number;
  name: string;
  propertyCount: number;
  lat?: number;
  lng?: number;
}
