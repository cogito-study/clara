import { Box } from '@chakra-ui/core';
import { action } from '@storybook/addon-actions';
import React from 'react';
import { authComponents } from '../../utils/storybook';
import { PickStudies } from './pick-studies';
import { PickSubjects } from './pick-subjects';

export default {
  title: authComponents('Activate Registration'),
};

export const pickStudies = () => (
  <Box maxW={400}>
    <PickStudies onFormSubmit={action('Submitted form')} token="asd" />
  </Box>
);

export const pickSubjects = () => (
  <Box maxW={400}>
    <PickSubjects onSave={action('Save form')} majorID="asdf" token="asdf" isSubmitting={false} />
  </Box>
);
