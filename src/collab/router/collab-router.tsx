import React from 'react';
import { Switch } from 'react-router-dom';
import { PrivateRoute } from '../../core/router/private-route';
import { CollabPage } from '../pages/collab-page';
import { StudyPage } from '../pages/study-page';
import { collabRoute } from '../utils/collab-route';

export const CollabRouter = () => {
  return (
    <Switch>
      <PrivateRoute path={collabRoute({ path: 'note-study' })}>
        <StudyPage />
      </PrivateRoute>
      <PrivateRoute path={collabRoute({ path: 'note-edit' })}>
        <CollabPage />
      </PrivateRoute>
    </Switch>
  );
};
