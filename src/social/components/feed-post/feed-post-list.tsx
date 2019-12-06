import { Box, Flex } from '@chakra-ui/core';
import { DocumentNode } from 'graphql';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useAuth } from '../../../auth/hooks/use-auth';
import { DeleteAlert } from '../../../core/components/alert/delete-alert';
import { ModalOptions } from '../../../core/components/modal/types';
import { SubjectRouteParams } from '../../../subject/utils/subject-route';
import { FeedPostCard, FeedPostData } from './feed-post-card';
import { useDeletePostMutation } from './graphql/delete-post-mutation.generated';
import { useDislikePostMutation } from './graphql/dislike-post-mutation.generated';
import { useEditPostMutation } from './graphql/edit-post-mutation.generated';
import { useLikePostMutation } from './graphql/like-post-mutation.generated';

type DeletingPostState = ModalOptions & { id?: string };

export type FeedPostListProps = {
  posts: ReadonlyArray<FeedPostData>;
  query: DocumentNode;
};

export const FeedPostList = ({ posts, query }: FeedPostListProps) => {
  const { t } = useTranslation('social');
  const { user } = useAuth();
  const { subjectCode } = useParams<SubjectRouteParams>();
  const [deletingPostState, setDeletingPostState] = useState<DeletingPostState>({ isOpen: false });
  const [editingPostID, setEditingPostID] = useState<string | undefined>(undefined);

  const [editPost, { loading: editPostLoading }] = useEditPostMutation();
  const [deletePost, { loading: deletePostLoading }] = useDeletePostMutation();
  const [likePost] = useLikePostMutation();
  const [dislikePost] = useDislikePostMutation();

  const handlePostDelete = async () => {
    if (deletingPostState.id) {
      try {
        await deletePost({
          variables: { postID: deletingPostState.id },
          refetchQueries: [{ query, variables: { subjectCode } }],
        });
      } finally {
        setDeletingPostState({ isOpen: false });
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
        title={t('alert.delete.title')}
        description={t('alert.delete.description')}
        isLoading={deletePostLoading}
        isOpen={deletingPostState.isOpen}
        onClose={() => setDeletingPostState({ isOpen: false })}
        onDelete={handlePostDelete}
      />
      <Flex direction="column">
        {posts.map((post) => {
          const { id, likers, author } = post;
          const hasLikedPost =
            (user && likers?.map((liker) => liker.id).includes(user.id)) || false;

          return (
            <Box key={id} my={2}>
              <FeedPostCard
                feedPost={post}
                isOwnPost={author?.id === user?.id}
                hasLikedPost={hasLikedPost}
                isEditLoading={!!(editPostLoading && editingPostID === id)}
                onPostDelete={() => setDeletingPostState({ id, isOpen: true })}
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
