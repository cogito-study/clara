import React from 'react';
import { coreComponents } from '../../utils/storybook';
import { ContentWrapper } from './content-wrapper';

export default {
  title: coreComponents('Layout'),
};

export const contentWrapper = () => <ContentWrapper height="100vh" bg="teal.400" />;
