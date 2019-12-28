import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@chakra-ui/core';
import Sentry from '@sentry/browser';
import React, { Suspense } from 'react';
import ErrorBoundary from 'react-error-boundary';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Route } from 'react-router-dom';
import { ErrorPage } from './components/error/error-page';
import { FullCogitoLoader } from './components/loader/cogito-loader';
import { config, isProduction } from './environment/config';
import { client } from './graphql/client';
import { Router } from './router/router';
import { driftString } from './scripts/drift';
import { hotjarString } from './scripts/hotjar';
import { GlobalStyles, theme } from './style';

export const App = () => {
  if (isProduction) {
    ReactGA.initialize(config.googleAnalyticsKey);
    Sentry.init({ dsn: config.sentryDSN });
  }

  return (
    <>
      {isProduction && <Helmet script={[{ async: true, innerHTML: hotjarString }]} />}
      <Helmet script={[{ async: true, innerHTML: driftString }]} />
      <ThemeProvider theme={theme}>
        <Suspense fallback={<FullCogitoLoader />}>
          <GlobalStyles />
          <ApolloProvider client={client}>
            <BrowserRouter>
              <ErrorBoundary FallbackComponent={ErrorPage}>
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
