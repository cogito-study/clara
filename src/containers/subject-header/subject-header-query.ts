import gql from 'graphql-tag';

export const SUBJECT_HEADER_QUERY = gql`
  query SubjectHeaderQuery($subjectCode: String!) {
    subject(code: $subjectCode) {
      name
    }
  }
`;
