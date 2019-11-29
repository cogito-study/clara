import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type NoteContentQueryVariables = {
  noteID: Types.Maybe<Types.Scalars['ID']>;
};

export type NoteContentQuery = { readonly __typename?: 'Query' } & {
  readonly note: Types.Maybe<
    { readonly __typename?: 'Note' } & Pick<Types.Note, 'id' | 'content'> & {
        readonly subject: { readonly __typename?: 'Subject' } & Pick<
          Types.Subject,
          'code' | 'name'
        >;
      }
  >;
};

export const NoteContentDocument = gql`
  query NoteContent($noteID: ID) {
    note(where: { id: $noteID }) {
      id
      content
      subject {
        code
        name
      }
    }
  }
`;

/**
 * __useNoteContentQuery__
 *
 * To run a query within a React component, call `useNoteContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useNoteContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNoteContentQuery({
 *   variables: {
 *      noteID: // value for 'noteID'
 *   },
 * });
 */
export function useNoteContentQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<NoteContentQuery, NoteContentQueryVariables>,
) {
  return ApolloReactHooks.useQuery<NoteContentQuery, NoteContentQueryVariables>(
    NoteContentDocument,
    baseOptions,
  );
}
export function useNoteContentLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NoteContentQuery, NoteContentQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<NoteContentQuery, NoteContentQueryVariables>(
    NoteContentDocument,
    baseOptions,
  );
}
export type NoteContentQueryHookResult = ReturnType<typeof useNoteContentQuery>;
export type NoteContentLazyQueryHookResult = ReturnType<typeof useNoteContentLazyQuery>;
export type NoteContentQueryResult = ApolloReactCommon.QueryResult<
  NoteContentQuery,
  NoteContentQueryVariables
>;
