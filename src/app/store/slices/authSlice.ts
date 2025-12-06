import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  email: string;
  last_name: string;
  name: string;
  rate: string;
  uuid: string;
}

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  uuid: string | null;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  uuid: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        user: {
          uid: string;
          email: string;
          name: string;
          last_name: string;
          rate: string;
          accessKey: string;
        };
        accessToken: string;
        refreshToken: string;
      }>,
    ) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.uuid = action.payload.user.uid;
      state.user = {
        email: action.payload.user.email,
        last_name: action.payload.user.last_name,
        name: action.payload.user.name,
        rate: action.payload.user.rate,
        uuid: action.payload.user.uid,
      };
      
      // Сохранение в localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        localStorage.setItem('isAuthenticated', 'true');
      }
    },
    logout: state => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.uuid = null;
      state.user = null;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('persist:root');
      }
    },
    updateTokens: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
      }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      }
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { login, logout, updateTokens, updateUser } = authSlice.actions;
export default authSlice.reducer;
