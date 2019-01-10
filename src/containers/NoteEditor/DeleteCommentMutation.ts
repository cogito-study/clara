import gql from 'graphql-tag';

export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteCommentMutation($commentID: ID!) {
    deleteComment(id: $commentID)
  }
`;
