/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SubjectNoteListQuery
// ====================================================

export interface SubjectNoteListQuery_subject_notes {
  __typename: "Note";
  id: string;
  number: number;
  title: string;
  description: string | null;
  updatedAt: any;
  createdAt: any;
}

export interface SubjectNoteListQuery_subject {
  __typename: "Subject";
  notes: SubjectNoteListQuery_subject_notes[] | null;
}

export interface SubjectNoteListQuery {
  subject: SubjectNoteListQuery_subject | null;
}

export interface SubjectNoteListQueryVariables {
  subjectCode: string;
}
