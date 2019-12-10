import { MockedResponse } from '@apollo/react-testing';
import { LanguageListDocument } from './language-list-query.generated';

export const languageListMock = (): MockedResponse => ({
  request: {
    query: LanguageListDocument,
  },
  result: {
    data: {
      languages: [
        {
          id: '12345',
          code: 'en',
          name: 'English',
        },
        {
          id: '98765',
          code: 'hu',
          name: 'Magyar',
        },
        {
          id: '11111',
          code: 'de',
          name: 'Deutsch',
        },
      ],
    },
  },
});
