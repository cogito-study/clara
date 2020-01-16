import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthToken } from '../../auth/hooks';
import { authRoute } from '../../auth/utils/auth-route';

export const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { authToken } = useAuthToken();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: authRoute({ path: 'login' }),
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
