import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { ExpiredFeedbackCard } from '../components/elements/link-expired';
import { ForgotPassword } from '../components/forgot-password';
import { Login } from '../components/login';
import { Register } from '../components/register';
import { ResetPassword } from '../components/reset-password';
import { authRoute } from '../utils/auth-route';

export const AuthRouter = () => {
  return (
    <Fragment>
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
      <Route path={authRoute({ path: 'link-expired' })}>
        <ExpiredFeedbackCard />
      </Route>
    </Fragment>
  );
};
