import * as Types from '../../../core/graphql/types.generated';

import { UserInfoFragment, UserInfoFragmentDoc } from './user-info-fragment.generated';
import gql from 'graphql-tag';

import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type LoginUserMutationVariables = {
  email: Types.Scalars['String'];
  password: Types.Scalars['String'];
};

export type LoginUserMutation = { readonly __typename?: 'Mutation' } & {
  readonly login: { readonly __typename?: 'AuthenticationPayload' } & Pick<
    Types.AuthenticationPayload,
    'token'
  > & { readonly user: { readonly __typename?: 'User' } & UserInfoFragment };
};

export const LoginUserDocument = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
      user {
        ...UserInfo
      }
    }
  }
  ${UserInfoFragmentDoc}
`;
export type LoginUserMutationFn = ApolloReactCommon.MutationFunction<
  LoginUserMutation,
  LoginUserMutationVariables
>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>,
) {
  return ApolloReactHooks.useMutation<LoginUserMutation, LoginUserMutationVariables>(
    LoginUserDocument,
    baseOptions,
  );
}
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = ApolloReactCommon.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginUserMutation,
  LoginUserMutationVariables
>;
