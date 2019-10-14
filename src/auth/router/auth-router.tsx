import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { ExpiredFeedbackCard } from '../components/elements/link-expired';
import { ForgotPassword } from '../components/forgot-password';
import { Login } from '../components/login';
import { Register } from '../components/register';
import { ResetPassword } from '../components/reset-password';
import { useAuthRoute } from '../hooks/use-auth-route';

export const AuthRouter = () => {
  const login = useAuthRoute({ path: 'login' });
  const register = useAuthRoute({ path: 'register' });
  const resetPassword = useAuthRoute({ path: 'reset-password' });
  const forgotPassword = useAuthRoute({ path: 'forgot-password' });
  const linkExpired = useAuthRoute({ path: 'link-expired' });

  return (
    <Fragment>
      <Route path={register}>
        <Register />
      </Route>
      <Route path={login}>
        <Login />
      </Route>
      <Route path={forgotPassword}>
        <ForgotPassword />
      </Route>
      <Route path={resetPassword}>
        <ResetPassword />
      </Route>
      <Route path={linkExpired}>
        <ExpiredFeedbackCard />
      </Route>
    </Fragment>
  );
};
