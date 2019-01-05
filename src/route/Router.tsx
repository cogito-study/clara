import React, { Fragment, FunctionComponent, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import { routePath } from '../constants';
import { LoadingPage } from '../pages/LoadingPage';
import { driftString } from '../scripts/drift';
import { AuthRouteParams, NoteRouteParams, SubjectRouteParams } from '../types/RouteParams';
import { PrivateRoute } from './PrivateRoute';

const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const SubjectPage = lazy(() => import('../pages/SubjectPage'));
const NotePage = lazy(() => import('../pages/NotePage'));
const LandingPage = lazy(() => import('../landing-page/LandingPage'));
const GrommetComponents = lazy(() => import('../ui/GrommetComponents'));

export const Router: FunctionComponent<RouteComponentProps> = ({ location }) => {
  const isRoot = location.pathname === routePath.root();

  return (
    <Fragment>
      {!isRoot && <Helmet script={[{ async: true, innerHTML: driftString }]} />}

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
          <Route exact path={routePath.root()} component={(props: RouteComponentProps) => <LandingPage {...props} />} />
          <Redirect to={routePath.root()} />
        </Switch>
      </Suspense>
    </Fragment>
  );
};
