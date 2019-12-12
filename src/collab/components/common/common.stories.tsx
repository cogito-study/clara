import React from 'react';
import { collabComponents } from '../../utils/storybook';
import { CollabPagePlaceholder } from './collab-page.placeholder';

export default {
  title: collabComponents('Common'),
};

export const placeholder = () => <CollabPagePlaceholder />;
