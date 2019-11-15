import { Box } from '@chakra-ui/core';
import React from 'react';
import { ContentWrapper } from '../../../core/components/layout/content-wrapper';
import { FeedPostInput } from '../../../social/components/feed-post/feed-post-input';
import { FeedPostList } from '../../../social/components/feed-post/feed-post-list';
import { SubjectIdentifierProps } from '../../pages/subject-page';
import { useCreatePostMutation } from './graphql/create-post-mutation.generated';
import { useSubjectFeedQuery, SubjectFeedDocument } from './graphql/subject-feed-query.generated';

export const SubjectFeed = ({ id, subjectCode }: SubjectIdentifierProps) => {
  const { data } = useSubjectFeedQuery({ variables: { subjectCode } });
  const [createPost] = useCreatePostMutation();

  const handlePostCreation = (content: string) =>
    createPost({
      variables: { content, subjectID: id },
      refetchQueries: [{ query: SubjectFeedDocument, variables: { subjectCode } }],
    });

  return (
    <ContentWrapper pt={4}>
      <Box pb={3}>
        <FeedPostInput onPostSend={handlePostCreation} />
      </Box>
      {data && data.subject && data.subject.posts && (
        <FeedPostList posts={data.subject.posts} query={SubjectFeedDocument} />
      )}
    </ContentWrapper>
  );
};