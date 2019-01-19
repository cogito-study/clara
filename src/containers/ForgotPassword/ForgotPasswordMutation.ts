import gql from 'graphql-tag';

export const FORGOT_PASSWORD = gql`
  mutation ForgotPasswordMutation($email: String!) {
    forgotPassword(email: $email)
  }
`;
