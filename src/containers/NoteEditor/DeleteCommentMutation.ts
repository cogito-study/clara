import gql from 'graphql-tag';

export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteCommentMutation($noteID: ID!, $commentID: ID!) {
    deleteComment(noteID: $noteID, id: $commentID)
  }
`;
