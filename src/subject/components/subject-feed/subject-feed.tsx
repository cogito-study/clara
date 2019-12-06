import { Box } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '../../../core/components/empty-state/empty-state';
import { ContentWrapper } from '../../../core/components/layout/content-wrapper';
import EmptyIcon from '../../../social/assets/news-feed-empty.svg';
import { FeedPostInput } from '../../../social/components/feed-post/feed-post-input';
import { FeedPostList } from '../../../social/components/feed-post/feed-post-list';
import { FeedPostListPlaceholder } from '../../../social/components/feed-post/feed-post.placeholder';
import { SubjectIdentifierProps } from '../../pages/subject-page';
import { SubjectFeedDocument, useSubjectFeedQuery } from './graphql/subject-feed-query.generated';

export const SubjectFeed = ({ id, subjectCode }: SubjectIdentifierProps) => {
  const { t } = useTranslation('subject');
  const [shouldInputFocus, setShouldInputFocus] = useState(false);
  const { data, loading } = useSubjectFeedQuery({ variables: { subjectCode } });

  const isSubjectFeedEmpty = data?.subject?.posts.length === 0;

  useEffect(() => {
    setShouldInputFocus(false);
  }, [shouldInputFocus]);

  return (
    <ContentWrapper pt={4}>
      <Box pb={3}>
        <FeedPostInput id={id} subjectCode={subjectCode} shouldFocus={shouldInputFocus} />
      </Box>
      {loading ? (
        <FeedPostListPlaceholder />
      ) : isSubjectFeedEmpty ? (
        <EmptyState
          title={t('feed.empty.title')}
          icon={EmptyIcon}
          buttonTitle={t('feed.empty.button')}
          onAdd={() => setShouldInputFocus(true)}
        />
      ) : (
        <FeedPostList posts={data?.subject?.posts ?? []} query={SubjectFeedDocument} />
      )}
    </ContentWrapper>
  );
};
