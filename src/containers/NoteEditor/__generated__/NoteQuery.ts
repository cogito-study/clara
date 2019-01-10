/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NoteQuery
// ====================================================

export interface NoteQuery_note_comments {
  __typename: "Comment";
  id: string;
  locationInText: any;
}

export interface NoteQuery_note {
  __typename: "Note";
  title: string;
  text: any;
  comments: NoteQuery_note_comments[] | null;
}

export interface NoteQuery {
  note: NoteQuery_note | null;
}

export interface NoteQueryVariables {
  noteID: string;
}
