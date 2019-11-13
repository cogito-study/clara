import * as Types from '../../../graphql/types.generated';

import gql from 'graphql-tag';

export type StudiedSubjectFragment = { readonly __typename?: 'Subject' } & Pick<
  Types.Subject,
  'code' | 'name'
>;

export const StudiedSubjectFragmentDoc = gql`
  fragment StudiedSubject on Subject {
    code
    name
  }
`;
