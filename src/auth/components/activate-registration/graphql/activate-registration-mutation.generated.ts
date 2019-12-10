import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type ActivateRegistrationMutationVariables = {
  token: Types.Scalars['String'];
  subjects: ReadonlyArray<Types.ConnectRelation>;
  major: Types.ConnectRelation;
};

export type ActivateRegistrationMutation = { readonly __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'activateRegistration'
>;

export const ActivateRegistrationDocument = gql`
  mutation ActivateRegistration(
    $token: String!
    $subjects: [ConnectRelation!]!
    $major: ConnectRelation!
  ) {
    activateRegistration(data: { token: $token, subjects: $subjects, major: $major })
  }
`;
export type ActivateRegistrationMutationFn = ApolloReactCommon.MutationFunction<
  ActivateRegistrationMutation,
  ActivateRegistrationMutationVariables
>;

/**
 * __useActivateRegistrationMutation__
 *
 * To run a mutation, you first call `useActivateRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateRegistrationMutation, { data, loading, error }] = useActivateRegistrationMutation({
 *   variables: {
 *      token: // value for 'token'
 *      subjects: // value for 'subjects'
 *      major: // value for 'major'
 *   },
 * });
 */
export function useActivateRegistrationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ActivateRegistrationMutation,
    ActivateRegistrationMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ActivateRegistrationMutation,
    ActivateRegistrationMutationVariables
  >(ActivateRegistrationDocument, baseOptions);
}
export type ActivateRegistrationMutationHookResult = ReturnType<
  typeof useActivateRegistrationMutation
>;
export type ActivateRegistrationMutationResult = ApolloReactCommon.MutationResult<
  ActivateRegistrationMutation
>;
export type ActivateRegistrationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ActivateRegistrationMutation,
  ActivateRegistrationMutationVariables
>;
