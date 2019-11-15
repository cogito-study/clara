import * as Types from '../../../../core/graphql/types.generated';

import { PostLikeFragment } from './post-like-fragment.generated';
import gql from 'graphql-tag';
import { PostLikeFragmentDoc } from './post-like-fragment.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type LikePostMutationVariables = {
  postID: Types.Scalars['ID'];
};

export type LikePostMutation = { readonly __typename?: 'Mutation' } & {
  readonly likePost: { readonly __typename?: 'Post' } & PostLikeFragment;
};

export const LikePostDocument = gql`
  mutation LikePost($postID: ID!) {
    likePost(where: { id: $postID }) {
      ...PostLike
    }
  }
  ${PostLikeFragmentDoc}
`;
export type LikePostMutationFn = ApolloReactCommon.MutationFunction<
  LikePostMutation,
  LikePostMutationVariables
>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      postID: // value for 'postID'
 *   },
 * });
 */
export function useLikePostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<LikePostMutation, LikePostMutationVariables>,
) {
  return ApolloReactHooks.useMutation<LikePostMutation, LikePostMutationVariables>(
    LikePostDocument,
    baseOptions,
  );
}
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = ApolloReactCommon.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LikePostMutation,
  LikePostMutationVariables
>;
