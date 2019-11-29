import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type SubjectNoteListQueryVariables = {
  subjectCode: Types.Maybe<Types.Scalars['String']>;
};

export type SubjectNoteListQuery = { readonly __typename?: 'Query' } & {
  readonly subject: Types.Maybe<
    { readonly __typename?: 'Subject' } & Pick<Types.Subject, 'id'> & {
        readonly notes: ReadonlyArray<
          { readonly __typename?: 'Note' } & Pick<
            Types.Note,
            'id' | 'title' | 'number' | 'updatedAt' | 'description'
          >
        >;
      }
  >;
};

export const SubjectNoteListDocument = gql`
  query SubjectNoteList($subjectCode: String) {
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
 * __useSubjectNoteListQuery__
 *
 * To run a query within a React component, call `useSubjectNoteListQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectNoteListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjectNoteListQuery({
 *   variables: {
 *      subjectCode: // value for 'subjectCode'
 *   },
 * });
 */
export function useSubjectNoteListQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SubjectNoteListQuery,
    SubjectNoteListQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<SubjectNoteListQuery, SubjectNoteListQueryVariables>(
    SubjectNoteListDocument,
    baseOptions,
  );
}
export function useSubjectNoteListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SubjectNoteListQuery,
    SubjectNoteListQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<SubjectNoteListQuery, SubjectNoteListQueryVariables>(
    SubjectNoteListDocument,
    baseOptions,
  );
}
export type SubjectNoteListQueryHookResult = ReturnType<typeof useSubjectNoteListQuery>;
export type SubjectNoteListLazyQueryHookResult = ReturnType<typeof useSubjectNoteListLazyQuery>;
export type SubjectNoteListQueryResult = ApolloReactCommon.QueryResult<
  SubjectNoteListQuery,
  SubjectNoteListQueryVariables
>;
