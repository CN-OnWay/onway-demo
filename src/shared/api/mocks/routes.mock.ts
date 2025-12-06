import { ApiRoute, ApiTransfer } from '../routes/types';

export const mockRoutes: ApiRoute[] = [
  {
    id: 'route-1',
    title: 'Airport to City Center',
    status: true,
  },
  {
    id: 'route-2',
    title: 'City Center to Business District',
    status: true,
  },
  {
    id: 'route-3',
    title: 'Hotel Route A',
    status: false,
  },
];

export const mockTransfers: Record<string, ApiTransfer[]> = {
  'route-1': [
    {
      id: 'transfer-1-1',
      transferName: 'Morning Route',
      max6: 2,
      max9: 1,
      max14: 0,
      estimate: [45, 60],
    },
    {
      id: 'transfer-1-2',
      transferName: 'Afternoon Route',
      max6: 1,
      max9: 2,
      max14: 1,
      estimate: [50, 70],
    },
  ],
  'route-2': [
    {
      id: 'transfer-2-1',
      transferName: 'Express Route',
      max6: 3,
      max9: 0,
      max14: 0,
      estimate: [30, 40],
    },
  ],
  'route-3': [
    {
      id: 'transfer-3-1',
      transferName: 'Standard Route',
      max6: 1,
      max9: 1,
      max14: 1,
      estimate: [35, 50],
    },
  ],
};

export const mockRoutesResponse = {
  data: {
    data: mockRoutes,
  },
};

export const getTransfersForRoute = (routeId: string) => {
  return {
    message: 'Transfers retrieved successfully',
    data: mockTransfers[routeId] || [],
  };
};
