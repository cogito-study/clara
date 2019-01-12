import { Box } from 'grommet';
import React, { FunctionComponent } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import { routePath } from '../constants';
import { RegisterContainer } from '../containers/Register/RegisterContainer';
import { Footer } from '../ui/components';

const RegisterPage: FunctionComponent<RouteComponentProps> = () => (
  <Box align="center">
    <Box
      fill
      align="center"
      justify="center"
      background="light"
      pad={{ bottom: 'large' }}
      style={{ minHeight: '98vh' }}
    >
      <Route path={routePath.register()} component={RegisterContainer} />
    </Box>
    <Footer />
  </Box>
);

export default RegisterPage;
