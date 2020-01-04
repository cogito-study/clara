import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  ActivateInvitation,
  ActivateRegistration,
  ForgotPassword,
  Login,
  NewMajorRequest,
  Register,
  ResetPassword,
} from '../components';
import { LinkExpired } from '../components/feedback/link-expired';
import { authRoute } from '../utils/auth-route';

export const AuthRouter = () => {
  return (
    <Switch>
      <Route path={authRoute({ path: 'register' })}>
        <Register />
      </Route>
      <Route path={authRoute({ path: 'login' })}>
        <Login />
      </Route>
      <Route path={authRoute({ path: 'forgot-password' })}>
        <ForgotPassword />
      </Route>
      <Route path={authRoute({ path: 'reset-password' })}>
        <ResetPassword />
      </Route>
      <Route path={authRoute({ path: 'activate-invitation' })}>
        <ActivateInvitation />
      </Route>
      <Route path={authRoute({ path: 'activate-registration' })}>
        <ActivateRegistration />
      </Route>
      <Route path={authRoute({ path: 'new-major' })}>
        <NewMajorRequest />
      </Route>
      <Route path={authRoute({ path: 'link-expired' })}>
        <LinkExpired />
      </Route>
    </Switch>
  );
};
