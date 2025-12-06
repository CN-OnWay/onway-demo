export interface LoginRequest {
  email: string;
  password: string;
}

export interface ExternalLoginResponse {
  message: string;
  user: {
    uid: string;
    email: string;
    name: string;
    last_name: string;
    rate: string;
    accessKey: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface LocalLoginResponse {
  success: boolean;
  user?: {
    email: string;
    name: string;
  };
  message?: string;
}

export type LoginResponse = LocalLoginResponse;
