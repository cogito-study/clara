import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type ValidateResetPasswordTokenMutationVariables = {
  token: Types.Scalars['String'];
};

export type ValidateResetPasswordTokenMutation = { readonly __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'validateToken'
>;

export const ValidateResetPasswordTokenDocument = gql`
  mutation ValidateResetPasswordToken($token: String!) {
    validateToken(data: { token: $token, type: RESET_PASSWORD })
  }
`;
export type ValidateResetPasswordTokenMutationFn = ApolloReactCommon.MutationFunction<
  ValidateResetPasswordTokenMutation,
  ValidateResetPasswordTokenMutationVariables
>;

/**
 * __useValidateResetPasswordTokenMutation__
 *
 * To run a mutation, you first call `useValidateResetPasswordTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateResetPasswordTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateResetPasswordTokenMutation, { data, loading, error }] = useValidateResetPasswordTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useValidateResetPasswordTokenMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ValidateResetPasswordTokenMutation,
    ValidateResetPasswordTokenMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ValidateResetPasswordTokenMutation,
    ValidateResetPasswordTokenMutationVariables
  >(ValidateResetPasswordTokenDocument, baseOptions);
}
export type ValidateResetPasswordTokenMutationHookResult = ReturnType<
  typeof useValidateResetPasswordTokenMutation
>;
export type ValidateResetPasswordTokenMutationResult = ApolloReactCommon.MutationResult<
  ValidateResetPasswordTokenMutation
>;
export type ValidateResetPasswordTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ValidateResetPasswordTokenMutation,
  ValidateResetPasswordTokenMutationVariables
>;
