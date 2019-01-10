/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SubjectHeaderQuery
// ====================================================

export interface SubjectHeaderQuery_subject {
  __typename: "Subject";
  name: string;
}

export interface SubjectHeaderQuery {
  subject: SubjectHeaderQuery_subject | null;
}

export interface SubjectHeaderQueryVariables {
  subjectCode: string;
}
