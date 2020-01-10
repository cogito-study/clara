import * as Types from '../../../../core/graphql/types.generated';

import { SubjectNoteDataFragment } from './subject-note-data-fragment.generated';
import gql from 'graphql-tag';
import { SubjectNoteDataFragmentDoc } from './subject-note-data-fragment.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type CreateNoteMutationVariables = {
  subjectID: Types.Scalars['ID'];
  title: Types.Scalars['String'];
  description: Types.Maybe<Types.Scalars['String']>;
  number: Types.Scalars['Int'];
};

export type CreateNoteMutation = { readonly __typename?: 'Mutation' } & {
  readonly createNote: { readonly __typename?: 'Note' } & SubjectNoteDataFragment;
};

export const CreateNoteDocument = gql`
  mutation CreateNote($subjectID: ID!, $title: String!, $description: String, $number: Int!) {
    createNote(
      data: {
        subject: { id: $subjectID }
        title: $title
        description: $description
        number: $number
        content: "{ops:[]}"
        contentHTML: ""
        noteCategory: NOTE
      }
    ) {
      ...SubjectNoteData
    }
  }
  ${SubjectNoteDataFragmentDoc}
`;
export type CreateNoteMutationFn = ApolloReactCommon.MutationFunction<
  CreateNoteMutation,
  CreateNoteMutationVariables
>;

/**
 * __useCreateNoteMutation__
 *
 * To run a mutation, you first call `useCreateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNoteMutation, { data, loading, error }] = useCreateNoteMutation({
 *   variables: {
 *      subjectID: // value for 'subjectID'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      number: // value for 'number'
 *   },
 * });
 */
export function useCreateNoteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateNoteMutation,
    CreateNoteMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(
    CreateNoteDocument,
    baseOptions,
  );
}
export type CreateNoteMutationHookResult = ReturnType<typeof useCreateNoteMutation>;
export type CreateNoteMutationResult = ApolloReactCommon.MutationResult<CreateNoteMutation>;
export type CreateNoteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateNoteMutation,
  CreateNoteMutationVariables
>;
