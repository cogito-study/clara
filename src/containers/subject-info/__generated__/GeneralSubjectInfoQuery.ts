/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GeneralSubjectInfoQuery
// ====================================================

export interface GeneralSubjectInfoQuery_subject_info {
  __typename: 'SubjectInfo';
  id: string;
  title: string;
  subtitle: string | null;
  text: string;
}

export interface GeneralSubjectInfoQuery_subject {
  __typename: 'Subject';
  info: GeneralSubjectInfoQuery_subject_info[] | null;
}

export interface GeneralSubjectInfoQuery {
  subject: GeneralSubjectInfoQuery_subject | null;
}

export interface GeneralSubjectInfoQueryVariables {
  subjectCode: string;
}
