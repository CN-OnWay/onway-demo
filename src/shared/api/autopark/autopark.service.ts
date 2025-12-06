import {
  CreateVehicleRequest,
  UpdateVehicleRequest,
  Vehicle,
  VehiclesResponse,
} from './types';
import { mockVehicles, mockVehiclesResponse } from '../mocks/autopark.mock';

// Mock данные вместо реальных API запросов
let vehicles = [...mockVehicles];

export const autoparkAPI = {
  // GET /autopark
  getVehicles: async (): Promise<VehiclesResponse> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          message: 'Vehicles retrieved successfully',
          data: vehicles,
        });
      }, 300);
    });
  },

  getVehicleById: async (id: string): Promise<Vehicle> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const vehicle = vehicles.find(v => v.id.toString() === id);
        if (vehicle) {
          resolve(vehicle);
        } else {
          reject(new Error('Vehicle not found'));
        }
      }, 200);
    });
  },

  // POST /autopark
  createVehicle: async (data: CreateVehicleRequest): Promise<Vehicle> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newVehicle: Vehicle = {
          id: Date.now().toString(),
          model: data.model,
          status: data.status === 'active',
          bind: false,
          shortDesc: data.shortDesc || '',
          licence_plate: data.license_plate,
          updated_at: new Date().toISOString(),
        };
        vehicles.push(newVehicle);
        resolve(newVehicle);
      }, 300);
    });
  },

  // PUT /autopark/:id
  updateVehicle: async (
    id: string,
    data: UpdateVehicleRequest,
  ): Promise<Vehicle> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = vehicles.findIndex(v => v.id.toString() === id);
        if (index !== -1) {
          vehicles[index] = {
            ...vehicles[index],
            ...data,
            updated_at: new Date().toISOString(),
          };
          resolve(vehicles[index]);
        } else {
          reject(new Error('Vehicle not found'));
        }
      }, 300);
    });
  },

  // DELETE /autopark/:id
  deleteVehicle: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = vehicles.findIndex(v => v.id.toString() === id);
        if (index !== -1) {
          vehicles.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Vehicle not found'));
        }
      }, 200);
    });
  },
};
