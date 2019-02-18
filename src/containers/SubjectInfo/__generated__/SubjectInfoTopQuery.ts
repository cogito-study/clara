/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserRole } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: SubjectInfoTopQuery
// ====================================================

export interface SubjectInfoTopQuery_subject_institute {
  __typename: "Institute";
  name: string;
}

export interface SubjectInfoTopQuery_subject_faculty {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  phone: string | null;
  email: string;
}

export interface SubjectInfoTopQuery_subject {
  __typename: "Subject";
  institute: SubjectInfoTopQuery_subject_institute | null;
  description: string;
  faculty: SubjectInfoTopQuery_subject_faculty[] | null;
}

export interface SubjectInfoTopQuery {
  subject: SubjectInfoTopQuery_subject | null;
}

export interface SubjectInfoTopQueryVariables {
  subjectCode: string;
}
