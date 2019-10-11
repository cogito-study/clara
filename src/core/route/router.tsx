import React, { Fragment, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useAuthRoute } from '../../auth/hooks/use-auth-route';
import { useCollabRoute } from '../../collab/hooks/use-collab-route';
import { useSubjectRoute } from '../../subject/hooks/use-subject-route';
import { LoadingPage } from '../pages/loading-page';
import { driftString } from '../scripts/drift';
import { PrivateRoute } from './private-route';

const AuthenticationPage = lazy(() => import('../../auth/pages/authentication-page'));
const SubjectPage = lazy(() => import('../../subject/pages/subject-page'));
const NotePage = lazy(() => import('../../collab/pages/note-page'));

export const Router = () => {
  const login = useAuthRoute({ path: 'login' });
  const register = useAuthRoute({ path: 'register' });
  const resetPassword = useAuthRoute({ path: 'reset-password' });
  const resetDone = useAuthRoute({ path: 'reset-done' });
  const forgotPassword = useAuthRoute({ path: 'forgot-password' });
  const linkExpired = useAuthRoute({ path: 'link-expired' });
  const subject = useSubjectRoute({ path: 'subjects' });
  const note = useCollabRoute({ path: 'note' });

  return (
    <Fragment>
      <Helmet script={[{ async: true, innerHTML: driftString }]} />
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <Route path={[register, login, forgotPassword, linkExpired, resetPassword, resetDone]}>
            <AuthenticationPage />
          </Route>
          <PrivateRoute exact path={note}>
            <NotePage />
          </PrivateRoute>
          <PrivateRoute path={subject}>
            <SubjectPage />
          </PrivateRoute>
          <Redirect to={login} />
        </Switch>
      </Suspense>
    </Fragment>
  );
};
