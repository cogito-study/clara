/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ActivateUserMutation
// ====================================================

export interface ActivateUserMutation_activate {
  __typename: "AuthPayload";
  token: string;
}

export interface ActivateUserMutation {
  activate: ActivateUserMutation_activate;
}

export interface ActivateUserMutationVariables {
  userID: string;
  password: string;
}
