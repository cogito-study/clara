import * as Types from '../../../graphql/types.generated';

import { StudiedSubjectFragment } from './studied-subject-fragment.generated';
import gql from 'graphql-tag';
import { StudiedSubjectFragmentDoc } from './studied-subject-fragment.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type StudiedSubjectsQueryVariables = {};

export type StudiedSubjectsQuery = { readonly __typename?: 'Query' } & {
  readonly me: { readonly __typename?: 'User' } & {
    readonly studiedSubjects: Types.Maybe<
      ReadonlyArray<{ readonly __typename?: 'Subject' } & StudiedSubjectFragment>
    >;
  };
};

export const StudiedSubjectsDocument = gql`
  query StudiedSubjects {
    me {
      studiedSubjects {
        ...StudiedSubject
      }
    }
  }
  ${StudiedSubjectFragmentDoc}
`;

/**
 * __useStudiedSubjectsQuery__
 *
 * To run a query within a React component, call `useStudiedSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudiedSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudiedSubjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStudiedSubjectsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    StudiedSubjectsQuery,
    StudiedSubjectsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<StudiedSubjectsQuery, StudiedSubjectsQueryVariables>(
    StudiedSubjectsDocument,
    baseOptions,
  );
}
export function useStudiedSubjectsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    StudiedSubjectsQuery,
    StudiedSubjectsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<StudiedSubjectsQuery, StudiedSubjectsQueryVariables>(
    StudiedSubjectsDocument,
    baseOptions,
  );
}
export type StudiedSubjectsQueryHookResult = ReturnType<typeof useStudiedSubjectsQuery>;
export type StudiedSubjectsLazyQueryHookResult = ReturnType<typeof useStudiedSubjectsLazyQuery>;
export type StudiedSubjectsQueryResult = ApolloReactCommon.QueryResult<
  StudiedSubjectsQuery,
  StudiedSubjectsQueryVariables
>;
