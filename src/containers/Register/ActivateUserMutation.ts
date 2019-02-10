import gql from 'graphql-tag';

export const ACTIVATE_USER = gql`
  mutation ActivateUserMutation($token: String!, $password: String!) {
    activate(token: $token, password: $password)
  }
`;
