import React, { FunctionComponent, ReactNode } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';

import { routePath, localStorageKeys } from '../constants';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const renderComponent = (props: RouteComponentProps<any>): ReactNode =>
    localStorage.getItem(localStorageKeys.authToken) ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: routePath.root,
          state: { from: props.location },
        }}
      />
    );

  return <Route {...rest} render={renderComponent} />;
};
