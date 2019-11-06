import * as Types from '../../../graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type MySubjectsQueryVariables = {};

export type MySubjectsQuery = { readonly __typename?: 'Query' } & {
  readonly me: { readonly __typename?: 'User' } & {
    readonly studiedSubjects: Types.Maybe<
      ReadonlyArray<{ readonly __typename?: 'Subject' } & Pick<Types.Subject, 'code' | 'name'>>
    >;
  };
};

export const MySubjectsDocument = gql`
  query MySubjects {
    me {
      studiedSubjects {
        code
        name
      }
    }
  }
`;

/**
 * __useMySubjectsQuery__
 *
 * To run a query within a React component, call `useMySubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMySubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMySubjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMySubjectsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MySubjectsQuery, MySubjectsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<MySubjectsQuery, MySubjectsQueryVariables>(
    MySubjectsDocument,
    baseOptions,
  );
}
export function useMySubjectsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MySubjectsQuery, MySubjectsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<MySubjectsQuery, MySubjectsQueryVariables>(
    MySubjectsDocument,
    baseOptions,
  );
}
export type MySubjectsQueryHookResult = ReturnType<typeof useMySubjectsQuery>;
export type MySubjectsLazyQueryHookResult = ReturnType<typeof useMySubjectsLazyQuery>;
export type MySubjectsQueryResult = ApolloReactCommon.QueryResult<
  MySubjectsQuery,
  MySubjectsQueryVariables
>;
