import gql from 'graphql-tag';

export const SUBJECT_INFO_QUERY = gql`
  query SubjectInfoQuery($subjectCode: String!) {
    subject(code: $subjectCode) {
      institute {
        name
      }
      description
      faculty {
        email
        firstName
        lastName
        roleName
        profilePicURL
        phone
      }
    }
  }
`;
