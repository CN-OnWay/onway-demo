import {
  Route,
  CreateRouteRequest,
  UpdateRouteRequest,
  Transfer,
  CreateTransferRequest,
  ApiRoute,
  ApiTransfer,
} from './types';
import { mockRoutes, mockTransfers, getTransfersForRoute } from '../mocks/routes.mock';

// Mock данные вместо реальных API запросов
const routes = [...mockRoutes];
const transfers = { ...mockTransfers };

export const routesAPI = {
  // GET /routes
  getRoutes: async (): Promise<{ data: { data: ApiRoute[] } }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: { data: routes } });
      }, 300);
    });
  },

  // POST /routes
  createRoute: async (data: CreateRouteRequest): Promise<Route> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newRoute: Route = {
          id: 'route-' + Date.now(),
          name: data.name,
          start_point: data.start_point,
          end_point: data.end_point,
          distance: data.distance,
          duration: data.duration,
          price: data.price,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        resolve(newRoute);
      }, 300);
    });
  },

  // PUT /routes/:id
  updateRoute: async (id: string, data: UpdateRouteRequest): Promise<Route> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = routes.findIndex(r => r.id === id);
        if (index !== -1) {
          const updatedRoute: Route = {
            id,
            name: data.name || data.title || routes[index].title,
            start_point: '',
            end_point: '',
            distance: 0,
            duration: 0,
            price: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          resolve(updatedRoute);
        } else {
          reject(new Error('Route not found'));
        }
      }, 300);
    });
  },

  // DELETE /routes/:id
  deleteRoute: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = routes.findIndex(r => r.id === id);
        if (index !== -1) {
          routes.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Route not found'));
        }
      }, 200);
    });
  },

  // GET /routes/:id/transfers
  getRouteTransfers: async (
    id: string,
  ): Promise<{ message: string; data: ApiTransfer[] }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(getTransfersForRoute(id));
      }, 300);
    });
  },

  // PUT /routes/:routeId/transfers/:transferId
  updateRouteTransfer: async (
    routeId: string,
    transferId: string,
    data: Partial<ApiTransfer | CreateTransferRequest>,
  ): Promise<ApiTransfer> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (transfers[routeId]) {
          const index = transfers[routeId].findIndex(t => t.id === transferId);
          if (index !== -1) {
            transfers[routeId][index] = { ...transfers[routeId][index], ...data };
            resolve(transfers[routeId][index]);
          } else {
            reject(new Error('Transfer not found'));
          }
        } else {
          reject(new Error('Route not found'));
        }
      }, 300);
    });
  },

  // DELETE /routes/:routeId/transfers/:transferId
  deleteRouteTransfer: async (
    routeId: string,
    transferId: string,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (transfers[routeId]) {
          const index = transfers[routeId].findIndex(t => t.id === transferId);
          if (index !== -1) {
            transfers[routeId].splice(index, 1);
            resolve();
          } else {
            reject(new Error('Transfer not found'));
          }
        } else {
          reject(new Error('Route not found'));
        }
      }, 200);
    });
  },

  // POST /routes/:routeId/transfers
  createRouteTransfer: async (
    routeId: string,
    data: CreateTransferRequest,
  ): Promise<Transfer> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newTransfer: Transfer = {
          id: 'transfer-' + Date.now(),
          routeId: data.routeId,
          vehicleId: data.vehicleId,
          driverId: data.driverId,
          departureTime: data.departureTime,
          arrivalTime: data.arrivalTime,
          status: 'scheduled',
          passengers: 0,
          maxPassengers: data.maxPassengers,
        };
        resolve(newTransfer);
      }, 300);
    });
  },

  // POST /routes/:routeId/transfers (flexible payload for ApiTransfer-shaped data)
  createRouteTransferPartial: async (
    routeId: string,
    data: Partial<{
      transferName?: string;
      max6?: number;
      max9?: number;
      max14?: number;
      estimate?: [number, number];
    }>,
  ): Promise<ApiTransfer> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newTransfer: ApiTransfer = {
          id: 'transfer-' + Date.now(),
          transferName: data.transferName || 'New Transfer',
          max6: data.max6 || 0,
          max9: data.max9 || 0,
          max14: data.max14 || 0,
          estimate: data.estimate || [30, 45],
        };
        if (!transfers[routeId]) {
          transfers[routeId] = [];
        }
        transfers[routeId].push(newTransfer);
        resolve(newTransfer);
      }, 300);
    });
  },
};
