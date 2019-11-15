import * as Types from '../../../../core/graphql/types.generated';

import { FeedPostFragment } from '../../../../social/components/feed-post/graphql/feed-post-fragment.generated';
import gql from 'graphql-tag';
import { FeedPostFragmentDoc } from '../../../../social/components/feed-post/graphql/feed-post-fragment.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type SubjectFeedQueryVariables = {
  subjectCode: Types.Maybe<Types.Scalars['String']>;
};

export type SubjectFeedQuery = { readonly __typename?: 'Query' } & {
  readonly subject: Types.Maybe<
    { readonly __typename?: 'Subject' } & Pick<Types.Subject, 'id'> & {
        readonly posts: Types.Maybe<
          ReadonlyArray<{ readonly __typename?: 'Post' } & FeedPostFragment>
        >;
      }
  >;
};

export const SubjectFeedDocument = gql`
  query SubjectFeed($subjectCode: String) {
    subject(where: { code: $subjectCode }) {
      id
      posts(orderBy: { createdAt: desc }) {
        ...FeedPost
      }
    }
  }
  ${FeedPostFragmentDoc}
`;

/**
 * __useSubjectFeedQuery__
 *
 * To run a query within a React component, call `useSubjectFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjectFeedQuery({
 *   variables: {
 *      subjectCode: // value for 'subjectCode'
 *   },
 * });
 */
export function useSubjectFeedQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<SubjectFeedQuery, SubjectFeedQueryVariables>,
) {
  return ApolloReactHooks.useQuery<SubjectFeedQuery, SubjectFeedQueryVariables>(
    SubjectFeedDocument,
    baseOptions,
  );
}
export function useSubjectFeedLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SubjectFeedQuery, SubjectFeedQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<SubjectFeedQuery, SubjectFeedQueryVariables>(
    SubjectFeedDocument,
    baseOptions,
  );
}
export type SubjectFeedQueryHookResult = ReturnType<typeof useSubjectFeedQuery>;
export type SubjectFeedLazyQueryHookResult = ReturnType<typeof useSubjectFeedLazyQuery>;
export type SubjectFeedQueryResult = ApolloReactCommon.QueryResult<
  SubjectFeedQuery,
  SubjectFeedQueryVariables
>;
