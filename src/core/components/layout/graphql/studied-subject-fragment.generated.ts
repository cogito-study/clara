import * as Types from '../../../graphql/types.generated';

import gql from 'graphql-tag';

export type StudiedSubjectFragment = { readonly __typename?: 'Subject' } & Pick<
  Types.Subject,
  'id' | 'code' | 'name'
>;

export const StudiedSubjectFragmentDoc = gql`
  fragment StudiedSubject on Subject {
    id
    code
    name
  }
`;
