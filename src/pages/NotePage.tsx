import React, { FunctionComponent } from 'react';
import { Box } from 'grommet';
import { RouteComponentProps } from 'react-router-dom';

import { NoteRouteParams } from '../types/RouteParams';
import { NoteEditorContainer } from '../containers/NoteEditorContainer';

const NotePage: FunctionComponent<RouteComponentProps<NoteRouteParams>> = (props) => (
  <Box fill background="backgroundBlue">
    <NoteEditorContainer {...props} />
  </Box>
);

export default NotePage;
