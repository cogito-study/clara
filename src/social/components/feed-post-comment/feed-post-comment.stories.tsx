import { action } from '@storybook/addon-actions';
import React from 'react';
import { socialComponents } from '../../utils/storybook';
import { FeedPostCommentCard } from './feed-post-comment-card';
import { FeedPostCommentInput } from './feed-post-comment-input';
import { FeedPostCommentList } from './feed-post-comment-list';

export default {
  title: socialComponents('Feed Post Comment'),
};

export const noEditAndNoDeleteComment = () => {
  return (
    <FeedPostCommentCard
      author={{ name: 'Kiss Bela Andras Peter Ivan Balint', picture: 'https://bit.ly/broken-link' }}
      timeSince="5 minutes ago"
      content="This is my Lorem ipsum post. Lorem ipsum dolor sit amet, consecteturadipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    />
  );
};

export const input = () => {
  return <FeedPostCommentInput />;
};

export const list = () => {
  return (
    <FeedPostCommentList
      posts={[
        {
          author: {
            name: 'FirstName LastName',
            picture: 'https://bit.ly/broken-link',
          },
          timeSince: '5 minutes ago',
          content:
            '1This is my Lorem ipsum post. Lorem ipsum dolor sit amet, consecteturadipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

          onCommentEdit: action('On Comment Edit'),
          onCommentDelete: action('On Comment Delete'),
        },
        {
          author: {
            name: 'FirstName LastName',
            picture: 'https://bit.ly/broken-link',
          },
          timeSince: '5 minutes ago',
          content:
            '2This is my Lorem ipsum post. Lorem ipsum dolor sit amet, consecteturadipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

          onCommentEdit: action('On Comment Edit'),
          onCommentDelete: action('On Comment Delete'),
        },
        {
          author: {
            name: 'FirstName LastName',
            picture: 'https://bit.ly/broken-link',
          },
          timeSince: '5 minutes ago',
          content:
            '3This is my Lorem ipsum post. Lorem ipsum dolor sit amet, consecteturadipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

          onCommentEdit: action('On Comment Edit'),
          onCommentDelete: action('On Comment Delete'),
        },
      ]}
    />
  );
};
export const editComment = () => {
  return (
    <FeedPostCommentCard
      author={{ name: 'Kiss Bela Andras Peter Ivan Balint', picture: 'https://bit.ly/broken-link' }}
      timeSince="5 minutes ago"
      content="This is my Lorem ipsum post. Lorem ipsum dolor sit amet, consecteturadipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      onCommentEdit={action('On Comment Edit')}
    />
  );
};
export const deleteComment = () => {
  return (
    <FeedPostCommentCard
      author={{ name: 'Kiss Bela Andras Peter Ivan Balint', picture: 'https://bit.ly/broken-link' }}
      timeSince="5 minutes ago"
      content="This is my Lorem ipsum post. Lorem ipsum dolor sit amet, consecteturadipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      onCommentDelete={action('On Comment Delete')}
    />
  );
};
export const editAndDeleteComment = () => {
  return (
    <FeedPostCommentCard
      author={{ name: 'Kiss Bela Andras Peter Ivan Balint', picture: 'https://bit.ly/broken-link' }}
      timeSince="5 minutes ago"
      content="This is my Lorem ipsum post. Lorem ipsum dolor sit amet, consecteturadipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      onCommentEdit={action('On Comment Edit')}
      onCommentDelete={action('On Comment Delete')}
    />
  );
};
