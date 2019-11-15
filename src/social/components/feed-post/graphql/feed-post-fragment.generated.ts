import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';

export type FeedPostFragment = { readonly __typename?: 'Post' } & Pick<
  Types.Post,
  'id' | 'content' | 'updatedAt' | 'likesCount'
> & {
    readonly author: { readonly __typename?: 'User' } & Pick<
      Types.User,
      'id' | 'fullName' | 'profilePictureURL' | 'position'
    >;
    readonly likers: Types.Maybe<
      ReadonlyArray<{ readonly __typename?: 'User' } & Pick<Types.User, 'id'>>
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
    content
    updatedAt
    likesCount
    likers {
      id
    }
  }
`;
