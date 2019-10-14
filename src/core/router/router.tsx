import React, { Fragment, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { LoadingPage } from '../pages/loading-page';
import { driftString } from '../scripts/drift';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useAuthRoute } from '../../auth/hooks/use-auth-route';
import { useSubjectRoute } from '../../subject/hooks/use-subject-route';
import { useCollabRoute } from '../../collab/hooks/use-collab-route';
import { PrivateRoute } from './private-route';

const Auth = lazy(() => import('../../auth'));
const Collab = lazy(() => import('../../collab'));
const Subject = lazy(() => import('../../subject'));

export const Router = () => {
  const login = useAuthRoute({ path: 'login' });
  const register = useAuthRoute({ path: 'register' });
  const resetPassword = useAuthRoute({ path: 'reset-password' });
  const forgotPassword = useAuthRoute({ path: 'forgot-password' });
  const linkExpired = useAuthRoute({ path: 'link-expired' });
  const subject = useSubjectRoute({ path: 'subjects' });
  const note = useCollabRoute({ path: 'notes' });

  return (
    <Fragment>
      <Helmet script={[{ async: true, innerHTML: driftString }]} />
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <Route path={[register, login, forgotPassword, linkExpired, resetPassword]}>
            <Auth />
          </Route>
          <PrivateRoute exact path={note}>
            <Collab />
          </PrivateRoute>
          <PrivateRoute path={subject}>
            <Subject />
          </PrivateRoute>
          <Redirect to={login} />
        </Switch>
      </Suspense>
    </Fragment>
  );
};
