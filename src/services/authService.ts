import * as H from 'history';
import { localStorageKeys, routePath } from '../constants';

const authSuccess = (token: string, userID: string, history: H.History) => {
  console.log('authToken', token);
  localStorage.setItem(localStorageKeys.loggedInUserID, userID);
  localStorage.setItem(localStorageKeys.authToken, token);
  history.push(routePath.subjectInfo('NEU999')); // TODO: Change to ersebeszet subject code in PROD
};

const authToken = (): string | null => localStorage.getItem(localStorageKeys.authToken);

export const authService = {
  authSuccess,
  authToken,
};
