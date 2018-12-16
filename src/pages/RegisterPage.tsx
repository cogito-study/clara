import React, { FunctionComponent } from 'react';
import { Box } from 'grommet';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import { routePath } from '../constants';
import { RegisterContainer } from '../containers/RegisterContainer';

const RegisterPage: FunctionComponent<RouteComponentProps> = ({ match }) => (
  <Box fill>
    <Switch>
      <Route path={routePath.register()} component={RegisterContainer} />
    </Switch>
  </Box>
);

export default RegisterPage;
