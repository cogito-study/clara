import { MockedResponse } from '@apollo/react-testing';
import {
  ResetPasswordDocument,
  ResetPasswordMutationVariables,
} from './reset-password-mutation.generated';

export const resetPasswordMock = (variables: ResetPasswordMutationVariables): MockedResponse => ({
  request: {
    query: ResetPasswordDocument,
    variables,
  },
  result: {
    data: {
      resetPassword: true,
    },
  },
});
