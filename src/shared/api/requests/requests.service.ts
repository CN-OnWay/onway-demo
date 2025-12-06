import {
  Request,
  CreateRequestRequest,
  UpdateRequestRequest,
  RequestsResponse,
} from './types';
import { mockRequests } from '../mocks/requests.mock';

// Mock данные вместо реальных API запросов
const requests = [...mockRequests];

export const requestsAPI = {
  // GET /requests
  getRequests: async (): Promise<RequestsResponse> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          message: 'Requests retrieved successfully',
          data: requests,
        });
      }, 300);
    });
  },

  // POST /requests
  createRequest: async (data: CreateRequestRequest): Promise<Request> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newRequest: Request = {
          id: 'req-' + Date.now(),
          date: {
            _seconds: Math.floor(Date.now() / 1000),
            _nanoseconds: 0,
          },
          dropOffLocation: data.dropOffLocation,
          email: data.email,
          name: data.name,
          pickUpAirport: data.pickUpAirport,
          pickUpDate: {
            _seconds: Math.floor(new Date(data.pickUpDate).getTime() / 1000),
            _nanoseconds: 0,
          },
          pickUpTime: [data.pickUpTime[0], data.pickUpTime[1], data.pickUpTime[2]],
          status: data.status || 'pending',
        };
        requests.push(newRequest);
        resolve(newRequest);
      }, 300);
    });
  },

  // PUT /requests/:id
  updateRequest: async (
    id: string,
    data: UpdateRequestRequest,
  ): Promise<Request> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = requests.findIndex(r => r.id === id);
        if (index !== -1) {
          const updatedRequest: Request = {
            ...requests[index],
            dropOffLocation: data.dropOffLocation ?? requests[index].dropOffLocation,
            email: data.email ?? requests[index].email,
            name: data.name ?? requests[index].name,
            pickUpAirport: data.pickUpAirport ?? requests[index].pickUpAirport,
            pickUpDate: data.pickUpDate 
              ? { _seconds: Math.floor(new Date(data.pickUpDate).getTime() / 1000), _nanoseconds: 0 }
              : requests[index].pickUpDate,
            pickUpTime: data.pickUpTime 
              ? [data.pickUpTime[0] || requests[index].pickUpTime[0], data.pickUpTime[1] || requests[index].pickUpTime[1], data.pickUpTime[2] || requests[index].pickUpTime[2]]
              : requests[index].pickUpTime,
            status: data.status ?? requests[index].status,
          };
          requests[index] = updatedRequest;
          resolve(requests[index]);
        } else {
          reject(new Error('Request not found'));
        }
      }, 300);
    });
  },

  // DELETE /requests/:id
  deleteRequest: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = requests.findIndex(r => r.id === id);
        if (index !== -1) {
          requests.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Request not found'));
        }
      }, 200);
    });
  },
};
