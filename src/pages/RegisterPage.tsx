import React, { FunctionComponent } from 'react';
import { Box } from 'grommet';
import { Route, RouteComponentProps } from 'react-router-dom';

import { routePath } from '../constants';
import { RegisterContainer } from '../containers/RegisterContainer';

const RegisterPage: FunctionComponent<RouteComponentProps> = () => (
  <Box fill>
    <Route path={routePath.register()} component={RegisterContainer} />
  </Box>
);

export default RegisterPage;
