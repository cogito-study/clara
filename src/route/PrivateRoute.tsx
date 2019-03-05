import React, { FunctionComponent } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { UserProvider } from '../contexts/user/UserContext';
import { authService } from '../services/authService';
import { routeBuilder } from './routeBuilder';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props: RouteComponentProps<any>) =>
      authService.getAuthToken() ? (
        <UserProvider>
          <Component {...props} />
        </UserProvider>
      ) : (
        <Redirect
          to={{
            pathname: routeBuilder.root(),
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
