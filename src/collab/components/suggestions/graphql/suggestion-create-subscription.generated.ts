import * as Types from '../../../../core/graphql/types.generated';

import { SuggestionFragment } from './suggestion-fragment.generated';
import gql from 'graphql-tag';
import { SuggestionFragmentDoc } from './suggestion-fragment.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type SuggestionCreateSubscriptionVariables = {
  noteID: Types.Maybe<Types.Scalars['ID']>;
};

export type SuggestionCreateSubscription = { readonly __typename?: 'Subscription' } & {
  readonly createdSuggestion: { readonly __typename?: 'Suggestion' } & SuggestionFragment;
};

export const SuggestionCreateDocument = gql`
  subscription SuggestionCreate($noteID: ID) {
    createdSuggestion(where: { id: $noteID }) {
      ...Suggestion
    }
  }
  ${SuggestionFragmentDoc}
`;

/**
 * __useSuggestionCreateSubscription__
 *
 * To run a query within a React component, call `useSuggestionCreateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSuggestionCreateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSuggestionCreateSubscription({
 *   variables: {
 *      noteID: // value for 'noteID'
 *   },
 * });
 */
export function useSuggestionCreateSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    SuggestionCreateSubscription,
    SuggestionCreateSubscriptionVariables
  >,
) {
  return ApolloReactHooks.useSubscription<
    SuggestionCreateSubscription,
    SuggestionCreateSubscriptionVariables
  >(SuggestionCreateDocument, baseOptions);
}
export type SuggestionCreateSubscriptionHookResult = ReturnType<
  typeof useSuggestionCreateSubscription
>;
export type SuggestionCreateSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  SuggestionCreateSubscription
>;
