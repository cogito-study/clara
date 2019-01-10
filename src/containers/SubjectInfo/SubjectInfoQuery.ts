import gql from 'graphql-tag';

export const SUBJECT_INFO_QUERY = gql`
  query SubjectInfoQuery($subjectCode: String!) {
    subject(code: $subjectCode) {
      info {
        id
        title
        subtitle
        text
      }
    }
  }
`;
