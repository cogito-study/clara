import { init as initSentry } from '@sentry/browser';
import { Grommet } from 'grommet';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import ReactGA from 'react-ga';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';

import { routePath } from '../constants';
import { NotificationProvider } from '../contexts/NotificationContext';
import { isProduction } from '../environment/config';
import { client } from '../graphql/client';
import { Router } from '../route/Router';
import { theme } from '../ui/theme';

const TempGrommet = styled(Grommet)`
  overflow: visible;
`;

const initializeGA = () => {
  ReactGA.initialize('UA-120199285-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
};

const initializeErrorReporter = () => initSentry({ dsn: 'https://fb58dd3770e24645ae9023bbd5797c7c@sentry.io/1363186' });

export const App = () => {
  if (isProduction) {
    initializeGA();
    initializeErrorReporter();
  }

  return (
    <TempGrommet theme={theme} full>
      <NotificationProvider>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
            <BrowserRouter>
              <Route path={routePath.root()} component={Router} />
            </BrowserRouter>
          </ApolloHooksProvider>
        </ApolloProvider>
      </NotificationProvider>
    </TempGrommet>
  );
};
