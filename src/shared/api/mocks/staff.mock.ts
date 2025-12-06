import { Staff, StaffResponse } from '../staff/types';

export const mockStaff: Staff[] = [
  {
    id: 'staff-1',
    email: 'driver1@example.com',
    bindCard: 'card-001',
    bind: true,
    lastLogin: {
      _seconds: Math.floor(Date.now() / 1000) - 3600,
      _nanoseconds: 0,
    },
    lastUseQR: {
      _seconds: Math.floor(Date.now() / 1000) - 7200,
      _nanoseconds: 0,
    },
    dateOfBirth: '1985-05-15',
    name: 'Ivan',
    lastName: 'Petrov',
  },
  {
    id: 'staff-2',
    email: 'driver2@example.com',
    bindCard: 'card-002',
    bind: true,
    lastLogin: {
      _seconds: Math.floor(Date.now() / 1000) - 1800,
      _nanoseconds: 0,
    },
    lastUseQR: {
      _seconds: Math.floor(Date.now() / 1000) - 5400,
      _nanoseconds: 0,
    },
    dateOfBirth: '1990-08-22',
    name: 'Sergey',
    lastName: 'Ivanov',
  },
  {
    id: 'staff-3',
    email: 'manager@example.com',
    bindCard: 'card-003',
    bind: false,
    lastLogin: {
      _seconds: Math.floor(Date.now() / 1000) - 86400,
      _nanoseconds: 0,
    },
    lastUseQR: {
      _seconds: Math.floor(Date.now() / 1000) - 90000,
      _nanoseconds: 0,
    },
    dateOfBirth: '1982-03-10',
    name: 'Anna',
    lastName: 'Smirnova',
  },
];

export const mockStaffResponse: StaffResponse = {
  data: mockStaff,
};
