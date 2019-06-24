import gql from 'graphql-tag';

export const SUBMIT_COMMENT_MUTATION = gql`
  mutation SubmitCommentMutation($noteID: ID!, $commentData: CommentInput!) {
    submitComment(noteID: $noteID, input: $commentData) {
      note {
        id
        comments {
          id
          locationInText
        }
      }
    }
  }
`;
