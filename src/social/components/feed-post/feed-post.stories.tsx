import { action } from '@storybook/addon-actions';
import React from 'react';
import { EmptyState } from '../../../core/components';
import EmptyIcon from '../../assets/news-feed-empty.svg';
import { socialComponents } from '../../utils/storybook';
import { FeedPostCard } from './feed-post-card';
import { FeedPostListPlaceholder, FeedPostPlaceholder } from './feed-post.placeholder';
export default {
  title: socialComponents('Feed Post'),
};

export const usersPostCard = () => (
  <FeedPostCard
    feedPost={{
      author: {
        fullName: 'FirstName LastName',
        id: 'asd',
        position: 'professor',
        profilePictureURL: '',
      },
      content:
        'This is my Lorem ipsum post. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This is my Lorem ipsum post. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      id: 'adfsdf3e',
      likesCount: 18,
      hasLikedPost: true,
      permissions: [],
      updatedAt: new Date(),
      subject: { name: 'Vascular surgery' },
    }}
    isEditLoading={false}
    feedPostComments={[
      {
        author: {
          name: 'FirstName LastName',
          picture: 'https://bit.ly/broken-link',
        },
        timeSince: '5 minutes ago',
        content:
          'This is my Lorem ipsum post. Lorem ipsum dolor sit amet, consecteturadipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        onCommentEdit: action('On Comment Edit'),
        onCommentDelete: action('On Comment Delete'),
      },
    ]}
    onPostDelete={action('On Post delete')}
    onPostLike={action('On Post like')}
    onPostEdit={action('On Post edit')}
  />
);

export const postPlaceholder = () => <FeedPostPlaceholder />;

export const postListPlaceholder = () => <FeedPostListPlaceholder />;

export const emptyGlobalNewsFeed = () => (
  <EmptyState title="Global news feed is empty!" icon={EmptyIcon} />
);

export const emptyNewsFeedHasAddPermission = () => (
  <EmptyState
    title="Vascular surgery news feed is empty!"
    icon={EmptyIcon}
    onAdd={action('add')}
    buttonTitle="write new post"
  />
);

export const emptyNewsFeedHasNoAddPermission = () => (
  <EmptyState title="Vascular surgery news feed is empty!" icon={EmptyIcon} />
);

export const postCardWithoutComment = () => (
  <FeedPostCard
    feedPost={{
      author: {
        fullName: 'FirstName LastName',
        id: 'asd',
        position: 'professor',
        profilePictureURL: '',
      },
      content:
        'This is my Lorem ipsum post. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This is my Lorem ipsum post. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      id: 'adfsdf3e',
      likesCount: 18,
      hasLikedPost: true,
      permissions: [],
      updatedAt: new Date(),
      subject: { name: 'Vascular surgery' },
    }}
    isEditLoading={false}
    onPostDelete={action('On Post delete')}
    onPostLike={action('On Post like')}
    onPostEdit={action('On Post edit')}
  />
);
