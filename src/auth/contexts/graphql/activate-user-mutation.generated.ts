import * as Types from '../../../core/graphql/types.generated';

import { UserInfoFragment, UserInfoFragmentDoc } from './user-info-fragment.generated';
import gql from 'graphql-tag';

import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type ActivateUserMutationVariables = {
  token: Types.Scalars['String'];
  password: Types.Scalars['String'];
};

export type ActivateUserMutation = { readonly __typename?: 'Mutation' } & {
  readonly activateUser: { readonly __typename?: 'AuthenticationPayload' } & Pick<
    Types.AuthenticationPayload,
    'token'
  > & { readonly user: { readonly __typename?: 'User' } & UserInfoFragment };
};

export const ActivateUserDocument = gql`
  mutation ActivateUser($token: String!, $password: String!) {
    activateUser(data: { token: $token, password: $password }) {
      token
      user {
        ...UserInfo
      }
    }
  }
  ${UserInfoFragmentDoc}
`;
export type ActivateUserMutationFn = ApolloReactCommon.MutationFunction<
  ActivateUserMutation,
  ActivateUserMutationVariables
>;

/**
 * __useActivateUserMutation__
 *
 * To run a mutation, you first call `useActivateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateUserMutation, { data, loading, error }] = useActivateUserMutation({
 *   variables: {
 *      token: // value for 'token'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useActivateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ActivateUserMutation,
    ActivateUserMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<ActivateUserMutation, ActivateUserMutationVariables>(
    ActivateUserDocument,
    baseOptions,
  );
}
export type ActivateUserMutationHookResult = ReturnType<typeof useActivateUserMutation>;
export type ActivateUserMutationResult = ApolloReactCommon.MutationResult<ActivateUserMutation>;
export type ActivateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ActivateUserMutation,
  ActivateUserMutationVariables
>;
