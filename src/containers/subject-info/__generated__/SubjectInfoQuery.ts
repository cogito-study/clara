/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SubjectInfoQuery
// ====================================================

export interface SubjectInfoQuery_subject_institute {
  __typename: 'Institute';
  name: string;
}

export interface SubjectInfoQuery_subject_faculty {
  __typename: 'User';
  email: string;
  firstName: string | null;
  lastName: string | null;
  roleName: string | null;
  profilePicURL: string | null;
  phone: string | null;
}

export interface SubjectInfoQuery_subject {
  __typename: 'Subject';
  institute: SubjectInfoQuery_subject_institute | null;
  description: string;
  faculty: SubjectInfoQuery_subject_faculty[] | null;
}

export interface SubjectInfoQuery {
  subject: SubjectInfoQuery_subject | null;
}

export interface SubjectInfoQueryVariables {
  subjectCode: string;
}
