import { UserInfoDocument } from './user-info-query.generated';
import { MockedResponse } from '@apollo/react-testing';

export const passwordUserInfoMock = (token: string): MockedResponse => ({
  request: {
    query: UserInfoDocument,
    variables: { token },
  },
  result: {
    data: {
      userInfo: { fullName: 'Kiss Bela', email: 'bela.kiss@gmail.com', __typename: 'User' },
    },
  },
});
