import { MockedProvider } from '@apollo/react-testing';
import { Box } from '@chakra-ui/core';
import React from 'react';
import StoryRouter from 'storybook-react-router';
import { MockAuthProvider } from '../../contexts/auth-context.mock';
import { authComponents } from '../../utils/storybook';
import { passwordUserInfoMock } from '../password-user-info/graphql/user-info-query.mock';
import { Register } from './register';

const token = 'asdfasdfad';

export default {
  title: authComponents('Register'),
  decorators: [
    (storyFn) => (
      <MockedProvider mocks={[passwordUserInfoMock(token)]} addTypename={false}>
        <MockAuthProvider>{storyFn()}</MockAuthProvider>
      </MockedProvider>
    ),
    StoryRouter({}, { initialEntries: [`/register?token=${token}`] }),
  ],
};

export const registrationCard = () => (
  <Box maxW={400}>
    <Register />
  </Box>
);
