import * as Types from '../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type ValidateTokenMutationVariables = {
  token: Types.Scalars['String'];
  type: Types.TokenType;
};

export type ValidateTokenMutation = { readonly __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'validateToken'
>;

export const ValidateTokenDocument = gql`
  mutation ValidateToken($token: String!, $type: TokenType!) {
    validateToken(data: { token: $token, type: $type })
  }
`;
export type ValidateTokenMutationFn = ApolloReactCommon.MutationFunction<
  ValidateTokenMutation,
  ValidateTokenMutationVariables
>;

/**
 * __useValidateTokenMutation__
 *
 * To run a mutation, you first call `useValidateTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateTokenMutation, { data, loading, error }] = useValidateTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useValidateTokenMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ValidateTokenMutation,
    ValidateTokenMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<ValidateTokenMutation, ValidateTokenMutationVariables>(
    ValidateTokenDocument,
    baseOptions,
  );
}
export type ValidateTokenMutationHookResult = ReturnType<typeof useValidateTokenMutation>;
export type ValidateTokenMutationResult = ApolloReactCommon.MutationResult<ValidateTokenMutation>;
export type ValidateTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ValidateTokenMutation,
  ValidateTokenMutationVariables
>;
