import { Box } from 'grommet';
import React, { FunctionComponent } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import { RegisterContainer } from '../containers/Register/RegisterContainer';
import { routeBuilder } from '../route/routeBuilder';
import { Footer } from '../ui/components';

const AuthenticationPage: FunctionComponent<RouteComponentProps> = () => (
  <Box align="center">
    <Box
      fill
      align="center"
      justify="center"
      background="light"
      pad={{ bottom: 'large' }}
      style={{ minHeight: '98vh' }}
    >
      <Route path={routeBuilder.register()} component={RegisterContainer} />
      <Route path={routeBuilder.login()} render={() => <div>Login Page</div>} />
    </Box>
    <Footer />
  </Box>
);

export default AuthenticationPage;
