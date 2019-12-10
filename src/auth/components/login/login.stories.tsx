import { MockedProvider } from '@apollo/react-testing';
import { Box } from '@chakra-ui/core';
import React from 'react';
import StoryRouter from 'storybook-react-router';
import { authComponents } from '../../utils/storybook';
import { loginUserMock } from './graphql/login-user-mutation.mock';
import { Login } from './login';

export default {
  title: authComponents('Login'),
  decorators: [
    (storyFn) => (
      <MockedProvider mocks={[loginUserMock({ email: 'asd@email.com', password: 'password' })]}>
        {storyFn()}
      </MockedProvider>
    ),
    StoryRouter({}),
  ],
};

export const loginCard = () => (
  <Box maxW={400}>
    <Login />
  </Box>
);
