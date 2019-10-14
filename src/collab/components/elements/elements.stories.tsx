import React from 'react';
import { collabComponents } from '../../utils/storybook';
import { Placeholder } from './placeholder';

export default {
  title: collabComponents('Elements'),
};

export const placeholder = () => <Placeholder />;
