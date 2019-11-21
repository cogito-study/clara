import { action } from '@storybook/addon-actions';
import React from 'react';
import { socialComponents } from '../../utils/storybook';
import { FeedPostCard, FeedPostCardProps } from './feed-post-card';
import { FeedPostInput } from './feed-post-input';
import { FeedPostPlaceholder, FeedPostListPlaceholder } from './feed-post.placeholder';

export default {
  title: socialComponents('Feed Post'),
};

const postCardProps: FeedPostCardProps = {
  feedPost: {
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
    updatedAt: new Date(),
    subject: { name: 'Vascular surgery' },
    likers: [],
  },
  isOwnPost: false,
  hasLikedPost: true,
  onPostDelete: action('On Post delete'),
  onPostLike: action('On Post like'),
  onPostEdit: action('On Post edit'),
};

export const othersPostCard = () => <FeedPostCard {...postCardProps} />;

export const usersPostCard = () => <FeedPostCard {...postCardProps} isOwnPost />;

export const postInput = () => <FeedPostInput onPostSend={() => action('On post send')} />;

export const postPlaceholder = () => <FeedPostPlaceholder />;

export const postListPlaceholder = () => <FeedPostListPlaceholder />;
