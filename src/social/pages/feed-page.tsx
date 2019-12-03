import React from 'react';
import { EmptyState } from '../../core/components/empty-state/empty-state';
import { ContentWrapper } from '../../core/components/layout/content-wrapper';
import EmptyIcon from '../assets/news-feed-empty.svg';
import { FeedPostList } from '../components/feed-post/feed-post-list';
import { FeedPostListPlaceholder } from '../components/feed-post/feed-post.placeholder';
import { GlobalFeedDocument, useGlobalFeedQuery } from './graphql/global-feed-query.generated';

export const FeedPage = () => {
  const { data, loading } = useGlobalFeedQuery({ fetchPolicy: 'cache-and-network' });

  const isFeedEmpty = data?.posts.length === 0;

  return (
    <ContentWrapper mt={[10, 10, 20]} py={4}>
      {loading ? (
        <FeedPostListPlaceholder />
      ) : isFeedEmpty ? (
        <EmptyState title="News feed is empty!" icon={EmptyIcon} />
      ) : (
        <FeedPostList posts={data?.posts ?? []} query={GlobalFeedDocument} />
      )}
    </ContentWrapper>
  );
};
