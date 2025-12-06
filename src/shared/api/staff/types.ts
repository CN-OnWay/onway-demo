export interface Staff {
  id: string;
  email: string;
  bindCard: string;
  bind: boolean;
  lastLogin: {
    _seconds: number;
    _nanoseconds: number;
  };
  lastUseQR: {
    _seconds: number;
    _nanoseconds: number;
  };
  dateOfBirth: string;
  name: string;
  lastName: string;
}

export interface CreateStaffRequest {
  email: string;
  name: string;
  lastName: string;
  dateOfBirth: string;
  bindCard?: string;
}

export interface UpdateStaffRequest {
  email?: string;
  name?: string;
  lastName?: string;
  dateOfBirth?: string;
  bindCard?: string;
  bind?: boolean;
}

export interface StaffResponse {
  data: Staff[];
}
