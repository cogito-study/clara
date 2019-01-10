import { Box } from 'grommet';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { NoteEditorContainer } from '../containers/NoteEditor/NoteEditorContainer';
import { NoteRouteParams } from '../types/RouteParams';

const NotePage: FunctionComponent<RouteComponentProps<NoteRouteParams>> = (props) => (
  <Box fill background="light">
    <NoteEditorContainer {...props} />
  </Box>
);

export default NotePage;
