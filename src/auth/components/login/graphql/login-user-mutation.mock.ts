import { MockedResponse } from '@apollo/react-testing';
import { LoginUserDocument, LoginUserMutationVariables } from './login-user-mutation.generated';

export const loginUserMock = (variables: LoginUserMutationVariables): MockedResponse => ({
  request: {
    query: LoginUserDocument,
    variables,
  },
  result: {
    data: {
      login: {
        token: 'asd',
      },
    },
  },
});
