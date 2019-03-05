/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateNoteMutation
// ====================================================

export interface UpdateNoteMutation_updateNote_comments {
  __typename: "Comment";
  id: string;
  locationInText: any;
}

export interface UpdateNoteMutation_updateNote {
  __typename: "Note";
  id: string;
  comments: UpdateNoteMutation_updateNote_comments[] | null;
}

export interface UpdateNoteMutation {
  updateNote: UpdateNoteMutation_updateNote;
}

export interface UpdateNoteMutationVariables {
  noteID: string;
  noteText: any;
}
