import { useApolloClient } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { authRoute } from '../utils/auth-route';
import { useAuthToken } from './use-auth-token';

export const useLogout = () => {
  const { removeAuthToken } = useAuthToken();
  const history = useHistory();
  const client = useApolloClient();

  const logout = () => {
    history.push(authRoute({ path: 'login' }));
    client.stop();
    client.resetStore();
    removeAuthToken();
  };

  return logout;
};
