import * as Types from '../types.generated';

import gql from 'graphql-tag';

export type LanguageFragment = { readonly __typename?: 'Language' } & Pick<
  Types.Language,
  'id' | 'name' | 'code'
>;

export const LanguageFragmentDoc = gql`
  fragment Language on Language {
    id
    name
    code
  }
`;
