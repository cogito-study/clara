import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type MajorByTokenQueryVariables = {
  token: Types.Scalars['String'];
  majorID: Types.Scalars['ID'];
};

export type MajorByTokenQuery = { readonly __typename?: 'Query' } & {
  readonly majorByToken: Types.Maybe<
    { readonly __typename?: 'Major' } & {
      readonly subjects: ReadonlyArray<
        { readonly __typename?: 'Subject' } & Pick<Types.Subject, 'id' | 'name'>
      >;
    }
  >;
};

export const MajorByTokenDocument = gql`
  query MajorByToken($token: String!, $majorID: ID!) {
    majorByToken(data: { token: $token }, where: { id: $majorID }) {
      subjects {
        id
        name
      }
    }
  }
`;

/**
 * __useMajorByTokenQuery__
 *
 * To run a query within a React component, call `useMajorByTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useMajorByTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMajorByTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *      majorID: // value for 'majorID'
 *   },
 * });
 */
export function useMajorByTokenQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MajorByTokenQuery, MajorByTokenQueryVariables>,
) {
  return ApolloReactHooks.useQuery<MajorByTokenQuery, MajorByTokenQueryVariables>(
    MajorByTokenDocument,
    baseOptions,
  );
}
export function useMajorByTokenLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MajorByTokenQuery,
    MajorByTokenQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<MajorByTokenQuery, MajorByTokenQueryVariables>(
    MajorByTokenDocument,
    baseOptions,
  );
}
export type MajorByTokenQueryHookResult = ReturnType<typeof useMajorByTokenQuery>;
export type MajorByTokenLazyQueryHookResult = ReturnType<typeof useMajorByTokenLazyQuery>;
export type MajorByTokenQueryResult = ApolloReactCommon.QueryResult<
  MajorByTokenQuery,
  MajorByTokenQueryVariables
>;
