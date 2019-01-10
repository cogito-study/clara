/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SubjectInfoQuery
// ====================================================

export interface SubjectInfoQuery_subject_info {
  __typename: "SubjectInfo";
  id: string;
  title: string;
  subtitle: string | null;
  text: string;
}

export interface SubjectInfoQuery_subject {
  __typename: "Subject";
  info: SubjectInfoQuery_subject_info[] | null;
}

export interface SubjectInfoQuery {
  subject: SubjectInfoQuery_subject | null;
}

export interface SubjectInfoQueryVariables {
  subjectCode: string;
}
