import React from 'react';
import { useTranslation } from 'react-i18next';
import { ContentWrapper, EmptyState, Head } from '../../core/components';
import EmptyIcon from '../assets/news-feed-empty.svg';
import { FeedPostList } from '../components/feed-post/feed-post-list';
import { FeedPostListPlaceholder } from '../components/feed-post/feed-post.placeholder';
import { GlobalFeedDocument, useGlobalFeedQuery } from './graphql/global-feed-query.generated';

export const FeedPage = () => {
  const { t } = useTranslation(['social', 'core']);
  const { data, loading } = useGlobalFeedQuery({ fetchPolicy: 'cache-and-network' });

  const isFeedEmpty = data?.posts.length === 0;

  return (
    <>
      <Head title={t('core:pages.feed')} />
      <ContentWrapper mt={[10, 10, 20]} py={4}>
        {loading ? (
          <FeedPostListPlaceholder />
        ) : isFeedEmpty ? (
          <EmptyState title={t('empty')} icon={EmptyIcon} />
        ) : (
          <FeedPostList posts={data?.posts ?? []} query={GlobalFeedDocument} />
        )}
      </ContentWrapper>
    </>
  );
};
