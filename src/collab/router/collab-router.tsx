import React, { Fragment } from 'react';
import { PrivateRoute } from '../../core/router/private-route';
import { Placeholder } from '../components/elements/placeholder';
import { useCollabRoute } from '../hooks/use-collab-route';

export const CollabRouter = () => {
  const notes = useCollabRoute({ path: 'notes' });

  return (
    <Fragment>
      <PrivateRoute exact path={notes}>
        <Placeholder />
      </PrivateRoute>
    </Fragment>
  );
};
