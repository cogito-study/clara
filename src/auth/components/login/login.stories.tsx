import React from 'react';
import { MockAuthProvider } from '../../contexts/auth-context.mock';
import { authComponents } from '../../utils/storybook';
import { Login } from './login';
import { Box } from '@chakra-ui/core';

export default {
  title: authComponents('Login'),
  decorators: [(storyFn) => <MockAuthProvider>{storyFn()}</MockAuthProvider>],
};

export const loginCard = () => (
  <Box maxW={400}>
    <Login />
  </Box>
);
