import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { ForgotPassword, Login, Register, ResetPassword } from '../components';
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
    </Fragment>
  );
};
