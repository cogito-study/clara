import gql from 'graphql-tag';

export const ACTIVATE_USER = gql`
  mutation ActivateUserMutation($userID: ID!, $password: String!) {
    activate(id: $userID, password: $password) {
      token
    }
  }
`;
