import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grommet } from 'grommet';

import { client } from '../services/client';
import { theme } from '../ui/theme/theme';
import { PATH } from '../constants/path';
import { CONFIG } from '../environment/config';
import GrommetComponents from '../ui/GrommetComponents';

export const App = () => {
  console.log('ENVIRONMENT', CONFIG.ENVIRONMENT);
  console.log('API_URL', CONFIG.API_URL);
  console.log('REPOSITORY_URL', CONFIG.REPOSITORY_URL);
  console.log('BRANCH', CONFIG.BRANCH);
  console.log('PULL_REQUEST', CONFIG.PULL_REQUEST);
  console.log('HEAD', CONFIG.HEAD);
  console.log('COMMIT_REF', CONFIG.COMMIT_REF);
  console.log('CONTEXT', CONFIG.CONTEXT);
  console.log('URL', CONFIG.URL);
  console.log('DEPLOY_URL', CONFIG.DEPLOY_URL);
  console.log('DEPLOY_PRIME_URL', CONFIG.DEPLOY_PRIME_URL);

  return (
    <ApolloProvider client={client}>
      <Grommet theme={theme}>
        <Router>
          <Route exact path={PATH.ROOT} component={GrommetComponents} />
        </Router>
      </Grommet>
    </ApolloProvider>
  );
};
