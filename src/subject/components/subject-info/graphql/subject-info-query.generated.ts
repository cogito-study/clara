import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type SubjectInfoQueryVariables = {
  subjectCode: Types.Maybe<Types.Scalars['String']>;
};

export type SubjectInfoQuery = { readonly __typename?: 'Query' } & {
  readonly subject: Types.Maybe<
    { readonly __typename?: 'Subject' } & Pick<Types.Subject, 'code' | 'description'> & {
        readonly department: { readonly __typename?: 'Department' } & Pick<
          Types.Department,
          'name'
        >;
        readonly teachers: Types.Maybe<
          ReadonlyArray<
            { readonly __typename?: 'User' } & Pick<
              Types.User,
              'firstName' | 'lastName' | 'email' | 'profilePictureURL'
            >
          >
        >;
        readonly informations: Types.Maybe<
          ReadonlyArray<
            { readonly __typename?: 'SubjectInformation' } & Pick<
              Types.SubjectInformation,
              'title' | 'subtitle' | 'content'
            >
          >
        >;
      }
  >;
};

export const SubjectInfoDocument = gql`
  query SubjectInfo($subjectCode: String) {
    subject(where: { code: $subjectCode }) {
      code
      description
      department {
        name
      }
      teachers {
        firstName
        lastName
        email
        profilePictureURL
      }
      informations {
        title
        subtitle
        content
      }
    }
  }
`;

/**
 * __useSubjectInfoQuery__
 *
 * To run a query within a React component, call `useSubjectInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjectInfoQuery({
 *   variables: {
 *      subjectCode: // value for 'subjectCode'
 *   },
 * });
 */
export function useSubjectInfoQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<SubjectInfoQuery, SubjectInfoQueryVariables>,
) {
  return ApolloReactHooks.useQuery<SubjectInfoQuery, SubjectInfoQueryVariables>(
    SubjectInfoDocument,
    baseOptions,
  );
}
export function useSubjectInfoLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SubjectInfoQuery, SubjectInfoQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<SubjectInfoQuery, SubjectInfoQueryVariables>(
    SubjectInfoDocument,
    baseOptions,
  );
}
export type SubjectInfoQueryHookResult = ReturnType<typeof useSubjectInfoQuery>;
export type SubjectInfoLazyQueryHookResult = ReturnType<typeof useSubjectInfoLazyQuery>;
export type SubjectInfoQueryResult = ApolloReactCommon.QueryResult<
  SubjectInfoQuery,
  SubjectInfoQueryVariables
>;
