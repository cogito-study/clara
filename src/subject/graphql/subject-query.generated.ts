import * as Types from '../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type SubjectQueryVariables = {
  subjectID: Types.Scalars['ID'];
};

export type SubjectQuery = { readonly __typename?: 'Query' } & {
  readonly subject: Types.Maybe<
    { readonly __typename?: 'Subject' } & Pick<Types.Subject, 'name'> & {
        readonly notes: Types.Maybe<
          ReadonlyArray<
            { readonly __typename?: 'Note' } & Pick<
              Types.Note,
              'id' | 'title' | 'description' | 'number' | 'updatedAt'
            >
          >
        >;
      }
  >;
};

export const SubjectDocument = gql`
  query Subject($subjectID: ID!) {
    subject(where: { id: $subjectID }) {
      name
      notes {
        id
        title
        description
        number
        updatedAt
      }
    }
  }
`;

/**
 * __useSubjectQuery__
 *
 * To run a query within a React component, call `useSubjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjectQuery({
 *   variables: {
 *      subjectID: // value for 'subjectID'
 *   },
 * });
 */
export function useSubjectQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<SubjectQuery, SubjectQueryVariables>,
) {
  return ApolloReactHooks.useQuery<SubjectQuery, SubjectQueryVariables>(
    SubjectDocument,
    baseOptions,
  );
}
export function useSubjectLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SubjectQuery, SubjectQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<SubjectQuery, SubjectQueryVariables>(
    SubjectDocument,
    baseOptions,
  );
}
export type SubjectQueryHookResult = ReturnType<typeof useSubjectQuery>;
export type SubjectLazyQueryHookResult = ReturnType<typeof useSubjectLazyQuery>;
export type SubjectQueryResult = ApolloReactCommon.QueryResult<SubjectQuery, SubjectQueryVariables>;
