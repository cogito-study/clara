import React, { FunctionComponent } from 'react';
import { Box, Grommet } from 'grommet';
import { Route, RouteComponentProps } from 'react-router-dom';
import { theme } from '../ui/theme';

import { routePath } from '../constants';
import { RegisterContainer } from '../containers/RegisterContainer';

const RegisterPage: FunctionComponent<RouteComponentProps> = () => (
  <Grommet theme={theme} full>
    <Box fill>
      <Route path={routePath.register()} component={RegisterContainer} />
    </Box>
  </Grommet>
);

export default RegisterPage;
