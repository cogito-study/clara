import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation LoginUserMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
