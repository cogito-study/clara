import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type CreateSubjectInfoMutationVariables = {
  subjectID: Types.Scalars['ID'];
  title: Types.Scalars['String'];
  content: Types.Scalars['String'];
};

export type CreateSubjectInfoMutation = { readonly __typename?: 'Mutation' } & {
  readonly createSubjectInformation: { readonly __typename?: 'SubjectInformation' } & Pick<
    Types.SubjectInformation,
    'id'
  >;
};

export const CreateSubjectInfoDocument = gql`
  mutation CreateSubjectInfo($subjectID: ID!, $title: String!, $content: String!) {
    createSubjectInformation(
      data: { title: $title, content: $content, subject: { id: $subjectID } }
    ) {
      id
    }
  }
`;
export type CreateSubjectInfoMutationFn = ApolloReactCommon.MutationFunction<
  CreateSubjectInfoMutation,
  CreateSubjectInfoMutationVariables
>;

/**
 * __useCreateSubjectInfoMutation__
 *
 * To run a mutation, you first call `useCreateSubjectInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubjectInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubjectInfoMutation, { data, loading, error }] = useCreateSubjectInfoMutation({
 *   variables: {
 *      subjectID: // value for 'subjectID'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateSubjectInfoMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateSubjectInfoMutation,
    CreateSubjectInfoMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateSubjectInfoMutation,
    CreateSubjectInfoMutationVariables
  >(CreateSubjectInfoDocument, baseOptions);
}
export type CreateSubjectInfoMutationHookResult = ReturnType<typeof useCreateSubjectInfoMutation>;
export type CreateSubjectInfoMutationResult = ApolloReactCommon.MutationResult<
  CreateSubjectInfoMutation
>;
export type CreateSubjectInfoMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateSubjectInfoMutation,
  CreateSubjectInfoMutationVariables
>;
