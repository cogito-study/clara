import { Box, Flex } from '@chakra-ui/core';
import { DocumentNode } from 'graphql';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../../../auth/hooks/use-auth';
import { DeleteAlert } from '../../../core/components/alert/delete-alert';
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
  const [deletingPost, setDeletingPost] = useState<{ id?: string; isOpen: boolean }>({
    isOpen: false,
  });
  const [editingPostID, setEditingPostID] = useState<string | undefined>(undefined);

  const [editPost, { loading: editPostLoading }] = useEditPostMutation();
  const [deletePost, { loading: deletePostLoading }] = useDeletePostMutation();
  const [likePost] = useLikePostMutation();
  const [dislikePost] = useDislikePostMutation();

  const handlePostDelete = async () => {
    if (deletingPost.id) {
      try {
        await deletePost({
          variables: { postID: deletingPost.id },
          refetchQueries: [{ query, variables: { subjectCode } }],
        });
      } finally {
        setDeletingPost({ isOpen: false });
      }
    }
  };

  const handlePostLike = (id: string, hasLikedPost: boolean) => {
    hasLikedPost
      ? dislikePost({ variables: { postID: id } })
      : likePost({ variables: { postID: id } });
  };

  const handlePostEdit = (id: string, content: string) => {
    setEditingPostID(id);
    editPost({
      variables: { postID: id, content },
      refetchQueries: [{ query, variables: { subjectCode } }],
    });
  };

  return (
    <>
      <DeleteAlert
        title="Are you sure want to delete this post?"
        description="You can't undo this action afterwards."
        isLoading={deletePostLoading}
        isOpen={deletingPost.isOpen}
        onClose={() => setDeletingPost({ isOpen: false })}
        onDelete={handlePostDelete}
      />
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
                isEditLoading={!!(editPostLoading && editingPostID && editingPostID === id)}
                onPostDelete={() => setDeletingPost({ id, isOpen: true })}
                onPostLike={() => handlePostLike(id, hasLikedPost)}
                onPostEdit={(content) => handlePostEdit(id, content)}
              />
            </Box>
          );
        })}
      </Flex>
    </>
  );
};
