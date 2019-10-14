import React from 'react';
import { collabComponents } from '../utils/storybook';
import { CollabLayout } from './collab-layout';

export default {
  title: collabComponents('Layout'),
};

export const layout = () => <CollabLayout />;
