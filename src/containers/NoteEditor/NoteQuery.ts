import gql from 'graphql-tag';

export const NOTE_QUERY = gql`
  query NoteQuery($noteID: ID!) {
    note(id: $noteID) {
      authors
      title
      text
      comments {
        id
        locationInText
      }
    }
  }
`;
