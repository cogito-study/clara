import { Flex } from '@chakra-ui/core';
import React, { FC } from 'react';
import { FeedPostCommentCard, FeedPostCommentCardProps } from './feed-post-comment-card';
import { FeedPostCommentInput } from './feed-post-comment-input';

export type FeedPostCommentListProps = {
  posts?: FeedPostCommentCardProps[];
};

export const FeedPostCommentList: FC<FeedPostCommentListProps> = ({ posts }) => {
  return (
    <Flex direction="column">
      {posts?.map((post) => (
        <FeedPostCommentCard {...post} key={post.content} />
      ))}

      <FeedPostCommentInput />
    </Flex>
  );
};
