import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { LanguageFragment, LanguageFragmentDoc } from './language-fragment.generated';

export type LanguageListQueryVariables = {};

export type LanguageListQuery = { readonly __typename?: 'Query' } & {
  readonly languages: ReadonlyArray<{ readonly __typename?: 'Language' } & LanguageFragment>;
};

export const LanguageListDocument = gql`
  query LanguageList {
    languages {
      ...Language
    }
  }
  ${LanguageFragmentDoc}
`;

/**
 * __useLanguageListQuery__
 *
 * To run a query within a React component, call `useLanguageListQuery` and pass it any options that fit your needs.
 * When your component renders, `useLanguageListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLanguageListQuery({
 *   variables: {
 *   },
 * });
 */
export function useLanguageListQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<LanguageListQuery, LanguageListQueryVariables>,
) {
  return ApolloReactHooks.useQuery<LanguageListQuery, LanguageListQueryVariables>(
    LanguageListDocument,
    baseOptions,
  );
}
export function useLanguageListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    LanguageListQuery,
    LanguageListQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<LanguageListQuery, LanguageListQueryVariables>(
    LanguageListDocument,
    baseOptions,
  );
}
export type LanguageListQueryHookResult = ReturnType<typeof useLanguageListQuery>;
export type LanguageListLazyQueryHookResult = ReturnType<typeof useLanguageListLazyQuery>;
export type LanguageListQueryResult = ApolloReactCommon.QueryResult<
  LanguageListQuery,
  LanguageListQueryVariables
>;
