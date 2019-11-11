import React from 'react';
import { socialComponents } from '../utils/storybook';
import { PostCard, PostCardProps } from './post-card';
import { PostInput } from './post-input';

export default {
  title: socialComponents('Elements'),
};

const postCardProps: PostCardProps = {
  name: 'Dr. Guy Smith',
  title: 'adjunct professor',
  subject: 'Vascular surgery',
  content:
    'This is my Lorem ipsum post. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This is my Lorem ipsum post. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  likeCount: 18,
  isOwnPost: false,
  updatedAt: new Date(),
};

const onPostSend = (postContent: string) => {
  {
    postContent && console.log(postContent);
  }
};

export const othersPostCard = () => <PostCard {...postCardProps} />;
export const usersPostCard = () => <PostCard {...postCardProps} isOwnPost={true} />;
export const postInput = () => <PostInput onPostSend={onPostSend} />;
