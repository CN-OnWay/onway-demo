export interface AppUser {
  id: string;
  email: string;
  name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
  balance: number;
  discount: string;
  orders: string[];
}

export interface CreateAppUserRequest {
  email: string;
  name: string;
  last_name: string;
  discount: string;
  password: string;
}

export interface UpdateAppUserRequest {
  email?: string;
  name?: string;
  last_name?: string;
  discount?: string;
  password?: string;
}

export interface AppUsersResponse {
  users: AppUser[];
  total: number;
  page: number;
  limit: number;
}
