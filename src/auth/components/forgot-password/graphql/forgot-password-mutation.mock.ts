import { MockedResponse } from '@apollo/react-testing';
import {
  ForgotPasswordDocument,
  ForgotPasswordMutationVariables,
} from './forgot-password-mutation.generated';

export const forgotPasswordMock = (variables: ForgotPasswordMutationVariables): MockedResponse => ({
  request: {
    query: ForgotPasswordDocument,
    variables,
  },
  result: {
    data: {
      forgotPassword: true,
    },
  },
});
