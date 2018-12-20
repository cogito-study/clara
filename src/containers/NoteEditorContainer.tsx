import React, { FunctionComponent } from 'react';
import gql from 'graphql-tag';
import { Box } from 'grommet';
import { useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';

import CogitoEditor from '../editor/Editor';
import { NoteRouteParams } from '../types/RouteParams';

const NOTE_QUERY = gql`
  query NoteQuery($noteID: Int!) {
    note(noteId: $noteID) {
      title
      text
    }
  }
`;

export const NoteEditorContainer: FunctionComponent<RouteComponentProps<NoteRouteParams>> = ({ match }) => {
  const { noteID } = match.params;
  const { data } = useQuery(NOTE_QUERY, { variables: { noteID } });

  return (
    <Box justify="center" pad="small">
      {data && <CogitoEditor title={data.note.title} initialValue={data.note.text} />}
    </Box>
  );
};
