import * as Types from '../../../graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type MenuDataQueryVariables = {};

export type MenuDataQuery = { readonly __typename?: 'Query' } & {
  readonly me: { readonly __typename?: 'User' } & Pick<
    Types.User,
    'id' | 'fullName' | 'profilePictureURL'
  > & {
      readonly studiedSubjects: ReadonlyArray<
        { readonly __typename?: 'Subject' } & Pick<Types.Subject, 'name' | 'code'>
      >;
    };
};

export const MenuDataDocument = gql`
  query MenuData {
    me {
      id
      fullName
      profilePictureURL
      studiedSubjects(where: { deletedAt: null }) {
        name
        code
      }
    }
  }
`;

/**
 * __useMenuDataQuery__
 *
 * To run a query within a React component, call `useMenuDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useMenuDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMenuDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useMenuDataQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MenuDataQuery, MenuDataQueryVariables>,
) {
  return ApolloReactHooks.useQuery<MenuDataQuery, MenuDataQueryVariables>(
    MenuDataDocument,
    baseOptions,
  );
}
export function useMenuDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MenuDataQuery, MenuDataQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<MenuDataQuery, MenuDataQueryVariables>(
    MenuDataDocument,
    baseOptions,
  );
}
export type MenuDataQueryHookResult = ReturnType<typeof useMenuDataQuery>;
export type MenuDataLazyQueryHookResult = ReturnType<typeof useMenuDataLazyQuery>;
export type MenuDataQueryResult = ApolloReactCommon.QueryResult<
  MenuDataQuery,
  MenuDataQueryVariables
>;
