import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type UserInfoQueryVariables = {
  token: Types.Scalars['String'];
};

export type UserInfoQuery = { readonly __typename?: 'Query' } & {
  readonly userInfo: Types.Maybe<
    { readonly __typename?: 'User' } & Pick<Types.User, 'fullName' | 'email'>
  >;
};

export const UserInfoDocument = gql`
  query UserInfo($token: String!) {
    userInfo(token: $token) {
      fullName
      email
    }
  }
`;

/**
 * __useUserInfoQuery__
 *
 * To run a query within a React component, call `useUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInfoQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useUserInfoQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<UserInfoQuery, UserInfoQueryVariables>,
) {
  return ApolloReactHooks.useQuery<UserInfoQuery, UserInfoQueryVariables>(
    UserInfoDocument,
    baseOptions,
  );
}
export function useUserInfoLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserInfoQuery, UserInfoQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<UserInfoQuery, UserInfoQueryVariables>(
    UserInfoDocument,
    baseOptions,
  );
}
export type UserInfoQueryHookResult = ReturnType<typeof useUserInfoQuery>;
export type UserInfoLazyQueryHookResult = ReturnType<typeof useUserInfoLazyQuery>;
export type UserInfoQueryResult = ApolloReactCommon.QueryResult<
  UserInfoQuery,
  UserInfoQueryVariables
>;
