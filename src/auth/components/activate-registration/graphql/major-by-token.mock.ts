import { MockedResponse } from '@apollo/react-testing';
import { MajorByTokenDocument } from './major-by-token.generated';

export const majorMock: MockedResponse = {
  request: {
    query: MajorByTokenDocument,
    variables: { token: 'asdf123' },
  },
  result: {
    data: {
      majorByToken: {
        subjects: [
          {
            id: 'sub1',
            name: 'valami',
          },
        ],
      },
    },
  },
};
