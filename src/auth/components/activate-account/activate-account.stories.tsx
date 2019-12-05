import { Box } from '@chakra-ui/core';
import React from 'react';
import { authComponents } from '../../utils/storybook';
import { ActivateAccount } from './activate-account';

export default {
  title: authComponents('Activate Account'),
};

export const activateAccount = () => (
  <Box maxW={400}>
    <ActivateAccount />
  </Box>
);
