import { MockedProvider } from '@apollo/react-testing';
import { Box } from '@chakra-ui/core';
import React from 'react';
import StoryRouter from 'storybook-react-router';
import '../../../core/i18n';
import { authComponents } from '../../utils/storybook';
import { passwordUserInfoMock } from '../password-user-info/graphql/user-info-query.mock';
import { resetPasswordMock } from './graphql/reset-password-mutation.mock';
import { ResetPassword } from './reset-password';

const token = 'asdfasdfad';

export default {
  title: authComponents('Reset Password'),
  decorators: [
    (storyFn) => (
      <MockedProvider
        mocks={[passwordUserInfoMock(token), resetPasswordMock({ password: 'password', token })]}
      >
        {storyFn()}
      </MockedProvider>
    ),
    StoryRouter({}, { initialEntries: [`/register?token=${token}`] }),
  ],
};

export const resetPassword = () => (
  <Box maxW={400}>
    <ResetPassword />
  </Box>
);
