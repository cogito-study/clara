import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, RouteComponentProps, Switch, Redirect } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

import { routePath } from '../constants';
import { client } from '../graphql/client';
import { LoadingPage } from '../pages/LoadingPage';
import { PrivateRoute } from '../utils/PrivateRoute';
import { AuthRouteParams, NoteRouteParams, SubjectRouteParams } from '../types/RouteParams';

const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const SubjectPage = lazy(() => import('../pages/SubjectPage'));
const NotePage = lazy(() => import('../pages/NotePage'));
const LandingPage = lazy(() => import('../landing-page/LandingPage'));
const GrommetComponents = lazy(() => import('../ui/GrommetComponents'));

export const App = () => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
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
);
