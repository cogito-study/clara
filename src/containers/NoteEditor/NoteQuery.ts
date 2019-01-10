import gql from 'graphql-tag';

export const NOTE_QUERY = gql`
  query NoteQuery($noteID: ID!) {
    note(id: $noteID) {
      title
      text
      comments {
        id
        locationInText
      }
    }
  }
`;
