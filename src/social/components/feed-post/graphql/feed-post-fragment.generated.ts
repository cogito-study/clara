import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';

export type FeedPostFragment = { readonly __typename?: 'Post' } & Pick<
  Types.Post,
  'id' | 'hasLikedPost' | 'permissions' | 'content' | 'updatedAt' | 'likesCount'
> & {
    readonly author: { readonly __typename?: 'User' } & Pick<
      Types.User,
      'id' | 'fullName' | 'profilePictureURL' | 'position'
    >;
  };

export const FeedPostFragmentDoc = gql`
  fragment FeedPost on Post {
    id
    author {
      id
      fullName
      profilePictureURL
      position
    }
    hasLikedPost
    permissions
    content
    updatedAt
    likesCount
  }
`;
