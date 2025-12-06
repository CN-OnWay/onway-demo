export interface Vehicle {
  id: number | string;
  model: string;
  status: boolean;
  bind: boolean;
  bindBy?: string;
  updated_at?: string;
  shortDesc: string;
  licence_plate?: string;
  location?: number[];
  img?: string;
}

export interface CreateVehicleRequest {
  model: string;
  license_plate?: string;
  capacity?: number;
  status: string;
  shortDesc?: string;
}

export interface UpdateVehicleRequest {
  model?: string;
  license_plate?: string;
  capacity?: number;
  status?: string;
  shortDesc?: string;
  bindBy?: string;
}

export interface VehiclesResponse {
  message: string;
  data: Vehicle[];
}
