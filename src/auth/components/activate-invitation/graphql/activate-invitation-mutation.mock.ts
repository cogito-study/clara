import { MockedResponse } from '@apollo/react-testing';
import {
  ActivateInvitationDocument,
  ActivateInvitationMutationVariables,
} from './activate-invitation-mutation.generated';

export const activateInvitationMock = (
  variables: ActivateInvitationMutationVariables,
): MockedResponse => ({
  request: {
    query: ActivateInvitationDocument,
    variables,
  },
  result: {
    data: {
      activateInvitation: true,
    },
  },
});
