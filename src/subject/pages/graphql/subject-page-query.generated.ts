import * as Types from '../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type SubjectPageQueryVariables = {
  subjectCode: Types.Maybe<Types.Scalars['String']>;
};

export type SubjectPageQuery = { readonly __typename?: 'Query' } & {
  readonly subject: Types.Maybe<
    { readonly __typename?: 'Subject' } & Pick<Types.Subject, 'id' | 'name'>
  >;
};

export const SubjectPageDocument = gql`
  query SubjectPage($subjectCode: String) {
    subject(where: { code: $subjectCode }) {
      id
      name
    }
  }
`;

/**
 * __useSubjectPageQuery__
 *
 * To run a query within a React component, call `useSubjectPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjectPageQuery({
 *   variables: {
 *      subjectCode: // value for 'subjectCode'
 *   },
 * });
 */
export function useSubjectPageQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<SubjectPageQuery, SubjectPageQueryVariables>,
) {
  return ApolloReactHooks.useQuery<SubjectPageQuery, SubjectPageQueryVariables>(
    SubjectPageDocument,
    baseOptions,
  );
}
export function useSubjectPageLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SubjectPageQuery, SubjectPageQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<SubjectPageQuery, SubjectPageQueryVariables>(
    SubjectPageDocument,
    baseOptions,
  );
}
export type SubjectPageQueryHookResult = ReturnType<typeof useSubjectPageQuery>;
export type SubjectPageLazyQueryHookResult = ReturnType<typeof useSubjectPageLazyQuery>;
export type SubjectPageQueryResult = ApolloReactCommon.QueryResult<
  SubjectPageQuery,
  SubjectPageQueryVariables
>;
