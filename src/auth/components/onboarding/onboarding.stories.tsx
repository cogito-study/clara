import { Box } from '@chakra-ui/core';
import React from 'react';
import { authComponents } from '../../utils/storybook';
import { PickStudies } from './pick-studies';
import { PickSubjects } from './pick-subjects';

export default {
  title: authComponents('Onboarding'),
};

export const pickStudies = () => (
  <Box maxW={400}>
    <PickStudies />
  </Box>
);

export const pickSubjects = () => (
  <Box maxW={400}>
    <PickSubjects />
  </Box>
);
