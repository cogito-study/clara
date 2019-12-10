import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type ActivateInvitationMutationVariables = {
  token: Types.Scalars['String'];
  password: Types.Scalars['String'];
};

export type ActivateInvitationMutation = { readonly __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'activateInvitation'
>;

export const ActivateInvitationDocument = gql`
  mutation ActivateInvitation($token: String!, $password: String!) {
    activateInvitation(data: { token: $token, password: $password })
  }
`;
export type ActivateInvitationMutationFn = ApolloReactCommon.MutationFunction<
  ActivateInvitationMutation,
  ActivateInvitationMutationVariables
>;

/**
 * __useActivateInvitationMutation__
 *
 * To run a mutation, you first call `useActivateInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateInvitationMutation, { data, loading, error }] = useActivateInvitationMutation({
 *   variables: {
 *      token: // value for 'token'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useActivateInvitationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ActivateInvitationMutation,
    ActivateInvitationMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ActivateInvitationMutation,
    ActivateInvitationMutationVariables
  >(ActivateInvitationDocument, baseOptions);
}
export type ActivateInvitationMutationHookResult = ReturnType<typeof useActivateInvitationMutation>;
export type ActivateInvitationMutationResult = ApolloReactCommon.MutationResult<
  ActivateInvitationMutation
>;
export type ActivateInvitationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ActivateInvitationMutation,
  ActivateInvitationMutationVariables
>;
