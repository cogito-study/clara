import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';

export type SubjectInfoDataFragment = { readonly __typename?: 'SubjectInformation' } & Pick<
  Types.SubjectInformation,
  'id' | 'title' | 'content'
>;

export const SubjectInfoDataFragmentDoc = gql`
  fragment SubjectInfoData on SubjectInformation {
    id
    title
    content
  }
`;
