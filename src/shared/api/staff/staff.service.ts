import {
  CreateStaffRequest,
  Staff,
  UpdateStaffRequest,
  StaffResponse,
} from './types';
import { mockStaff } from '../mocks/staff.mock';

// Mock данные вместо реальных API запросов
const staff = [...mockStaff];

export const staffAPI = {
  // GET /staff
  getStaff: async (): Promise<StaffResponse> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: staff });
      }, 300);
    });
  },

  // POST /staff
  createStaffMember: async (data: CreateStaffRequest): Promise<Staff> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newStaff: Staff = {
          id: 'staff-' + Date.now(),
          email: data.email,
          bindCard: data.bindCard || '',
          bind: false,
          lastLogin: {
            _seconds: Math.floor(Date.now() / 1000),
            _nanoseconds: 0,
          },
          lastUseQR: {
            _seconds: Math.floor(Date.now() / 1000),
            _nanoseconds: 0,
          },
          dateOfBirth: data.dateOfBirth,
          name: data.name,
          lastName: data.lastName,
        };
        staff.push(newStaff);
        resolve(newStaff);
      }, 300);
    });
  },

  // PUT /staff/:id
  updateStaffMember: async (
    id: string,
    data: UpdateStaffRequest,
  ): Promise<Staff> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = staff.findIndex(s => s.id === id);
        if (index !== -1) {
          staff[index] = { ...staff[index], ...data };
          resolve(staff[index]);
        } else {
          reject(new Error('Staff member not found'));
        }
      }, 300);
    });
  },

  // DELETE /staff/:id
  deleteStaffMember: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = staff.findIndex(s => s.id === id);
        if (index !== -1) {
          staff.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Staff member not found'));
        }
      }, 200);
    });
  },
};
