import React from 'react';
import { AuthLayout } from './layout/auth-layout';
import { AuthRouter } from './router/auth-router';

const Auth = () => (
  <AuthLayout>
    <AuthRouter />
  </AuthLayout>
);

// eslint-disable-next-line import/no-default-export
export default Auth;
