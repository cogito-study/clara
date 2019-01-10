/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LoggedInUserQuery
// ====================================================

export interface LoggedInUserQuery_me {
  __typename: "User";
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  neptun: string;
}

export interface LoggedInUserQuery {
  me: LoggedInUserQuery_me | null;
}
