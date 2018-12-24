import React, { FunctionComponent } from 'react';
import { Box, Grommet } from 'grommet';
import { RouteComponentProps } from 'react-router-dom';
import { theme } from '../ui/theme';

import { NoteRouteParams } from '../types/RouteParams';
import { NoteEditorContainer } from '../containers/NoteEditorContainer';

const NotePage: FunctionComponent<RouteComponentProps<NoteRouteParams>> = (props) => (
  <Grommet theme={theme} full>
    <Box fill background="light">
      <NoteEditorContainer {...props} />
    </Box>
  </Grommet>
);

export default NotePage;
