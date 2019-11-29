import * as Types from '../../../../core/graphql/types.generated';

import { NoteDataFragment } from './note-data-fragment.generated';
import gql from 'graphql-tag';
import { NoteDataFragmentDoc } from './note-data-fragment.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type UpdateNoteMutationVariables = {
  id: Types.Scalars['ID'];
  title: Types.Maybe<Types.Scalars['String']>;
  description: Types.Maybe<Types.Scalars['String']>;
  number: Types.Maybe<Types.Scalars['Int']>;
};

export type UpdateNoteMutation = { readonly __typename?: 'Mutation' } & {
  readonly updateNote: { readonly __typename?: 'Note' } & NoteDataFragment;
};

export const UpdateNoteDocument = gql`
  mutation UpdateNote($id: ID!, $title: String, $description: String, $number: Int) {
    updateNote(
      where: { id: $id }
      data: { title: $title, description: $description, number: $number }
    ) {
      ...NoteData
    }
  }
  ${NoteDataFragmentDoc}
`;
export type UpdateNoteMutationFn = ApolloReactCommon.MutationFunction<
  UpdateNoteMutation,
  UpdateNoteMutationVariables
>;

/**
 * __useUpdateNoteMutation__
 *
 * To run a mutation, you first call `useUpdateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNoteMutation, { data, loading, error }] = useUpdateNoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      number: // value for 'number'
 *   },
 * });
 */
export function useUpdateNoteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateNoteMutation,
    UpdateNoteMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<UpdateNoteMutation, UpdateNoteMutationVariables>(
    UpdateNoteDocument,
    baseOptions,
  );
}
export type UpdateNoteMutationHookResult = ReturnType<typeof useUpdateNoteMutation>;
export type UpdateNoteMutationResult = ApolloReactCommon.MutationResult<UpdateNoteMutation>;
export type UpdateNoteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateNoteMutation,
  UpdateNoteMutationVariables
>;
