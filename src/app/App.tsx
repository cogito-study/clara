import React, { lazy, Suspense } from 'react';
import { Link, BrowserRouter, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { Grommet, Box } from 'grommet';

import { routePath } from '../constants';
import { theme } from '../ui/theme/theme';
import { client } from '../graphql/client';
import { LoadingPage } from '../pages/LoadingPage';
import { PrivateRoute } from '../utils/PrivateRoute';

const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const SubjectPage = lazy(() => import('../pages/SubjectPage'));
const NotePage = lazy(() => import('../pages/NotePage'));
const LandingPage = lazy(() => import('../landing-page/LandingPage'));
const GrommetComponents = lazy(() => import('../ui/GrommetComponents'));

export const App = () => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <Grommet theme={theme} full>
        <BrowserRouter>
          <Suspense fallback={<LoadingPage />}>
            <Box background="primary" flex="grow" direction="row" justify="between" align="center" wrap>
              <Link to={routePath.root()}>Landing Page</Link>
              <Link to={routePath.components()}>Components</Link>
              <Link to={routePath.subjectInfo('BIOIN124')}>Subject Info</Link>
              <Link to={routePath.subjectNoteList('BIOIN124')}>Subject Note List</Link>
              <Link to={routePath.register('3')}>Register 3</Link>
              <Link to={routePath.subjectNote('BIOIN124', '12')}>12. Note</Link>
              <Link to={routePath.subjectNote('BIOIN124', '5')}>12. Note</Link>
            </Box>
            <Switch>
              <Route
                path={routePath.register()}
                component={(props: RouteComponentProps) => <RegisterPage {...props} />}
              />
              <Route
                path={routePath.components()}
                component={(props: RouteComponentProps) => <GrommetComponents {...props} />}
              />
              <PrivateRoute
                exact
                path={routePath.subjectNote()}
                component={(props: RouteComponentProps) => <NotePage {...props} />}
              />
              <PrivateRoute
                path={routePath.subject()}
                component={(props: RouteComponentProps) => <SubjectPage {...props} />}
              />
              <Route path={routePath.root()} component={(props: RouteComponentProps) => <LandingPage {...props} />} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Grommet>
    </ApolloHooksProvider>
  </ApolloProvider>
);
