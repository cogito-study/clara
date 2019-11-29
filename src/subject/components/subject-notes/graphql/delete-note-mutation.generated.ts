import * as Types from '../../../../core/graphql/types.generated';

import { NoteDataFragment } from './note-data-fragment.generated';
import gql from 'graphql-tag';
import { NoteDataFragmentDoc } from './note-data-fragment.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type DeleteNoteMutationVariables = {
  id: Types.Scalars['ID'];
};

export type DeleteNoteMutation = { readonly __typename?: 'Mutation' } & {
  readonly deleteNote: { readonly __typename?: 'Note' } & NoteDataFragment;
};

export const DeleteNoteDocument = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(where: { id: $id }) {
      ...NoteData
    }
  }
  ${NoteDataFragmentDoc}
`;
export type DeleteNoteMutationFn = ApolloReactCommon.MutationFunction<
  DeleteNoteMutation,
  DeleteNoteMutationVariables
>;

/**
 * __useDeleteNoteMutation__
 *
 * To run a mutation, you first call `useDeleteNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNoteMutation, { data, loading, error }] = useDeleteNoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteNoteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteNoteMutation,
    DeleteNoteMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(
    DeleteNoteDocument,
    baseOptions,
  );
}
export type DeleteNoteMutationHookResult = ReturnType<typeof useDeleteNoteMutation>;
export type DeleteNoteMutationResult = ApolloReactCommon.MutationResult<DeleteNoteMutation>;
export type DeleteNoteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteNoteMutation,
  DeleteNoteMutationVariables
>;
