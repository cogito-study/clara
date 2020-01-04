import { MockedResponse } from '@apollo/react-testing';
import { InstitutesByTokenDocument } from './institutes-by-token-query.generated';

export const institutesMock: MockedResponse = {
  request: {
    query: InstitutesByTokenDocument,
    variables: { token: 'asdf123' },
  },
  result: {
    data: {
      institutesByToken: [
        {
          id: 'BME',
          name: 'BME',
          faculties: [
            {
              id: 'VIK',
              name: 'VIK',
              majors: [
                {
                  id: 'Mernokinfo',
                  name: 'Mernokinfo',
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
