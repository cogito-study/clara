import React, { FunctionComponent } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';

import { routePath } from '../constants';
import { UserProvider } from '../contexts/UserContext';
import { authService } from '../services/authService';

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
            pathname: routePath.root(),
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
