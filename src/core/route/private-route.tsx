import React, { FunctionComponent } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { authService } from '../../auth/services/auth-service';
import { routeBuilder } from './route-builder';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props: RouteComponentProps<any>) =>
      authService.getAuthToken() ? (
        <Component {...props} />
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
