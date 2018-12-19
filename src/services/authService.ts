import * as H from 'history';
import { localStorageKeys, routePath } from '../constants';

const authenticationSuccess = (token: string, userID: string, history: H.History) => {
  localStorage.setItem(localStorageKeys.loggedInUserID, userID);
  localStorage.setItem(localStorageKeys.authToken, token);
  history.push(routePath.subjectInfo('NEU999')); // TODO: Change to ersebeszet subject code in PROD
};

export const authService = {
  authenticationSuccess,
};
