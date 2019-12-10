import { MockedResponse } from '@apollo/react-testing';
import {
  RegisterUserDocument,
  RegisterUserMutationVariables,
} from './register-user-mutation.generated';

export const registerUserMock = (variables: RegisterUserMutationVariables): MockedResponse => ({
  request: {
    query: RegisterUserDocument,
    variables,
  },
  result: {
    data: {
      register: true,
    },
  },
});
