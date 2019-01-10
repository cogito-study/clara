/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnvoteCommentMutation
// ====================================================

export interface UnvoteCommentMutation_unvoteComment_upvotes {
  __typename: "User";
  id: string;
}

export interface UnvoteCommentMutation_unvoteComment {
  __typename: "Comment";
  id: string;
  upvotes: UnvoteCommentMutation_unvoteComment_upvotes[] | null;
}

export interface UnvoteCommentMutation {
  unvoteComment: UnvoteCommentMutation_unvoteComment;
}

export interface UnvoteCommentMutationVariables {
  commentID: string;
}
