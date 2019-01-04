import { Box } from 'grommet';
import React, { FunctionComponent } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import { routePath } from '../constants';
import { RegisterContainer } from '../containers/RegisterContainer';
import { Footer } from '../ui/components';
import styled from 'styled-components';

const BoxWithHeight = styled(Box)`
  min-height: 98vh;
`;

const RegisterPage: FunctionComponent<RouteComponentProps> = () => (
  <Box align="center">
    <BoxWithHeight fill align="center" justify="center" background="gradient" pad={{ bottom: 'large' }}>
      <Route path={routePath.register()} component={RegisterContainer} />
    </BoxWithHeight>
    <Footer />
  </Box>
);

export default RegisterPage;
