import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type SubjectNotesQueryVariables = {
  subjectCode: Types.Maybe<Types.Scalars['String']>;
};

export type SubjectNotesQuery = { readonly __typename?: 'Query' } & {
  readonly subject: Types.Maybe<
    { readonly __typename?: 'Subject' } & Pick<Types.Subject, 'id'> & {
        readonly notes: Types.Maybe<
          ReadonlyArray<
            { readonly __typename?: 'Note' } & Pick<
              Types.Note,
              'id' | 'title' | 'number' | 'updatedAt' | 'description'
            >
          >
        >;
      }
  >;
};

export const SubjectNotesDocument = gql`
  query SubjectNotes($subjectCode: String) {
    subject(where: { code: $subjectCode }) {
      id
      notes {
        id
        title
        number
        updatedAt
        description
      }
    }
  }
`;

/**
 * __useSubjectNotesQuery__
 *
 * To run a query within a React component, call `useSubjectNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjectNotesQuery({
 *   variables: {
 *      subjectCode: // value for 'subjectCode'
 *   },
 * });
 */
export function useSubjectNotesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<SubjectNotesQuery, SubjectNotesQueryVariables>,
) {
  return ApolloReactHooks.useQuery<SubjectNotesQuery, SubjectNotesQueryVariables>(
    SubjectNotesDocument,
    baseOptions,
  );
}
export function useSubjectNotesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SubjectNotesQuery,
    SubjectNotesQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<SubjectNotesQuery, SubjectNotesQueryVariables>(
    SubjectNotesDocument,
    baseOptions,
  );
}
export type SubjectNotesQueryHookResult = ReturnType<typeof useSubjectNotesQuery>;
export type SubjectNotesLazyQueryHookResult = ReturnType<typeof useSubjectNotesLazyQuery>;
export type SubjectNotesQueryResult = ApolloReactCommon.QueryResult<
  SubjectNotesQuery,
  SubjectNotesQueryVariables
>;
