import ApolloClient from 'apollo-client';
import * as H from 'history';

import { localStorageKeys } from '../constants';
import { routeBuilder } from '../route/routeBuilder';

const authSuccess = (token: string, history: H.History) => {
  localStorage.setItem(localStorageKeys.authToken, token);
  history.push(routeBuilder.subjectInfo('ERSEB')); // TODO: Change to ersebeszet subject code in PROD
};

const getAuthToken = (): string | null => localStorage.getItem(localStorageKeys.authToken);

const logout = (history: H.History, client: ApolloClient<any> | null) => {
  if (client) {
    client.resetStore();
  }

  localStorage.removeItem(localStorageKeys.authToken);
  history.push(routeBuilder.root());
};

export const authService = {
  authSuccess,
  getAuthToken,
  logout,
};
