import * as Types from '../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type NoteQueryVariables = {
  noteID: Types.Scalars['ID']
};


export type NoteQuery = (
  { readonly __typename?: 'Query' }
  & { readonly note: Types.Maybe<(
    { readonly __typename?: 'Note' }
    & Pick<Types.Note, 'title' | 'description' | 'number' | 'updatedAt'>
  )> }
);


export const NoteDocument = gql`
    query Note($noteID: ID!) {
  note(where: {id: $noteID}) {
    title
    description
    number
    updatedAt
  }
}
    `;

/**
 * __useNoteQuery__
 *
 * To run a query within a React component, call `useNoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useNoteQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNoteQuery({
 *   variables: {
 *      noteID: // value for 'noteID'
 *   },
 * });
 */
export function useNoteQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NoteQuery, NoteQueryVariables>) {
        return ApolloReactHooks.useQuery<NoteQuery, NoteQueryVariables>(NoteDocument, baseOptions);
      }
export function useNoteLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NoteQuery, NoteQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<NoteQuery, NoteQueryVariables>(NoteDocument, baseOptions);
        }
export type NoteQueryHookResult = ReturnType<typeof useNoteQuery>;
export type NoteLazyQueryHookResult = ReturnType<typeof useNoteLazyQuery>;
export type NoteQueryResult = ApolloReactCommon.QueryResult<NoteQuery, NoteQueryVariables>;