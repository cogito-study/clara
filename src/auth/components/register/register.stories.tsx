import { MockedProvider } from '@apollo/react-testing';
import { Box } from '@chakra-ui/core';
import React from 'react';
import StoryRouter from 'storybook-react-router';
import { languageListMock } from '../../../core/graphql/language';
import { authComponents } from '../../utils/storybook';
import { passwordUserInfoMock } from '../password-user-info/graphql/user-info-query.mock';
import { registerUserMock } from './graphql/register-user-mutation.mock';
import { Register } from './register';

// change it to something valid
const token = 'asdfasdfad';

export default {
  title: authComponents('Register'),
  decorators: [
    (storyFn) => (
      <MockedProvider
        mocks={[
          languageListMock(),
          passwordUserInfoMock(token),
          registerUserMock({
            data: {
              email: 'asd@email.com',
              firstName: 'John',
              lastName: 'Doe',
              password: 'password',
              preferredLanguage: { id: '12345' },
            },
          }),
        ]}
        addTypename={false}
      >
        {storyFn()}
      </MockedProvider>
    ),
    StoryRouter(),
  ],
};

export const registrationCard = () => (
  <Box maxW={400}>
    <Register />
  </Box>
);
