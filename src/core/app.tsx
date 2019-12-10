import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@chakra-ui/core';
import { captureException, init as initSentry } from '@sentry/browser';
import React, { Suspense } from 'react';
import ErrorBoundary from 'react-error-boundary';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Route } from 'react-router-dom';
import { FullCogitoLoader } from './components/loader/cogito-loader';
import { config, isProduction } from './environment/config';
import { client } from './graphql/client';
import { Router } from './router/router';
import { driftString } from './scripts/drift';
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
    <>
      {isProduction && <Helmet script={[{ async: true, innerHTML: hotjarString }]} />}
      <Helmet script={[{ async: true, innerHTML: driftString }]} />
      <ThemeProvider theme={theme}>
        <Suspense fallback={<FullCogitoLoader />}>
          <GlobalStyles />
          <ApolloProvider client={client}>
            <ErrorBoundary onError={captureException}>
              <BrowserRouter>
                <Route path="/">
                  <Router />
                </Route>
              </BrowserRouter>
            </ErrorBoundary>
          </ApolloProvider>
        </Suspense>
      </ThemeProvider>
    </>
  );
};
