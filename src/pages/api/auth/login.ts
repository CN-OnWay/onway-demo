import type { NextApiRequest, NextApiResponse } from 'next';
import { ExternalLoginResponse, LoginRequest } from '@/types/auth';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExternalLoginResponse | { success: false; message: string }>,
) {
  if (req.method === 'POST') {
    const { email, password }: LoginRequest = req.body;
    
    // Проверка на admin/admin
    if (email === 'admin' && password === 'admin') {
      res.status(200).json({
        message: 'Login successful',
        user: {
          uid: 'admin-user-id',
          email: 'admin@example.com',
          name: 'Admin',
          last_name: 'User',
          rate: 'administrator',
          accessKey: 'admin-access-key',
        },
        accessToken: 'mock-access-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
}
