import * as Types from '../../../graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type SubjectTitleQueryVariables = {
  subjectCode: Types.Maybe<Types.Scalars['String']>;
};

export type SubjectTitleQuery = { readonly __typename?: 'Query' } & {
  readonly subject: Types.Maybe<{ readonly __typename?: 'Subject' } & Pick<Types.Subject, 'name'>>;
};

export const SubjectTitleDocument = gql`
  query SubjectTitle($subjectCode: String) {
    subject(where: { code: $subjectCode }) {
      name
    }
  }
`;

/**
 * __useSubjectTitleQuery__
 *
 * To run a query within a React component, call `useSubjectTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjectTitleQuery({
 *   variables: {
 *      subjectCode: // value for 'subjectCode'
 *   },
 * });
 */
export function useSubjectTitleQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<SubjectTitleQuery, SubjectTitleQueryVariables>,
) {
  return ApolloReactHooks.useQuery<SubjectTitleQuery, SubjectTitleQueryVariables>(
    SubjectTitleDocument,
    baseOptions,
  );
}
export function useSubjectTitleLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SubjectTitleQuery,
    SubjectTitleQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<SubjectTitleQuery, SubjectTitleQueryVariables>(
    SubjectTitleDocument,
    baseOptions,
  );
}
export type SubjectTitleQueryHookResult = ReturnType<typeof useSubjectTitleQuery>;
export type SubjectTitleLazyQueryHookResult = ReturnType<typeof useSubjectTitleLazyQuery>;
export type SubjectTitleQueryResult = ApolloReactCommon.QueryResult<
  SubjectTitleQuery,
  SubjectTitleQueryVariables
>;
