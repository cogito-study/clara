import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type InstitutesByTokenQueryVariables = {
  token: Types.Scalars['String'];
};

export type InstitutesByTokenQuery = { readonly __typename?: 'Query' } & {
  readonly institutesByToken: ReadonlyArray<
    { readonly __typename?: 'Institute' } & Pick<Types.Institute, 'id' | 'name'> & {
        readonly faculties: ReadonlyArray<
          { readonly __typename?: 'Faculty' } & Pick<Types.Faculty, 'id' | 'name'> & {
              readonly majors: ReadonlyArray<
                { readonly __typename?: 'Major' } & Pick<Types.Major, 'id' | 'name'>
              >;
            }
        >;
      }
  >;
};

export const InstitutesByTokenDocument = gql`
  query InstitutesByToken($token: String!) {
    institutesByToken(token: $token) {
      id
      name
      faculties(where: { deletedAt: null }) {
        id
        name
        majors(where: { deletedAt: null }) {
          id
          name
        }
      }
    }
  }
`;

/**
 * __useInstitutesByTokenQuery__
 *
 * To run a query within a React component, call `useInstitutesByTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstitutesByTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstitutesByTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useInstitutesByTokenQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    InstitutesByTokenQuery,
    InstitutesByTokenQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<InstitutesByTokenQuery, InstitutesByTokenQueryVariables>(
    InstitutesByTokenDocument,
    baseOptions,
  );
}
export function useInstitutesByTokenLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    InstitutesByTokenQuery,
    InstitutesByTokenQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<InstitutesByTokenQuery, InstitutesByTokenQueryVariables>(
    InstitutesByTokenDocument,
    baseOptions,
  );
}
export type InstitutesByTokenQueryHookResult = ReturnType<typeof useInstitutesByTokenQuery>;
export type InstitutesByTokenLazyQueryHookResult = ReturnType<typeof useInstitutesByTokenLazyQuery>;
export type InstitutesByTokenQueryResult = ApolloReactCommon.QueryResult<
  InstitutesByTokenQuery,
  InstitutesByTokenQueryVariables
>;
