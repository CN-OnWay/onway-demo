import { LoginRequest, ExternalLoginResponse } from '@/pages/api/auth/types';

export const authAPI = {
  login: async (data: LoginRequest): Promise<ExternalLoginResponse> => {
    try {
      // Локальная проверка admin/admin
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: async (): Promise<{ success: boolean; message: string }> => {
    // Очистка localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('persist:root');
    }
    return { success: true, message: 'Logged out successfully' };
  },
};
