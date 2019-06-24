import gql from 'graphql-tag';

export const SUBJECT_NOTE_LIST_QUERY = gql`
  query SubjectNoteListQuery($subjectCode: String!) {
    subject(code: $subjectCode) {
      notes(orderBy: number_ASC) {
        id
        number
        title
        description
        updatedAt
        createdAt
      }
    }
  }
`;
