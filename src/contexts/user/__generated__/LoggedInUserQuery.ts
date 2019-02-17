/* tslint:disable */
// This file was automatically generated and should not be edited.

import { UserRole } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: LoggedInUserQuery
// ====================================================

export interface LoggedInUserQuery_me {
  __typename: "User";
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  neptun: string | null;
  role: UserRole;
}

export interface LoggedInUserQuery {
  me: LoggedInUserQuery_me | null;
}
