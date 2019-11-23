import * as Types from '../../../../core/graphql/types.generated';

import { SuggestionFragment, SuggestionFragmentDoc } from './suggestion-fragment.generated';
import gql from 'graphql-tag';

import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type SuggestionUpdateSubscriptionVariables = {
  noteID: Types.Maybe<Types.Scalars['ID']>;
};

export type SuggestionUpdateSubscription = { readonly __typename?: 'Subscription' } & {
  readonly updatedSuggestion: { readonly __typename?: 'Suggestion' } & SuggestionFragment;
};

export const SuggestionUpdateDocument = gql`
  subscription SuggestionUpdate($noteID: ID) {
    updatedSuggestion(where: { id: $noteID }) {
      ...Suggestion
    }
  }
  ${SuggestionFragmentDoc}
`;

/**
 * __useSuggestionUpdateSubscription__
 *
 * To run a query within a React component, call `useSuggestionUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSuggestionUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSuggestionUpdateSubscription({
 *   variables: {
 *      noteID: // value for 'noteID'
 *   },
 * });
 */
export function useSuggestionUpdateSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    SuggestionUpdateSubscription,
    SuggestionUpdateSubscriptionVariables
  >,
) {
  return ApolloReactHooks.useSubscription<
    SuggestionUpdateSubscription,
    SuggestionUpdateSubscriptionVariables
  >(SuggestionUpdateDocument, baseOptions);
}
export type SuggestionUpdateSubscriptionHookResult = ReturnType<
  typeof useSuggestionUpdateSubscription
>;
export type SuggestionUpdateSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  SuggestionUpdateSubscription
>;
