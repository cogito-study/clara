import gql from 'graphql-tag';

export const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    me {
      id
      firstName
      lastName
      email
      neptun
      role
    }
  }
`;
