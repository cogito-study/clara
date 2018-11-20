import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grommet } from 'grommet';

import { client } from '../services/client';
import { theme } from '../ui-kit/theme/theme';
import { PATH } from '../constants/path';
import { CONFIG } from '../environment/config';
import LandingPage from '../landing-page/LandingPage';

export const App = () => {
  console.log('environment', CONFIG.ENVIRONMENT);
  console.log('api url', CONFIG.API_URL);

  return (
    <ApolloProvider client={client}>
      <Grommet theme={theme}>
        <Router>
          <Route exact path={PATH.ROOT} component={LandingPage} />
        </Router>
      </Grommet>
    </ApolloProvider>
  );
};
