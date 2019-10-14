import React from 'react';
import { CollabLayout } from './layout/collab-layout';
import { CollabRouter } from './router/collab-router';

const Collab = () => (
  <CollabLayout>
    <CollabRouter />
  </CollabLayout>
);

export default Collab;
