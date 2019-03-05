import gql from 'graphql-tag';

export const SUBJECT_INFO_QUERY = gql`
  query SubjectInfoQuery($subjectCode: String!) {
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
