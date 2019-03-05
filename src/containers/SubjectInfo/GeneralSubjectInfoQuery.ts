import gql from 'graphql-tag';

export const GENERAL_SUBJECT_INFO_QUERY = gql`
  query GeneralSubjectInfoQuery($subjectCode: String!) {
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
