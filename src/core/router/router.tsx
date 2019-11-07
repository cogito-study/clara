import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, Switch } from 'react-router-dom';
import { authRoute } from '../../auth/utils/auth-route';
import { collabRoute } from '../../collab/utils/collab-route';
import { subjectRoute } from '../../subject/utils/subject-route';
import { LoadingPage } from '../pages/loading-page';
import { driftString } from '../scripts/drift';
import { PrivateRoute } from './private-route';

const Auth = lazy(() => import('../../auth'));
const Collab = lazy(() => import('../../collab'));
const Subject = lazy(() => import('../../subject'));

export const Router = () => {
  return (
    <>
      <Helmet script={[{ async: true, innerHTML: driftString }]} />
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <Route
            path={[
              authRoute({ path: 'login' }),
              authRoute({ path: 'register' }),
              authRoute({ path: 'reset-password' }),
              authRoute({ path: 'forgot-password' }),
              authRoute({ path: 'link-expired' }),
            ]}
          >
            <Auth />
          </Route>
          <PrivateRoute exact path={collabRoute({ path: 'notes' })}>
            <Collab />
          </PrivateRoute>
          <PrivateRoute path={subjectRoute({ path: 'subjects' })}>
            <Subject />
          </PrivateRoute>
          <Redirect to={authRoute({ path: 'login' })} />
        </Switch>
      </Suspense>
    </>
  );
};
