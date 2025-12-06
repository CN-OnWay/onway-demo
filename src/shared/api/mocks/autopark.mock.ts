import { Vehicle, VehiclesResponse } from '../autopark/types';
import vehicleImg1 from '@/app/imgs/img1.jpg';
import vehicleImg2 from '@/app/imgs/img2.webp';
import vehicleImg3 from '@/app/imgs/img3.webp';

export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    model: 'Mercedes-Benz Sprinter',
    status: true,
    bind: true,
    bindBy: 'driver-1',
    licence_plate: 'ABC-123',
    shortDesc: '16-seat passenger van',
    location: [55.7558, 37.6173],
    img: vehicleImg1.src,
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    model: 'Toyota Hiace',
    status: true,
    bind: false,
    licence_plate: 'XYZ-789',
    shortDesc: '12-seat minibus',
    location: [55.7512, 37.6184],
    img: vehicleImg2.src,
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    model: 'Ford Transit',
    status: false,
    bind: true,
    bindBy: 'driver-2',
    licence_plate: 'DEF-456',
    shortDesc: '14-seat passenger van',
    location: [55.7600, 37.6200],
    img: vehicleImg3.src,
    updated_at: new Date().toISOString(),
  },
];

export const mockVehiclesResponse: VehiclesResponse = {
  message: 'Vehicles retrieved successfully',
  data: mockVehicles,
};
