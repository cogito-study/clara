import { MockedProvider } from '@apollo/react-testing';
import { Box } from '@chakra-ui/core';
import React from 'react';
import StoryRouter from 'storybook-react-router';
import { TokenType } from '../../../core/graphql/types.generated';
import { validateTokenMock } from '../../hooks/graphql/validate-token-mutation.mock';
import { authComponents } from '../../utils/storybook';
import { passwordUserInfoMock } from '../password-user-info/graphql/user-info-query.mock';
import { ActivateInvitation } from './activate-invitation';
import { activateInvitationMock } from './graphql/activate-invitation-mutation.mock';

const token = 'asdfasdfad';

export default {
  title: authComponents('Activate Invitation'),
  decorators: [
    (storyFn) => (
      <MockedProvider
        mocks={[
          passwordUserInfoMock(token),
          activateInvitationMock({ token, password: 'asdfasdf' }),
          validateTokenMock({ token, type: TokenType.Activation }),
        ]}
        addTypename={false}
      >
        {storyFn()}
      </MockedProvider>
    ),
    StoryRouter({}, { initialEntries: [`/activate-invitation?token=${token}`] }),
  ],
};

export const activateInvitation = () => (
  <Box maxW={400}>
    <ActivateInvitation />
  </Box>
);
