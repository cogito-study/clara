import { captureException, init as initSentry } from '@sentry/browser';
import { Grommet } from 'grommet';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import ErrorBoundary from 'react-error-boundary';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Route } from 'react-router-dom';

import { NotificationProvider } from '../contexts/notification/NotificationContext';
import { config, isProduction } from '../environment/config';
import { client } from '../graphql/client';
import { routeBuilder } from '../route/routeBuilder';
import { Router } from '../route/Router';
import { hotjarString } from '../scripts/hotjar';
import { theme } from '../ui/theme';

const initializeGA = () => {
  ReactGA.initialize(config.googleAnalyticsKey);
  ReactGA.pageview(window.location.pathname + window.location.search);
};

const initializeErrorReporter = () => initSentry({ dsn: config.sentryDSN });

export const App = () => {
  if (isProduction) {
    initializeGA();
    initializeErrorReporter();
  }

  return (
    <Grommet theme={theme} style={{ overflow: 'visible' }} full>
      {isProduction && <Helmet script={[{ async: true, innerHTML: hotjarString }]} />}
      <NotificationProvider>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
            <ErrorBoundary onError={captureException}>
              <BrowserRouter>
                <Route path={routeBuilder.root()} component={Router} />
              </BrowserRouter>
            </ErrorBoundary>
          </ApolloHooksProvider>
        </ApolloProvider>
      </NotificationProvider>
    </Grommet>
  );
};
