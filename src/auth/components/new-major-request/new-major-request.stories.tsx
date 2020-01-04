import { Box } from '@chakra-ui/core';
import React from 'react';
import StoryRouter from 'storybook-react-router';
import '../../../core/i18n/index';
import { authComponents } from '../../utils/storybook';
import { NewMajorRequest } from './new-major-request';

export default {
  title: authComponents('New Major Request'),
  decorators: [StoryRouter({})],
};

export const newMajorRequest = () => (
  <Box maxW={400}>
    <NewMajorRequest />
  </Box>
);
