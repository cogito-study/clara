import * as Types from '../../../../core/graphql/types.generated';

import { SuggestionFragment } from './suggestion-fragment.generated';
import gql from 'graphql-tag';
import { SuggestionFragmentDoc } from './suggestion-fragment.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type SuggestionRejectSubscriptionVariables = {
  noteID: Types.Maybe<Types.Scalars['ID']>;
};

export type SuggestionRejectSubscription = { readonly __typename?: 'Subscription' } & {
  readonly rejectedSuggestion: { readonly __typename?: 'Suggestion' } & SuggestionFragment;
};

export const SuggestionRejectDocument = gql`
  subscription SuggestionReject($noteID: ID) {
    rejectedSuggestion(where: { id: $noteID }) {
      ...Suggestion
    }
  }
  ${SuggestionFragmentDoc}
`;

/**
 * __useSuggestionRejectSubscription__
 *
 * To run a query within a React component, call `useSuggestionRejectSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSuggestionRejectSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSuggestionRejectSubscription({
 *   variables: {
 *      noteID: // value for 'noteID'
 *   },
 * });
 */
export function useSuggestionRejectSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    SuggestionRejectSubscription,
    SuggestionRejectSubscriptionVariables
  >,
) {
  return ApolloReactHooks.useSubscription<
    SuggestionRejectSubscription,
    SuggestionRejectSubscriptionVariables
  >(SuggestionRejectDocument, baseOptions);
}
export type SuggestionRejectSubscriptionHookResult = ReturnType<
  typeof useSuggestionRejectSubscription
>;
export type SuggestionRejectSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  SuggestionRejectSubscription
>;
