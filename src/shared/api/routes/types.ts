export interface Route {
  id: string;
  name: string;
  start_point: string;
  end_point: string;
  distance: number;
  duration: number;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface CreateRouteRequest {
  name: string;
  start_point: string;
  end_point: string;
  distance: number;
  duration: number;
  price: number;
}

export interface UpdateRouteRequest {
  name?: string;
  title?: string;
  start_point?: string;
  end_point?: string;
  distance?: number;
  duration?: number;
  price?: number;
  status?: boolean;
}

export interface RoutesResponse {
  routes: Route[];
  total: number;
  page: number;
  limit: number;
}

export interface Transfer {
  id: string;
  routeId: string;
  vehicleId: string;
  driverId: string;
  departureTime: string;
  arrivalTime: string;
  status: string;
  passengers: number;
  maxPassengers: number;
}

export interface CreateTransferRequest {
  routeId: string;
  vehicleId: string;
  driverId: string;
  departureTime: string;
  arrivalTime: string;
  maxPassengers: number;
}

export interface UpdateTransferRequest {
  transferName?: string;
  max6?: number;
  max9?: number;
  max14?: number;
  estimate?: [number, number];
}

export interface ApiRoute {
  id: string;
  title: string;
  status: boolean;
}
export interface ApiTransfer {
  id: string;
  transferName: string;
  max6: number;
  max9: number;
  max14: number;
  estimate: [number, number];
}

export interface RouteWithTransfers extends ApiRoute {
  transfers: {
    message: string;
    data: ApiTransfer[];
  };
}
