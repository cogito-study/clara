import gql from 'graphql-tag';

export const RESET_PASSWORD = gql`
  mutation ResetPasswordMutation($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password)
  }
`;
