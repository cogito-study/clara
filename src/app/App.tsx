import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Grommet } from 'grommet';

import { theme } from '../ui/theme/theme';
import GrommetComponents from '../ui/GrommetComponents';
import { routePath } from '../constants/routePath';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import LandingPage from '../landing-page/LandingPage';

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <Grommet theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path={PATH.ROOT} component={GrommetComponents} />
            <Route exact path={routePath.registerWithParams} component={RegisterPage} />
            <Route path={routePath.subject} component={HomePage} />
            <Route path={routePath.root} component={LandingPage} />
          </Switch>
        </BrowserRouter>
      </Grommet>
    </ApolloProvider>
  );
};
