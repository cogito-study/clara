import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@chakra-ui/core';
import { init as initSentry } from '@sentry/browser';
import React, { Suspense } from 'react';
import ErrorBoundary from 'react-error-boundary';
import { initialize as initGoogleAnalytics } from 'react-ga';
import { BrowserRouter, Route } from 'react-router-dom';
import { ErrorPage, FullCogitoLoader, RootHead } from './components';
import { config, isProduction } from './environment/config';
import { client } from './graphql/client';
import { Router } from './router/router';
import { GlobalStyles, theme } from './style';

export const App = () => {
  if (isProduction) {
    const { sentryDSN, googleAnalyticsKey } = config;

    initGoogleAnalytics(googleAnalyticsKey);
    initSentry({ dsn: sentryDSN });
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<FullCogitoLoader />}>
          <GlobalStyles />
          <ApolloProvider client={client}>
            <BrowserRouter>
              <ErrorBoundary FallbackComponent={ErrorPage}>
                <RootHead />
                <Route path="/">
                  <Router />
                </Route>
              </ErrorBoundary>
            </BrowserRouter>
          </ApolloProvider>
        </Suspense>
      </ThemeProvider>
    </>
  );
};
