import gql from 'graphql-tag';

export const UNVOTE_COMMENT_MUTATION = gql`
  mutation UnvoteCommentMutation($commentID: ID!) {
    unvoteComment(id: $commentID) {
      id
      upvotes {
        id
      }
    }
  }
`;
