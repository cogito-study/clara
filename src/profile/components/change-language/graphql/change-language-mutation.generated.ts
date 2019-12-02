import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type ChangeLanguageMutationVariables = {
  userID: Types.Scalars['ID'];
  languageID: Types.Scalars['ID'];
};

export type ChangeLanguageMutation = { readonly __typename?: 'Mutation' } & {
  readonly updateProfile: { readonly __typename?: 'User' } & Pick<Types.User, 'id'>;
};

export const ChangeLanguageDocument = gql`
  mutation ChangeLanguage($userID: ID!, $languageID: ID!) {
    updateProfile(where: { id: $userID }, data: { preferredLanguage: { id: $languageID } }) {
      id
    }
  }
`;
export type ChangeLanguageMutationFn = ApolloReactCommon.MutationFunction<
  ChangeLanguageMutation,
  ChangeLanguageMutationVariables
>;

/**
 * __useChangeLanguageMutation__
 *
 * To run a mutation, you first call `useChangeLanguageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeLanguageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeLanguageMutation, { data, loading, error }] = useChangeLanguageMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *      languageID: // value for 'languageID'
 *   },
 * });
 */
export function useChangeLanguageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeLanguageMutation,
    ChangeLanguageMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<ChangeLanguageMutation, ChangeLanguageMutationVariables>(
    ChangeLanguageDocument,
    baseOptions,
  );
}
export type ChangeLanguageMutationHookResult = ReturnType<typeof useChangeLanguageMutation>;
export type ChangeLanguageMutationResult = ApolloReactCommon.MutationResult<ChangeLanguageMutation>;
export type ChangeLanguageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ChangeLanguageMutation,
  ChangeLanguageMutationVariables
>;
