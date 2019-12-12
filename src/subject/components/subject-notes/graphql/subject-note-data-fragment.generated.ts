import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';

export type SubjectNoteDataFragment = { readonly __typename?: 'Note' } & Pick<
  Types.Note,
  'id' | 'title' | 'description' | 'number'
>;

export const SubjectNoteDataFragmentDoc = gql`
  fragment SubjectNoteData on Note {
    id
    title
    description
    number
  }
`;
