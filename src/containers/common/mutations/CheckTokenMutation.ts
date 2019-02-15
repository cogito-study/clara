import gql from 'graphql-tag';

export const CHECK_TOKEN_MUTATION = gql`
  mutation CheckTokenMutation($token: String!) {
    checkTokenValid(token: $token)
  }
`;
