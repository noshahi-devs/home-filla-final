export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  token: string;
}

export interface PropertyDto {
  id: number;
  title: string;
  price: number;
  city: string;
  area: string;
  status: string;
  createdAt: string;
}
