import * as H from 'history';
import { localStorageKeys, routePath } from '../constants';
import ApolloClient from 'apollo-client';

const authSuccess = (token: string, history: H.History) => {
  localStorage.setItem(localStorageKeys.authToken, token);
  history.push(routePath.subjectInfo('BIOIN124')); // TODO: Change to ersebeszet subject code in PROD
};

const getAuthToken = (): string | null => localStorage.getItem(localStorageKeys.authToken);

const logout = (history: H.History, client: ApolloClient<any> | null) => {
  if (client) {
    client.resetStore();
  }

  localStorage.removeItem(localStorageKeys.authToken);
  history.push(routePath.root());
};

export const authService = {
  authSuccess,
  getAuthToken,
  logout,
};
