import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, Switch } from 'react-router-dom';
import { authRoute } from '../../auth/utils/auth-route';
import { collabRoute } from '../../collab/utils/collab-route';
import { profileRoute } from '../../profile/utils/profile-route';
import { socialRoute } from '../../social/utils/social-route';
import { subjectRoute } from '../../subject/utils/subject-route';
import { Layout } from '../components/layout/layout';
import { driftString } from '../scripts/drift';
import { PrivateRoute } from './private-route';
import { FullCogitoLoader } from '../components/loader/cogito-loader';

const Auth = lazy(() => import('../../auth'));
const Collab = lazy(() => import('../../collab'));
const Social = lazy(() => import('../../social'));
const Subject = lazy(() => import('../../subject'));
const Profile = lazy(() => import('../../profile'));

// TODO: Localize
export const Router = () => {
  return (
    <>
      <Helmet script={[{ async: true, innerHTML: driftString }]} />
      <Suspense fallback={<FullCogitoLoader />}>
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
          <PrivateRoute path={socialRoute({ path: 'feed' })}>
            <Layout title="News Feed">
              <Social />
            </Layout>
          </PrivateRoute>
          <PrivateRoute path={subjectRoute({ path: 'subjects' })}>
            <Layout>
              <Subject />
            </Layout>
          </PrivateRoute>
          <PrivateRoute path={profileRoute({ path: 'profile' })}>
            <Layout title="Profile">
              <Profile />
            </Layout>
          </PrivateRoute>
          <Redirect to={authRoute({ path: 'login' })} />
        </Switch>
      </Suspense>
    </>
  );
};
