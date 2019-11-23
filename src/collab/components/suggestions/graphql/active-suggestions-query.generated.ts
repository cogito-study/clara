import * as Types from '../../../../core/graphql/types.generated';

import { SuggestionFragment, SuggestionFragmentDoc } from './suggestion-fragment.generated';
import gql from 'graphql-tag';

import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type ActiveSuggestionsQueryVariables = {
  noteID: Types.Maybe<Types.Scalars['ID']>;
};

export type ActiveSuggestionsQuery = { readonly __typename?: 'Query' } & {
  readonly activeSuggestions: ReadonlyArray<
    { readonly __typename?: 'Suggestion' } & Pick<Types.Suggestion, 'likesCount'> &
      SuggestionFragment
  >;
};

export const ActiveSuggestionsDocument = gql`
  query ActiveSuggestions($noteID: ID) {
    activeSuggestions(where: { noteID: $noteID }) {
      likesCount
      ...Suggestion
    }
  }
  ${SuggestionFragmentDoc}
`;

/**
 * __useActiveSuggestionsQuery__
 *
 * To run a query within a React component, call `useActiveSuggestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useActiveSuggestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActiveSuggestionsQuery({
 *   variables: {
 *      noteID: // value for 'noteID'
 *   },
 * });
 */
export function useActiveSuggestionsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ActiveSuggestionsQuery,
    ActiveSuggestionsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<ActiveSuggestionsQuery, ActiveSuggestionsQueryVariables>(
    ActiveSuggestionsDocument,
    baseOptions,
  );
}
export function useActiveSuggestionsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ActiveSuggestionsQuery,
    ActiveSuggestionsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<ActiveSuggestionsQuery, ActiveSuggestionsQueryVariables>(
    ActiveSuggestionsDocument,
    baseOptions,
  );
}
export type ActiveSuggestionsQueryHookResult = ReturnType<typeof useActiveSuggestionsQuery>;
export type ActiveSuggestionsLazyQueryHookResult = ReturnType<typeof useActiveSuggestionsLazyQuery>;
export type ActiveSuggestionsQueryResult = ApolloReactCommon.QueryResult<
  ActiveSuggestionsQuery,
  ActiveSuggestionsQueryVariables
>;
