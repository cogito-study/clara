import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@chakra-ui/core';
import { captureException, init as initSentry } from '@sentry/browser';
import React, { Fragment } from 'react';
import ErrorBoundary from 'react-error-boundary';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthProvider } from '../auth/contexts/auth-context';
import { config, isProduction } from './environment/config';
import { client } from './graphql/client';
import { Router } from './route/router';
import { hotjarString } from './scripts/hotjar';
import { GlobalStyles, theme } from './style';

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
    <Fragment>
      {isProduction && <Helmet script={[{ async: true, innerHTML: hotjarString }]} />}
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ApolloProvider client={client}>
          <ErrorBoundary onError={captureException}>
            <BrowserRouter>
              <AuthProvider>
                <Route path="/">
                  <Router />
                </Route>
              </AuthProvider>
            </BrowserRouter>
          </ErrorBoundary>
        </ApolloProvider>
      </ThemeProvider>
    </Fragment>
  );
};
