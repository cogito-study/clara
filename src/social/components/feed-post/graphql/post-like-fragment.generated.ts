import * as Types from '../../../../core/graphql/types.generated';

import gql from 'graphql-tag';

export type PostLikeFragment = { readonly __typename?: 'Post' } & Pick<
  Types.Post,
  'id' | 'likesCount'
> & { readonly likers: ReadonlyArray<{ readonly __typename?: 'User' } & Pick<Types.User, 'id'>> };

export const PostLikeFragmentDoc = gql`
  fragment PostLike on Post {
    id
    likesCount
    likers {
      id
    }
  }
`;
