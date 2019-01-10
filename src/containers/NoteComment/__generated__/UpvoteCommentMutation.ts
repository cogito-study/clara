/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpvoteCommentMutation
// ====================================================

export interface UpvoteCommentMutation_upvoteComment_upvotes {
  __typename: "User";
  id: string;
}

export interface UpvoteCommentMutation_upvoteComment {
  __typename: "Comment";
  id: string;
  upvotes: UpvoteCommentMutation_upvoteComment_upvotes[] | null;
}

export interface UpvoteCommentMutation {
  upvoteComment: UpvoteCommentMutation_upvoteComment;
}

export interface UpvoteCommentMutationVariables {
  commentID: string;
}
