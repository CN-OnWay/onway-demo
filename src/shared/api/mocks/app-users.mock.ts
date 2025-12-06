import { AppUser, AppUsersResponse } from '../app-users/types';

export const mockAppUsers: AppUser[] = [
  {
    id: 'user-1',
    email: 'user1@example.com',
    name: 'Michael',
    last_name: 'Brown',
    created_at: new Date(Date.now() - 2592000000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    balance: 1500.50,
    discount: '5%',
    orders: ['order-1', 'order-3', 'order-7'],
  },
  {
    id: 'user-2',
    email: 'user2@example.com',
    name: 'Sarah',
    last_name: 'Johnson',
    created_at: new Date(Date.now() - 5184000000).toISOString(),
    updated_at: new Date(Date.now() - 172800000).toISOString(),
    balance: 2300.75,
    discount: '10%',
    orders: ['order-2', 'order-5'],
  },
  {
    id: 'user-3',
    email: 'user3@example.com',
    name: 'David',
    last_name: 'Wilson',
    created_at: new Date(Date.now() - 7776000000).toISOString(),
    updated_at: new Date().toISOString(),
    balance: 850.00,
    discount: '0%',
    orders: ['order-4', 'order-6', 'order-8', 'order-9'],
  },
];

export const mockAppUsersResponse: AppUsersResponse = {
  users: mockAppUsers,
  total: mockAppUsers.length,
  page: 1,
  limit: 10,
};
