import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type CreateNewMajorRequestMutationVariables = {
  institute: Types.Scalars['String'];
  faculty: Types.Scalars['String'];
  major: Types.Scalars['String'];
  token: Types.Scalars['String'];
};

export type CreateNewMajorRequestMutation = { readonly __typename?: 'Mutation' } & {
  readonly createNewMajorRequest: { readonly __typename?: 'NewMajorRequest' } & Pick<
    Types.NewMajorRequest,
    'id'
  >;
};

export const CreateNewMajorRequestDocument = gql`
  mutation CreateNewMajorRequest(
    $institute: String!
    $faculty: String!
    $major: String!
    $token: String!
  ) {
    createNewMajorRequest(
      data: { institute: $institute, faculty: $faculty, major: $major, token: $token }
    ) {
      id
    }
  }
`;
export type CreateNewMajorRequestMutationFn = ApolloReactCommon.MutationFunction<
  CreateNewMajorRequestMutation,
  CreateNewMajorRequestMutationVariables
>;

/**
 * __useCreateNewMajorRequestMutation__
 *
 * To run a mutation, you first call `useCreateNewMajorRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewMajorRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewMajorRequestMutation, { data, loading, error }] = useCreateNewMajorRequestMutation({
 *   variables: {
 *      institute: // value for 'institute'
 *      faculty: // value for 'faculty'
 *      major: // value for 'major'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useCreateNewMajorRequestMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateNewMajorRequestMutation,
    CreateNewMajorRequestMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateNewMajorRequestMutation,
    CreateNewMajorRequestMutationVariables
  >(CreateNewMajorRequestDocument, baseOptions);
}
export type CreateNewMajorRequestMutationHookResult = ReturnType<
  typeof useCreateNewMajorRequestMutation
>;
export type CreateNewMajorRequestMutationResult = ApolloReactCommon.MutationResult<
  CreateNewMajorRequestMutation
>;
export type CreateNewMajorRequestMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateNewMajorRequestMutation,
  CreateNewMajorRequestMutationVariables
>;
