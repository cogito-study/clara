/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CommentQuery
// ====================================================

export interface CommentQuery_comment_author {
  __typename: 'User';
  id: string;
  firstName: string | null;
  lastName: string | null;
}

export interface CommentQuery_comment_upvotes {
  __typename: 'User';
  id: string;
}

export interface CommentQuery_comment {
  __typename: 'Comment';
  text: string;
  createdAt: any;
  author: CommentQuery_comment_author;
  upvotes: CommentQuery_comment_upvotes[] | null;
}

export interface CommentQuery {
  comment: CommentQuery_comment | null;
}

export interface CommentQueryVariables {
  commentID: string;
}
