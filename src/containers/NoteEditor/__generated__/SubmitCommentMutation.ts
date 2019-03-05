/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CommentInput } from './../../../__generated__/globalTypes';

// ====================================================
// GraphQL mutation operation: SubmitCommentMutation
// ====================================================

export interface SubmitCommentMutation_submitComment_note_comments {
  __typename: 'Comment';
  id: string;
  locationInText: any;
}

export interface SubmitCommentMutation_submitComment_note {
  __typename: 'Note';
  id: string;
  comments: SubmitCommentMutation_submitComment_note_comments[] | null;
}

export interface SubmitCommentMutation_submitComment {
  __typename: 'Comment';
  note: SubmitCommentMutation_submitComment_note;
}

export interface SubmitCommentMutation {
  submitComment: SubmitCommentMutation_submitComment;
}

export interface SubmitCommentMutationVariables {
  noteID: string;
  commentData: CommentInput;
}
