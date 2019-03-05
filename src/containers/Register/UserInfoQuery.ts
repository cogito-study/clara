import gql from 'graphql-tag';

export const USER_INFO_QUERY = gql`
  query UserInfoQuery($userID: ID!) {
    user(id: $userID) {
      firstName
      lastName
      email
    }
  }
`;
