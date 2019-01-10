/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserInfoQuery
// ====================================================

export interface UserInfoQuery_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  email: string;
}

export interface UserInfoQuery {
  user: UserInfoQuery_user | null;
}

export interface UserInfoQueryVariables {
  userID: string;
}
