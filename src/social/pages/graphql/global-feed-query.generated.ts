import * as Types from '../../../core/graphql/types.generated';

import { FeedPostFragment } from '../../components/feed-post/graphql/feed-post-fragment.generated';
import gql from 'graphql-tag';
import { FeedPostFragmentDoc } from '../../components/feed-post/graphql/feed-post-fragment.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type GlobalFeedQueryVariables = {};

export type GlobalFeedQuery = { readonly __typename?: 'Query' } & {
  readonly posts: ReadonlyArray<
    { readonly __typename?: 'Post' } & {
      readonly subject: { readonly __typename?: 'Subject' } & Pick<Types.Subject, 'name'>;
    } & FeedPostFragment
  >;
};

export const GlobalFeedDocument = gql`
  query GlobalFeed {
    posts {
      ...FeedPost
      subject {
        name
      }
    }
  }
  ${FeedPostFragmentDoc}
`;

/**
 * __useGlobalFeedQuery__
 *
 * To run a query within a React component, call `useGlobalFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGlobalFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGlobalFeedQuery({
 *   variables: {
 *   },
 * });
 */
export function useGlobalFeedQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GlobalFeedQuery, GlobalFeedQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GlobalFeedQuery, GlobalFeedQueryVariables>(
    GlobalFeedDocument,
    baseOptions,
  );
}
export function useGlobalFeedLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GlobalFeedQuery, GlobalFeedQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GlobalFeedQuery, GlobalFeedQueryVariables>(
    GlobalFeedDocument,
    baseOptions,
  );
}
export type GlobalFeedQueryHookResult = ReturnType<typeof useGlobalFeedQuery>;
export type GlobalFeedLazyQueryHookResult = ReturnType<typeof useGlobalFeedLazyQuery>;
export type GlobalFeedQueryResult = ApolloReactCommon.QueryResult<
  GlobalFeedQuery,
  GlobalFeedQueryVariables
>;
