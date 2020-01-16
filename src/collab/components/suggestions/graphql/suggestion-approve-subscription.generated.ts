import * as Types from '../../../../core/graphql/types.generated';

import { SuggestionFragment } from './suggestion-fragment.generated';
import gql from 'graphql-tag';
import { SuggestionFragmentDoc } from './suggestion-fragment.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type SuggestionApproveSubscriptionVariables = {
  noteID: Types.Maybe<Types.Scalars['ID']>;
};

export type SuggestionApproveSubscription = { readonly __typename?: 'Subscription' } & {
  readonly approvedSuggestion: { readonly __typename?: 'Suggestion' } & SuggestionFragment;
};

export const SuggestionApproveDocument = gql`
  subscription SuggestionApprove($noteID: ID) {
    approvedSuggestion(where: { id: $noteID }) {
      ...Suggestion
    }
  }
  ${SuggestionFragmentDoc}
`;

/**
 * __useSuggestionApproveSubscription__
 *
 * To run a query within a React component, call `useSuggestionApproveSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSuggestionApproveSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSuggestionApproveSubscription({
 *   variables: {
 *      noteID: // value for 'noteID'
 *   },
 * });
 */
export function useSuggestionApproveSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    SuggestionApproveSubscription,
    SuggestionApproveSubscriptionVariables
  >,
) {
  return ApolloReactHooks.useSubscription<
    SuggestionApproveSubscription,
    SuggestionApproveSubscriptionVariables
  >(SuggestionApproveDocument, baseOptions);
}
export type SuggestionApproveSubscriptionHookResult = ReturnType<
  typeof useSuggestionApproveSubscription
>;
export type SuggestionApproveSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  SuggestionApproveSubscription
>;
