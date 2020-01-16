import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type UpdateSubjectInfoMutationVariables = {
  subjectInfoID: Types.Scalars['ID'];
  title: Types.Maybe<Types.Scalars['String']>;
  content: Types.Maybe<Types.Scalars['String']>;
};

export type UpdateSubjectInfoMutation = { readonly __typename?: 'Mutation' } & {
  readonly updateSubjectInformation: { readonly __typename?: 'SubjectInformation' } & Pick<
    Types.SubjectInformation,
    'id' | 'title' | 'content'
  >;
};

export const UpdateSubjectInfoDocument = gql`
  mutation UpdateSubjectInfo($subjectInfoID: ID!, $title: String, $content: String) {
    updateSubjectInformation(
      where: { id: $subjectInfoID }
      data: { title: $title, content: $content }
    ) {
      id
      title
      content
    }
  }
`;
export type UpdateSubjectInfoMutationFn = ApolloReactCommon.MutationFunction<
  UpdateSubjectInfoMutation,
  UpdateSubjectInfoMutationVariables
>;

/**
 * __useUpdateSubjectInfoMutation__
 *
 * To run a mutation, you first call `useUpdateSubjectInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubjectInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubjectInfoMutation, { data, loading, error }] = useUpdateSubjectInfoMutation({
 *   variables: {
 *      subjectInfoID: // value for 'subjectInfoID'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdateSubjectInfoMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateSubjectInfoMutation,
    UpdateSubjectInfoMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateSubjectInfoMutation,
    UpdateSubjectInfoMutationVariables
  >(UpdateSubjectInfoDocument, baseOptions);
}
export type UpdateSubjectInfoMutationHookResult = ReturnType<typeof useUpdateSubjectInfoMutation>;
export type UpdateSubjectInfoMutationResult = ApolloReactCommon.MutationResult<
  UpdateSubjectInfoMutation
>;
export type UpdateSubjectInfoMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateSubjectInfoMutation,
  UpdateSubjectInfoMutationVariables
>;
