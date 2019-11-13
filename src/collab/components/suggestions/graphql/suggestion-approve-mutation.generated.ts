import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type ApproveSuggestionMutationVariables = {
  suggestionID: Types.Scalars['ID'];
};

export type ApproveSuggestionMutation = { readonly __typename?: 'Mutation' } & {
  readonly approveSuggestion: { readonly __typename?: 'Suggestion' } & Pick<Types.Suggestion, 'id'>;
};

export const ApproveSuggestionDocument = gql`
  mutation ApproveSuggestion($suggestionID: ID!) {
    approveSuggestion(where: { id: $suggestionID }) {
      id
    }
  }
`;
export type ApproveSuggestionMutationFn = ApolloReactCommon.MutationFunction<
  ApproveSuggestionMutation,
  ApproveSuggestionMutationVariables
>;

/**
 * __useApproveSuggestionMutation__
 *
 * To run a mutation, you first call `useApproveSuggestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveSuggestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveSuggestionMutation, { data, loading, error }] = useApproveSuggestionMutation({
 *   variables: {
 *      suggestionID: // value for 'suggestionID'
 *   },
 * });
 */
export function useApproveSuggestionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ApproveSuggestionMutation,
    ApproveSuggestionMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ApproveSuggestionMutation,
    ApproveSuggestionMutationVariables
  >(ApproveSuggestionDocument, baseOptions);
}
export type ApproveSuggestionMutationHookResult = ReturnType<typeof useApproveSuggestionMutation>;
export type ApproveSuggestionMutationResult = ApolloReactCommon.MutationResult<
  ApproveSuggestionMutation
>;
export type ApproveSuggestionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ApproveSuggestionMutation,
  ApproveSuggestionMutationVariables
>;
