import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type DeleteSubjectInfoMutationVariables = {
  subjectInfoID: Types.Scalars['ID'];
};

export type DeleteSubjectInfoMutation = { readonly __typename?: 'Mutation' } & {
  readonly deleteSubjectInformation: { readonly __typename?: 'SubjectInformation' } & Pick<
    Types.SubjectInformation,
    'id'
  >;
};

export const DeleteSubjectInfoDocument = gql`
  mutation DeleteSubjectInfo($subjectInfoID: ID!) {
    deleteSubjectInformation(where: { id: $subjectInfoID }) {
      id
    }
  }
`;
export type DeleteSubjectInfoMutationFn = ApolloReactCommon.MutationFunction<
  DeleteSubjectInfoMutation,
  DeleteSubjectInfoMutationVariables
>;

/**
 * __useDeleteSubjectInfoMutation__
 *
 * To run a mutation, you first call `useDeleteSubjectInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubjectInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubjectInfoMutation, { data, loading, error }] = useDeleteSubjectInfoMutation({
 *   variables: {
 *      subjectInfoID: // value for 'subjectInfoID'
 *   },
 * });
 */
export function useDeleteSubjectInfoMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteSubjectInfoMutation,
    DeleteSubjectInfoMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DeleteSubjectInfoMutation,
    DeleteSubjectInfoMutationVariables
  >(DeleteSubjectInfoDocument, baseOptions);
}
export type DeleteSubjectInfoMutationHookResult = ReturnType<typeof useDeleteSubjectInfoMutation>;
export type DeleteSubjectInfoMutationResult = ApolloReactCommon.MutationResult<
  DeleteSubjectInfoMutation
>;
export type DeleteSubjectInfoMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteSubjectInfoMutation,
  DeleteSubjectInfoMutationVariables
>;
