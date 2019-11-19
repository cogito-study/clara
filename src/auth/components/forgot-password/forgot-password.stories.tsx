import { Box } from '@chakra-ui/core';
import React from 'react';
import { MockAuthProvider } from '../../contexts/auth-context.mock';
import { authComponents } from '../../utils/storybook';
import { ForgotPassword } from './forgot-password';

export default {
  title: authComponents('Forgot Password'),
  decorators: [(storyFn) => <MockAuthProvider>{storyFn()}</MockAuthProvider>],
};

export const forgotPassword = () => (
  <Box maxW={400}>
    <ForgotPassword />
  </Box>
);
