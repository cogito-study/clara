import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type ChangeEmailMutationVariables = {
  userID: Types.Scalars['ID'];
  email: Types.Scalars['String'];
};

export type ChangeEmailMutation = { readonly __typename?: 'Mutation' } & {
  readonly changeEmail: { readonly __typename?: 'User' } & Pick<Types.User, 'id' | 'email'>;
};

export const ChangeEmailDocument = gql`
  mutation ChangeEmail($userID: ID!, $email: String!) {
    changeEmail(where: { id: $userID }, data: { email: $email }) {
      id
      email
    }
  }
`;
export type ChangeEmailMutationFn = ApolloReactCommon.MutationFunction<
  ChangeEmailMutation,
  ChangeEmailMutationVariables
>;

/**
 * __useChangeEmailMutation__
 *
 * To run a mutation, you first call `useChangeEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeEmailMutation, { data, loading, error }] = useChangeEmailMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useChangeEmailMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeEmailMutation,
    ChangeEmailMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<ChangeEmailMutation, ChangeEmailMutationVariables>(
    ChangeEmailDocument,
    baseOptions,
  );
}
export type ChangeEmailMutationHookResult = ReturnType<typeof useChangeEmailMutation>;
export type ChangeEmailMutationResult = ApolloReactCommon.MutationResult<ChangeEmailMutation>;
export type ChangeEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ChangeEmailMutation,
  ChangeEmailMutationVariables
>;
