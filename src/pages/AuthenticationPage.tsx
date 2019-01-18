import { Box } from 'grommet';
import React, { FunctionComponent } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import { AuthenticationContainer } from '../containers/Authentication/AuthenticationContainer';
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
      <Route component={AuthenticationContainer} />
    </Box>
    <Footer />
  </Box>
);

export default AuthenticationPage;
