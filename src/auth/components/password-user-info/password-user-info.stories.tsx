import { MockedProvider } from '@apollo/react-testing';
import { Box } from '@chakra-ui/core';
import React from 'react';
import { authComponents } from '../../utils/storybook';
import { passwordUserInfoMock } from './graphql/user-info-query.mock';
import { PasswordUserInfo } from './password-user-info';

const token = 'asdfasdfad';

export default {
  title: authComponents('Password User Info'),
  decorators: [
    (storyFn) => <MockedProvider mocks={[passwordUserInfoMock(token)]}>{storyFn()}</MockedProvider>,
  ],
};

export const passwordUserInfo = () => (
  <Box maxW={400}>
    <PasswordUserInfo token={token} />
  </Box>
);
