import * as Types from '../../../core/graphql/types.generated';

import gql from 'graphql-tag';

export type InfoDataFragment = { readonly __typename?: 'SubjectInformation' } & Pick<
  Types.SubjectInformation,
  'id' | 'title' | 'content'
>;

export const InfoDataFragmentDoc = gql`
  fragment InfoData on SubjectInformation {
    id
    title
    content
  }
`;
