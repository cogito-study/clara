import gql from 'graphql-tag';

export const SUBJECT_INFO_TOP_QUERY = gql`
  query SubjectInfoTopQuery($subjectCode: String!) {
    subject(code: $subjectCode) {
      institute {
        name
      }
      description
      faculty {
        firstName
        lastName
        role
        phone
        email
      }
    }
  }
`;
