import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type CreateSuggestionMutationVariables = {
  noteID: Types.Scalars['ID'];
  delta: Types.Scalars['String'];
};

export type CreateSuggestionMutation = { readonly __typename?: 'Mutation' } & {
  readonly createSuggestion: { readonly __typename?: 'Suggestion' } & Pick<Types.Suggestion, 'id'>;
};

export const CreateSuggestionDocument = gql`
  mutation CreateSuggestion($noteID: ID!, $delta: String!) {
    createSuggestion(data: { note: { id: $noteID }, delta: $delta }) {
      id
    }
  }
`;
export type CreateSuggestionMutationFn = ApolloReactCommon.MutationFunction<
  CreateSuggestionMutation,
  CreateSuggestionMutationVariables
>;

/**
 * __useCreateSuggestionMutation__
 *
 * To run a mutation, you first call `useCreateSuggestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSuggestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSuggestionMutation, { data, loading, error }] = useCreateSuggestionMutation({
 *   variables: {
 *      noteID: // value for 'noteID'
 *      delta: // value for 'delta'
 *   },
 * });
 */
export function useCreateSuggestionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateSuggestionMutation,
    CreateSuggestionMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<CreateSuggestionMutation, CreateSuggestionMutationVariables>(
    CreateSuggestionDocument,
    baseOptions,
  );
}
export type CreateSuggestionMutationHookResult = ReturnType<typeof useCreateSuggestionMutation>;
export type CreateSuggestionMutationResult = ApolloReactCommon.MutationResult<
  CreateSuggestionMutation
>;
export type CreateSuggestionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateSuggestionMutation,
  CreateSuggestionMutationVariables
>;
