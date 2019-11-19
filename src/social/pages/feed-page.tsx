import React from 'react';
import { ContentWrapper } from '../../core/components/layout/content-wrapper';
import { FeedPostList } from '../components/feed-post/feed-post-list';
import { GlobalFeedDocument, useGlobalFeedQuery } from './graphql/global-feed-query.generated';

export const FeedPage = () => {
  const { data } = useGlobalFeedQuery({ fetchPolicy: 'cache-and-network' });

  return (
    <ContentWrapper mt={[10, 10, 20]} py={4}>
      {data && data.posts && <FeedPostList posts={data.posts} query={GlobalFeedDocument} />}
    </ContentWrapper>
  );
};
