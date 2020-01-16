import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type DislikePostMutationVariables = {
  postID: Types.Scalars['ID'];
};

export type DislikePostMutation = { readonly __typename?: 'Mutation' } & {
  readonly dislikePost: { readonly __typename?: 'Post' } & Pick<
    Types.Post,
    'id' | 'likesCount' | 'hasLikedPost'
  >;
};

export const DislikePostDocument = gql`
  mutation DislikePost($postID: ID!) {
    dislikePost(where: { id: $postID }) {
      id
      likesCount
      hasLikedPost
    }
  }
`;
export type DislikePostMutationFn = ApolloReactCommon.MutationFunction<
  DislikePostMutation,
  DislikePostMutationVariables
>;

/**
 * __useDislikePostMutation__
 *
 * To run a mutation, you first call `useDislikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDislikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dislikePostMutation, { data, loading, error }] = useDislikePostMutation({
 *   variables: {
 *      postID: // value for 'postID'
 *   },
 * });
 */
export function useDislikePostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DislikePostMutation,
    DislikePostMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<DislikePostMutation, DislikePostMutationVariables>(
    DislikePostDocument,
    baseOptions,
  );
}
export type DislikePostMutationHookResult = ReturnType<typeof useDislikePostMutation>;
export type DislikePostMutationResult = ApolloReactCommon.MutationResult<DislikePostMutation>;
export type DislikePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DislikePostMutation,
  DislikePostMutationVariables
>;
