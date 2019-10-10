import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type UserInfoQueryVariables = {
  userID: Types.Scalars['ID'];
};

export type UserInfoQuery = { __typename?: 'Query' } & {
  user: Types.Maybe<{ __typename?: 'User' } & Pick<Types.User, 'firstName' | 'lastName' | 'email'>>;
};

export const UserInfoDocument = gql`
  query UserInfo($userID: ID!) {
    user(where: { id: $userID }) {
      firstName
      lastName
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
 *      userID: // value for 'userID'
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
