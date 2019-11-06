import React, { Fragment } from 'react';
import { PrivateRoute } from '../../core/router/private-route';
import { CollaborationContainer } from '../components';
import { collabRoute } from '../utils/collab-route';

export const CollabRouter = () => {
  return (
    <Fragment>
      <PrivateRoute path={collabRoute({ path: 'notes' })}>
        <CollaborationContainer />
      </PrivateRoute>
    </Fragment>
  );
};
