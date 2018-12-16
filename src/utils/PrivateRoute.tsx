import React, { FunctionComponent } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';

import { routePath, localStorageKeys } from '../constants';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props: RouteComponentProps<any>) =>
      localStorage.getItem(localStorageKeys.authToken) ? ( // TODO: Implement authentication service
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: routePath.root,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
