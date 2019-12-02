import React from 'react';
import { ContentWrapper } from '../../core/components/layout/content-wrapper';
import { FeedPostList } from '../components/feed-post/feed-post-list';
import { FeedPostListPlaceholder } from '../components/feed-post/feed-post.placeholder';
import { GlobalFeedDocument, useGlobalFeedQuery } from './graphql/global-feed-query.generated';

export const FeedPage = () => {
  const { data, loading } = useGlobalFeedQuery({ fetchPolicy: 'cache-and-network' });

  return (
    <ContentWrapper mt={[10, 10, 20]} py={4}>
      {loading ? (
        <FeedPostListPlaceholder />
      ) : (
        <FeedPostList posts={data?.posts ?? []} query={GlobalFeedDocument} />
      )}
    </ContentWrapper>
  );
};
