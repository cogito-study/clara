import React, { Fragment, FunctionComponent, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { isProduction } from '../environment/config';
import { LoadingPage } from '../pages/LoadingPage';
import { routeBuilder } from '../route/routeBuilder';
import { driftString } from '../scripts/drift';
import { AuthRouteParams, NoteRouteParams, SubjectRouteParams } from '../types/RouteParams';
import { PrivateRoute } from './PrivateRoute';

const AuthenticationPage = lazy(() => import('../pages/AuthenticationPage'));
const SubjectPage = lazy(() => import('../pages/SubjectPage'));
const NotePage = lazy(() => import('../pages/NotePage'));
const LandingPage = lazy(() => import('../landing-page/LandingPage'));
const GrommetComponents = lazy(() => import('../ui/GrommetComponents'));

export const Router: FunctionComponent<RouteComponentProps> = ({ location }) => {
  const {
    root,
    register,
    components,
    subjectNote,
    subject,
    login,
    forgetPassword,
    emailSent,
    linkExpired,
    resetPassword,
    resetDone,
  } = routeBuilder;

  function insertDrift() {
    const isRoot = location.pathname === root();
    //! TODO: FIX ME
    if (isRoot) {
      const removeDriftButtonString = `document.querySelector('#drift-widget-container').hidden = true;`;
      return <Helmet script={[{ async: true, innerHTML: removeDriftButtonString }]} />;
    }
    return <Helmet script={[{ async: true, innerHTML: driftString }]} />;
  }

  return (
    <Fragment>
      {insertDrift()}
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <Route
            path={[register(), login(), forgetPassword(), emailSent(), linkExpired(), resetPassword(), resetDone()]}
            component={(props: RouteComponentProps<AuthRouteParams>) => <AuthenticationPage {...props} />}
          />
          {!isProduction && (
            <Route path={components()} component={(props: RouteComponentProps) => <GrommetComponents {...props} />} />
          )}
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
