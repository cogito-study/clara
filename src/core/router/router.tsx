import { Box } from '@chakra-ui/core';
import React, { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { authRoute } from '../../auth/utils/auth-route';
import { collabRoute } from '../../collab/utils/collab-route';
import { profileRoute } from '../../profile/utils/profile-route';
import { socialRoute } from '../../social/utils/social-route';
import { subjectRoute } from '../../subject/utils/subject-route';
import { Layout } from '../components';
import { PrivateRoute } from './private-route';

const Auth = lazy(() => import('../../auth'));
const Collab = lazy(() => import('../../collab'));
const Social = lazy(() => import('../../social'));
const Subject = lazy(() => import('../../subject'));
const Profile = lazy(() => import('../../profile'));

export const Router = () => {
  const { t } = useTranslation('core');
  const history = useHistory();

  history.listen(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Box h="100%">
      <Switch>
        <Route
          path={[
            authRoute({ path: 'login' }),
            authRoute({ path: 'register' }),
            authRoute({ path: 'reset-password' }),
            authRoute({ path: 'forgot-password' }),
            authRoute({ path: 'activate-invitation' }),
            authRoute({ path: 'activate-registration' }),
            authRoute({ path: 'link-expired' }),
            authRoute({ path: 'new-major' }),
          ]}
        >
          <Auth />
        </Route>
        <PrivateRoute
          exact
          path={[collabRoute({ path: 'note-study' }), collabRoute({ path: 'note-edit' })]}
        >
          <Collab />
        </PrivateRoute>
        <PrivateRoute path={socialRoute({ path: 'feed' })}>
          <Layout title={t('pages.feed')}>
            <Social />
          </Layout>
        </PrivateRoute>
        <PrivateRoute
          path={[
            subjectRoute({ path: 'subjects' }),
            subjectRoute({ path: 'subjects-notes' }),
            subjectRoute({ path: 'subjects-feed' }),
            subjectRoute({ path: 'subjects-info' }),
          ]}
        >
          <Layout>
            <Subject />
          </Layout>
        </PrivateRoute>
        <PrivateRoute path={profileRoute({ path: 'profile' })}>
          <Layout title={t('pages.profile')}>
            <Profile />
          </Layout>
        </PrivateRoute>
        <Redirect to={socialRoute({ path: 'feed' })} />
      </Switch>
    </Box>
  );
};
