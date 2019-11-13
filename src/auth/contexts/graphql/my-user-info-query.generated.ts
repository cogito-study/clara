import { UserInfoFragment } from './user-info-fragment.generated';
import gql from 'graphql-tag';
import { UserInfoFragmentDoc } from './user-info-fragment.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type MyUserInfoQueryVariables = {};

export type MyUserInfoQuery = { readonly __typename?: 'Query' } & {
  readonly me: { readonly __typename?: 'User' } & UserInfoFragment;
};

export const MyUserInfoDocument = gql`
  query MyUserInfo {
    me {
      ...UserInfo
    }
  }
  ${UserInfoFragmentDoc}
`;

/**
 * __useMyUserInfoQuery__
 *
 * To run a query within a React component, call `useMyUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyUserInfoQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MyUserInfoQuery, MyUserInfoQueryVariables>,
) {
  return ApolloReactHooks.useQuery<MyUserInfoQuery, MyUserInfoQueryVariables>(
    MyUserInfoDocument,
    baseOptions,
  );
}
export function useMyUserInfoLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyUserInfoQuery, MyUserInfoQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<MyUserInfoQuery, MyUserInfoQueryVariables>(
    MyUserInfoDocument,
    baseOptions,
  );
}
export type MyUserInfoQueryHookResult = ReturnType<typeof useMyUserInfoQuery>;
export type MyUserInfoLazyQueryHookResult = ReturnType<typeof useMyUserInfoLazyQuery>;
export type MyUserInfoQueryResult = ApolloReactCommon.QueryResult<
  MyUserInfoQuery,
  MyUserInfoQueryVariables
>;
