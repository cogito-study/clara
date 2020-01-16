import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';

export type SuggestionFragment = { readonly __typename?: 'Suggestion' } & Pick<
  Types.Suggestion,
  'id' | 'delta' | 'createdAt' | 'permissions'
> & { readonly author: { readonly __typename?: 'User' } & Pick<Types.User, 'id' | 'fullName'> };

export const SuggestionFragmentDoc = gql`
  fragment Suggestion on Suggestion {
    id
    delta
    createdAt
    permissions
    author {
      id
      fullName
    }
  }
`;
