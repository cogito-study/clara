import gql from 'graphql-tag';

export const UPVOTE_COMMENT_MUTATION = gql`
  mutation UpvoteCommentMutation($commentID: ID!) {
    upvoteComment(id: $commentID) {
      id
      upvotes {
        id
      }
    }
  }
`;
