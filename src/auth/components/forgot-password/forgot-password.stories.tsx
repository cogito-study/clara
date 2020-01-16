import { MockedProvider } from '@apollo/react-testing';
import { Box } from '@chakra-ui/core';
import React from 'react';
import { authComponents } from '../../utils/storybook';
import { ForgotPassword } from './forgot-password';
import { forgotPasswordMock } from './graphql/forgot-password-mutation.mock';

export default {
  title: authComponents('Forgot Password'),
  decorators: [
    (storyFn) => (
      <MockedProvider mocks={[forgotPasswordMock({ email: 'asd@email.com' })]}>
        {storyFn()}
      </MockedProvider>
    ),
  ],
};

export const forgotPassword = () => (
  <Box maxW={400}>
    <ForgotPassword />
  </Box>
);
