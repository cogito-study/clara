import * as Types from '../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type MyUserQueryVariables = {};

export type MyUserQuery = { readonly __typename?: 'Query' } & {
  readonly me: { readonly __typename?: 'User' } & Pick<
    Types.User,
    'id' | 'fullName' | 'email' | 'profilePictureURL'
  >;
};

export const MyUserDocument = gql`
  query MyUser {
    me {
      id
      fullName
      email
      profilePictureURL
    }
  }
`;

/**
 * __useMyUserQuery__
 *
 * To run a query within a React component, call `useMyUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MyUserQuery, MyUserQueryVariables>,
) {
  return ApolloReactHooks.useQuery<MyUserQuery, MyUserQueryVariables>(MyUserDocument, baseOptions);
}
export function useMyUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyUserQuery, MyUserQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<MyUserQuery, MyUserQueryVariables>(
    MyUserDocument,
    baseOptions,
  );
}
export type MyUserQueryHookResult = ReturnType<typeof useMyUserQuery>;
export type MyUserLazyQueryHookResult = ReturnType<typeof useMyUserLazyQuery>;
export type MyUserQueryResult = ApolloReactCommon.QueryResult<MyUserQuery, MyUserQueryVariables>;
