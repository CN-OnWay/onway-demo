import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return {
    isAuthenticated: auth.isAuthenticated,
    accessToken: auth.accessToken,
    refreshToken: auth.refreshToken,
    uuid: auth.uuid,
    user: auth.user,
  };
};
