import React from 'react';
import { PrivateRoute } from '../../core/router/private-route';
import { CollabPage } from '../pages/collab-page';
import { collabRoute } from '../utils/collab-route';

export const CollabRouter = () => {
  return (
    <PrivateRoute path={collabRoute({ path: 'notes' })}>
      <CollabPage />
    </PrivateRoute>
  );
};
