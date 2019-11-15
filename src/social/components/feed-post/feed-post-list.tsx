import { Box, Flex } from '@chakra-ui/core';
import { DocumentNode } from 'graphql';
import React from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../../../auth/hooks/use-auth';
import { SubjectRouteParams } from '../../../subject/utils/subject-route';
import { FeedPostCard, FeedPostData } from './feed-post-card';
import { useDeletePostMutation } from './graphql/delete-post-mutation.generated';
import { useDislikePostMutation } from './graphql/dislike-post-mutation.generated';
import { useEditPostMutation } from './graphql/edit-post-mutation.generated';
import { useLikePostMutation } from './graphql/like-post-mutation.generated';

export type FeedPostListProps = {
  posts: ReadonlyArray<FeedPostData>;
  query: DocumentNode;
};

export const FeedPostList = ({ posts, query }: FeedPostListProps) => {
  const { user } = useAuth();
  const { subjectCode } = useParams<SubjectRouteParams>();

  const [editPost] = useEditPostMutation();
  const [deletePost] = useDeletePostMutation();
  const [likePost] = useLikePostMutation();
  const [dislikePost] = useDislikePostMutation();

  const handlePostDelete = (id: string) => {
    deletePost({
      variables: { postID: id },
      refetchQueries: [{ query, variables: { subjectCode } }],
    });
  };

  const handlePostLike = (id: string, hasLikedPost: boolean) => {
    hasLikedPost
      ? dislikePost({ variables: { postID: id } })
      : likePost({ variables: { postID: id } });
  };

  const handlePostEdit = (id: string, content: string) => {
    editPost({
      variables: { postID: id, content },
      refetchQueries: [{ query, variables: { subjectCode } }],
    });
  };

  return (
    <Flex direction="column">
      {posts.map((post) => {
        const { id, likers, author } = post;
        const hasLikedPost =
          (likers && user && likers.map((liker) => liker.id).includes(user.id)) || false;

        return (
          <Box key={id} my={2}>
            <FeedPostCard
              feedPost={post}
              isOwnPost={(author && user && author.id === user.id) || false}
              hasLikedPost={hasLikedPost}
              onPostDelete={() => handlePostDelete(id)}
              onPostLike={() => handlePostLike(id, hasLikedPost)}
              onPostEdit={(content) => handlePostEdit(id, content)}
            />
          </Box>
        );
      })}
    </Flex>
  );
};
