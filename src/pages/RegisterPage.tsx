import React, { FunctionComponent } from 'react';
import { Box, Heading } from 'grommet';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import { RegisterContainer } from '../containers/RegisterContainer';

const RegisterPage: FunctionComponent<RouteComponentProps> = ({ match }) => (
  <Box fill>
    <Switch>
      <Route path={`${match.path}/:userID`} component={RegisterContainer} />
      <Route exact path={match.path} render={() => <Heading level="3">Find a registration ID</Heading>} />
    </Switch>
  </Box>
);

export default RegisterPage;
