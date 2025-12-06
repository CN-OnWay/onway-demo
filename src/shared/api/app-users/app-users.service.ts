import {
  AppUser,
  CreateAppUserRequest,
  UpdateAppUserRequest,
  AppUsersResponse,
} from './types';
import { mockAppUsers, mockAppUsersResponse } from '../mocks/app-users.mock';

// Mock данные вместо реальных API запросов
let appUsers = [...mockAppUsers];

export const appUsersAPI = {
  // GET /app-users
  getAppUsers: async (): Promise<AppUsersResponse> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          users: appUsers,
          total: appUsers.length,
          page: 1,
          limit: 10,
        });
      }, 300);
    });
  },

  // POST /app-users
  createAppUser: async (data: CreateAppUserRequest): Promise<AppUser> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newUser: AppUser = {
          id: 'user-' + Date.now(),
          email: data.email,
          name: data.name,
          last_name: data.last_name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          balance: 0,
          discount: data.discount,
          orders: [],
        };
        appUsers.push(newUser);
        resolve(newUser);
      }, 300);
    });
  },

  // PUT /app-users/:id
  updateAppUser: async (
    id: string,
    data: UpdateAppUserRequest,
  ): Promise<AppUser> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = appUsers.findIndex(u => u.id === id);
        if (index !== -1) {
          appUsers[index] = {
            ...appUsers[index],
            ...data,
            updated_at: new Date().toISOString(),
          };
          resolve(appUsers[index]);
        } else {
          reject(new Error('User not found'));
        }
      }, 300);
    });
  },

  // DELETE /app-users/:id
  deleteAppUser: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = appUsers.findIndex(u => u.id === id);
        if (index !== -1) {
          appUsers.splice(index, 1);
          resolve();
        } else {
          reject(new Error('User not found'));
        }
      }, 200);
    });
  },
};
