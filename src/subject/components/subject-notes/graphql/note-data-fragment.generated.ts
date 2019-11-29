import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';

export type NoteDataFragment = { readonly __typename?: 'Note' } & Pick<
  Types.Note,
  'id' | 'title' | 'description' | 'number'
>;

export const NoteDataFragmentDoc = gql`
  fragment NoteData on Note {
    id
    title
    description
    number
  }
`;
