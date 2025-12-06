import { Request, RequestsResponse } from '../requests/types';

export const mockRequests: Request[] = [
  {
    id: 'req-1',
    date: {
      _seconds: Math.floor(Date.now() / 1000),
      _nanoseconds: 0,
    },
    dropOffLocation: 'Hotel Metropol, Moscow',
    email: 'john.doe@example.com',
    name: 'John Doe',
    pickUpAirport: 'Sheremetyevo International Airport (SVO)',
    pickUpDate: {
      _seconds: Math.floor(Date.now() / 1000) + 86400,
      _nanoseconds: 0,
    },
    pickUpTime: ['14', '30', '00'],
    status: 'pending',
  },
  {
    id: 'req-2',
    date: {
      _seconds: Math.floor(Date.now() / 1000) - 86400,
      _nanoseconds: 0,
    },
    dropOffLocation: 'Radisson Royal Hotel, Moscow',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    pickUpAirport: 'Domodedovo Airport (DME)',
    pickUpDate: {
      _seconds: Math.floor(Date.now() / 1000) + 172800,
      _nanoseconds: 0,
    },
    pickUpTime: ['10', '15', '00'],
    status: 'confirmed',
  },
  {
    id: 'req-3',
    date: {
      _seconds: Math.floor(Date.now() / 1000) - 172800,
      _nanoseconds: 0,
    },
    dropOffLocation: 'Lotte Hotel Moscow',
    email: 'bob.johnson@example.com',
    name: 'Bob Johnson',
    pickUpAirport: 'Vnukovo Airport (VKO)',
    pickUpDate: {
      _seconds: Math.floor(Date.now() / 1000) - 3600,
      _nanoseconds: 0,
    },
    pickUpTime: ['18', '00', '00'],
    status: 'completed',
  },
];

export const mockRequestsResponse: RequestsResponse = {
  message: 'Requests retrieved successfully',
  data: mockRequests,
};
