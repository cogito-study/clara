import React, { FunctionComponent } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/use-auth';
import { useAuthRoute } from '../../auth/hooks/use-auth-route';

export const PrivateRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {
  const login = useAuthRoute({ path: 'login' });
  const { authToken } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: login,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
