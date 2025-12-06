export interface Request {
  id: string;
  date: {
    _seconds: number;
    _nanoseconds: number;
  };
  dropOffLocation: string;
  email: string;
  name: string;
  pickUpAirport: string;
  pickUpDate: {
    _seconds: number;
    _nanoseconds: number;
  };
  pickUpTime: string[];
  status: string;
}

export interface CreateRequestRequest {
  dropOffLocation: string;
  email: string;
  name: string;
  pickUpAirport: string;
  pickUpDate: string;
  pickUpTime: {
    0: string;
    1: string;
    2: string;
  };
  status?: string;
}

export interface UpdateRequestRequest {
  dropOffLocation?: string;
  email?: string;
  name?: string;
  pickUpAirport?: string;
  pickUpDate?: string;
  pickUpTime?: {
    0?: string;
    1?: string;
    2?: string;
  };
  status?: string;
}

export interface RequestsResponse {
  message: string;
  data: Request[];
}
