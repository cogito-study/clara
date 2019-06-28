import gql from 'graphql-tag';

export const COMMENT_QUERY = gql`
  query CommentQuery($commentID: ID!) {
    comment(id: $commentID) {
      text
      createdAt
      author {
        id
        firstName
        lastName
      }
      upvotes {
        id
      }
    }
  }
`;
