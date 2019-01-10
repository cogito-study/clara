/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginUser
// ====================================================

export interface LoginUser_login {
  __typename: "AuthPayload";
  token: string;
}

export interface LoginUser {
  login: LoginUser_login;
}

export interface LoginUserVariables {
  username: string;
  password: string;
}
