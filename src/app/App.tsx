import { init as initSentry } from '@sentry/browser';
import { Grommet } from 'grommet';
import React, { lazy, Suspense } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import ReactGA from 'react-ga';
import { BrowserRouter, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { routePath } from '../constants';
import { NotificationProvider } from '../contexts/NotificationContext';
import { isProduction } from '../environment/config';
import { client } from '../graphql/client';
import { LoadingPage } from '../pages/LoadingPage';
import { AuthRouteParams, NoteRouteParams, SubjectRouteParams } from '../types/RouteParams';
import { theme } from '../ui/theme';
import { PrivateRoute } from '../utils/PrivateRoute';

import { Helmet } from 'react-helmet';

const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const SubjectPage = lazy(() => import('../pages/SubjectPage'));
const NotePage = lazy(() => import('../pages/NotePage'));
const LandingPage = lazy(() => import('../landing-page/LandingPage'));
const GrommetComponents = lazy(() => import('../ui/GrommetComponents'));

const TempGrommet = styled(Grommet)`
  overflow: visible;
`;

function initializeDrift() {
  return window.location.pathname === routePath.root();
}

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
      {isProduction && initializeGA()}
      <NotificationProvider>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
            {!initializeDrift() && (
              <Helmet
                script={[
                  {
                    type: 'text/javascript',
                    innerHTML: `
"use strict";

!function() {
var t = window.driftt = window.drift = window.driftt || [];
if (!t.init) {
if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."));
t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ],
t.factory = function(e) {
  return function() {
    var n = Array.prototype.slice.call(arguments);
    return n.unshift(e), t.push(n), t;
  };
}, t.methods.forEach(function(e) {
  t[e] = t.factory(e);
}), t.load = function(t) {
  var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script");
  o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
  var i = document.getElementsByTagName("script")[0];
  i.parentNode.insertBefore(o, i);
};
}
}();
drift.SNIPPET_VERSION = '0.3.1';
drift.load('dzw4g36p7k4z');
`,
                  },
                ]}
              />
            )}
            <BrowserRouter>
              <Suspense fallback={<LoadingPage />}>
                <Switch>
                  <Route
                    path={routePath.register()}
                    component={(props: RouteComponentProps<AuthRouteParams>) => <RegisterPage {...props} />}
                  />
                  <Route
                    path={routePath.components()}
                    component={(props: RouteComponentProps) => <GrommetComponents {...props} />}
                  />
                  <PrivateRoute
                    exact
                    path={routePath.subjectNote()}
                    component={(props: RouteComponentProps<NoteRouteParams>) => <NotePage {...props} />}
                  />
                  <PrivateRoute
                    path={routePath.subject()}
                    component={(props: RouteComponentProps<SubjectRouteParams>) => <SubjectPage {...props} />}
                  />
                  <Route
                    exact
                    path={routePath.root()}
                    component={(props: RouteComponentProps) => <LandingPage {...props} />}
                  />
                  <Redirect to={routePath.root()} />
                </Switch>
              </Suspense>
            </BrowserRouter>
          </ApolloHooksProvider>
        </ApolloProvider>
      </NotificationProvider>
    </TempGrommet>
  );
};
