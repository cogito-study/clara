import gql from 'graphql-tag';

export const UPDATE_NOTE_MUTATION = gql`
  mutation UpdateNoteMutation($noteID: ID!, $noteText: Json!) {
    updateNote(id: $noteID, text: $noteText) {
      id
      comments {
        id
        locationInText
      }
    }
  }
`;
