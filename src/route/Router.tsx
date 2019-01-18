import React, { Fragment, FunctionComponent, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import { LoadingPage } from '../pages/LoadingPage';
import { routeBuilder } from '../route/routeBuilder';
import { driftString } from '../scripts/drift';
import { AuthRouteParams, NoteRouteParams, SubjectRouteParams } from '../types/RouteParams';
import { PrivateRoute } from './PrivateRoute';

const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const SubjectPage = lazy(() => import('../pages/SubjectPage'));
const NotePage = lazy(() => import('../pages/NotePage'));
const LandingPage = lazy(() => import('../landing-page/LandingPage'));
const GrommetComponents = lazy(() => import('../ui/GrommetComponents'));

export const Router: FunctionComponent<RouteComponentProps> = ({ location }) => {
  const { root, register, components, subjectNote, subject } = routeBuilder;
  const isRoot = location.pathname === root();

  return (
    <Fragment>
      {!isRoot && <Helmet script={[{ async: true, innerHTML: driftString }]} />}

      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <Route
            path={register()}
            component={(props: RouteComponentProps<AuthRouteParams>) => <RegisterPage {...props} />}
          />
          <Route path={components()} component={(props: RouteComponentProps) => <GrommetComponents {...props} />} />
          <PrivateRoute
            exact
            path={subjectNote()}
            component={(props: RouteComponentProps<NoteRouteParams>) => <NotePage {...props} />}
          />
          <PrivateRoute
            path={subject()}
            component={(props: RouteComponentProps<SubjectRouteParams>) => <SubjectPage {...props} />}
          />
          <Route exact path={root()} component={(props: RouteComponentProps) => <LandingPage {...props} />} />
          <Redirect to={root()} />
        </Switch>
      </Suspense>
    </Fragment>
  );
};
