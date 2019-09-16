import React, { Fragment, FunctionComponent, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { isProduction } from '../environment/config';
import { LoadingPage } from '../pages/loading-page';
import { routeBuilder } from './route-builder';
import { driftString } from '../scripts/drift';
import { AuthRouteParams, NoteRouteParams, SubjectRouteParams } from '../types/route-params';
import { PrivateRoute } from './private-route';

const AuthenticationPage = lazy(() => import('../pages/authentication-page'));
const SubjectPage = lazy(() => import('../pages/subject-page'));
const NotePage = lazy(() => import('../pages/note-page'));
const GrommetComponents = lazy(() => import('../ui/grommet-components'));

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
          <Redirect to={login()} />
        </Switch>
      </Suspense>
    </Fragment>
  );
};
