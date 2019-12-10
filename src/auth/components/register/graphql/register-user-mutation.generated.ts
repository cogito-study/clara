import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type RegisterUserMutationVariables = {
  data: Types.RegisterUserInput;
};

export type RegisterUserMutation = { readonly __typename?: 'Mutation' } & {
  readonly register: { readonly __typename?: 'User' } & Pick<Types.User, 'id'>;
};

export const RegisterUserDocument = gql`
  mutation RegisterUser($data: RegisterUserInput!) {
    register(data: $data) {
      id
    }
  }
`;
export type RegisterUserMutationFn = ApolloReactCommon.MutationFunction<
  RegisterUserMutation,
  RegisterUserMutationVariables
>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(
    RegisterUserDocument,
    baseOptions,
  );
}
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = ApolloReactCommon.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterUserMutation,
  RegisterUserMutationVariables
>;
