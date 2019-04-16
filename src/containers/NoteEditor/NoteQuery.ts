import gql from 'graphql-tag';

export const NOTE_QUERY = gql`
  query NoteQuery($noteID: ID!) {
    note(id: $noteID) {
      authors {
        firstName
        lastName
      }
      title
      text
      comments {
        id
        locationInText
      }
    }
  }
`;
