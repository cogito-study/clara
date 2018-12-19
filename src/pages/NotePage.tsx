import React, { FunctionComponent } from 'react';
import { Box } from 'grommet';
import CogitoEditor from '../editor/Editor';
import { RouteComponentProps } from 'react-router-dom';

import { NoteRouteParams } from '../types/RouteParams';

const NotePage: FunctionComponent<RouteComponentProps<NoteRouteParams>> = ({ match }) => {
  const { subjectCode, noteID } = match.params;
  console.log('subjectCode', subjectCode);
  console.log('noteID', noteID);

  return (
    <Box fill>
      <CogitoEditor />
    </Box>
  );
};

export default NotePage;
