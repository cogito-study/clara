import gql from 'graphql-tag';

export const FORGOT_PASSWORD = gql`
  mutation ForgotPasswordMutation($email: String!) {
    sendResetPasswordEmail(email: $email)
  }
`;
