import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type EditPostMutationVariables = {
  postID: Types.Scalars['ID'];
  content: Types.Scalars['String'];
};

export type EditPostMutation = { readonly __typename?: 'Mutation' } & {
  readonly updatePost: { readonly __typename?: 'Post' } & Pick<Types.Post, 'id'>;
};

export const EditPostDocument = gql`
  mutation EditPost($postID: ID!, $content: String!) {
    updatePost(where: { id: $postID }, data: { content: $content }) {
      id
    }
  }
`;
export type EditPostMutationFn = ApolloReactCommon.MutationFunction<
  EditPostMutation,
  EditPostMutationVariables
>;

/**
 * __useEditPostMutation__
 *
 * To run a mutation, you first call `useEditPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPostMutation, { data, loading, error }] = useEditPostMutation({
 *   variables: {
 *      postID: // value for 'postID'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useEditPostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<EditPostMutation, EditPostMutationVariables>,
) {
  return ApolloReactHooks.useMutation<EditPostMutation, EditPostMutationVariables>(
    EditPostDocument,
    baseOptions,
  );
}
export type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>;
export type EditPostMutationResult = ApolloReactCommon.MutationResult<EditPostMutation>;
export type EditPostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EditPostMutation,
  EditPostMutationVariables
>;
