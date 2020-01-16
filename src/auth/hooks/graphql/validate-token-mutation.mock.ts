import { MockedResponse } from '@apollo/react-testing';
import {
  ValidateTokenDocument,
  ValidateTokenMutationVariables,
} from './validate-token-mutation.generated';

export const validateTokenMock = (variables: ValidateTokenMutationVariables): MockedResponse => ({
  request: {
    query: ValidateTokenDocument,
    variables,
  },
  result: {
    data: {
      validateToken: true,
    },
  },
});
