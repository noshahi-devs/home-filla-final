export interface City {
  id: number;
  name: string;
  province: string;
  propertyCount: number;
}

export interface Area {
  id: number;
  cityId: number;
  name: string;
  propertyCount: number;
}
