import { useLocalStorage } from 'web-api-hooks';

export const AUTH_TOKEN_KEY = 'AUTH_TOKEN';

export const useAuthToken = () => {
  const [authToken, setAuthToken] = useLocalStorage<string>(AUTH_TOKEN_KEY);
  const removeAuthToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);

  return { authToken, setAuthToken, removeAuthToken };
};
