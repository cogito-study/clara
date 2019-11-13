import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type RejectSuggestionMutationVariables = {
  suggestionID: Types.Scalars['ID'];
};

export type RejectSuggestionMutation = { readonly __typename?: 'Mutation' } & {
  readonly rejectSuggestion: { readonly __typename?: 'Suggestion' } & Pick<Types.Suggestion, 'id'>;
};

export const RejectSuggestionDocument = gql`
  mutation RejectSuggestion($suggestionID: ID!) {
    rejectSuggestion(where: { id: $suggestionID }) {
      id
    }
  }
`;
export type RejectSuggestionMutationFn = ApolloReactCommon.MutationFunction<
  RejectSuggestionMutation,
  RejectSuggestionMutationVariables
>;

/**
 * __useRejectSuggestionMutation__
 *
 * To run a mutation, you first call `useRejectSuggestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectSuggestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectSuggestionMutation, { data, loading, error }] = useRejectSuggestionMutation({
 *   variables: {
 *      suggestionID: // value for 'suggestionID'
 *   },
 * });
 */
export function useRejectSuggestionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RejectSuggestionMutation,
    RejectSuggestionMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<RejectSuggestionMutation, RejectSuggestionMutationVariables>(
    RejectSuggestionDocument,
    baseOptions,
  );
}
export type RejectSuggestionMutationHookResult = ReturnType<typeof useRejectSuggestionMutation>;
export type RejectSuggestionMutationResult = ApolloReactCommon.MutationResult<
  RejectSuggestionMutation
>;
export type RejectSuggestionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RejectSuggestionMutation,
  RejectSuggestionMutationVariables
>;
