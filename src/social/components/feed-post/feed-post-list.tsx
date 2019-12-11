import { Box, Flex } from '@chakra-ui/core';
import { DocumentNode } from 'graphql';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { DeleteAlert } from '../../../core/components/alert/delete-alert';
import { ModalOptions } from '../../../core/components/modal/types';
import { PostPermissionType } from '../../../core/graphql/types.generated';
import { useErrorToast } from '../../../core/hooks';
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
  const { subjectCode } = useParams<SubjectRouteParams>();
  const [deletingPostState, setDeletingPostState] = useState<DeletingPostState>({ isOpen: false });
  const [editingPostID, setEditingPostID] = useState<string | undefined>(undefined);
  const errorToast = useErrorToast();

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
      } catch (error) {
        errorToast(error);
      } finally {
        setDeletingPostState({ isOpen: false });
      }
    }
  };

  const handlePostLike = async (id: string, hasLikedPost: boolean) => {
    try {
      hasLikedPost
        ? await dislikePost({ variables: { postID: id } })
        : await likePost({ variables: { postID: id } });
    } catch (error) {
      errorToast(error);
    }
  };

  const handlePostEdit = async (id: string, content: string) => {
    setEditingPostID(id);
    try {
      await editPost({ variables: { postID: id, content } });
    } catch (error) {
      errorToast(error);
    }
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
          const { id, hasLikedPost } = post;

          const hasPostEditPermission = post.permissions.includes(PostPermissionType.UpdatePost);
          const onPostEdit = (content: string) => handlePostEdit(id, content);

          const hasPostDeletePermission = post.permissions.includes(PostPermissionType.DeletePost);
          const onPostDelete = () => setDeletingPostState({ id, isOpen: true });

          return (
            <Box key={post.id} my={2}>
              <FeedPostCard
                feedPost={post}
                isEditLoading={!!(editPostLoading && editingPostID === id)}
                onPostLike={() => handlePostLike(id, hasLikedPost)}
                onPostDelete={hasPostDeletePermission ? onPostDelete : undefined}
                onPostEdit={hasPostEditPermission ? onPostEdit : undefined}
              />
            </Box>
          );
        })}
      </Flex>
    </>
  );
};
