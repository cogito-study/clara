import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type DeletePostMutationVariables = {
  postID: Types.Scalars['ID'];
};

export type DeletePostMutation = { readonly __typename?: 'Mutation' } & {
  readonly deletePost: { readonly __typename?: 'Post' } & Pick<Types.Post, 'id'>;
};

export const DeletePostDocument = gql`
  mutation DeletePost($postID: ID!) {
    deletePost(where: { id: $postID }) {
      id
    }
  }
`;
export type DeletePostMutationFn = ApolloReactCommon.MutationFunction<
  DeletePostMutation,
  DeletePostMutationVariables
>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postID: // value for 'postID'
 *   },
 * });
 */
export function useDeletePostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeletePostMutation,
    DeletePostMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<DeletePostMutation, DeletePostMutationVariables>(
    DeletePostDocument,
    baseOptions,
  );
}
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = ApolloReactCommon.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeletePostMutation,
  DeletePostMutationVariables
>;
