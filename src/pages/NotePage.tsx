import React, { FunctionComponent } from 'react';
import { Box, Heading } from 'grommet';
import CogitoEditor from '../editor/Editor';
import { RouteComponentProps } from 'react-router-dom';

// TODO: Change background color
const NotePage: FunctionComponent<RouteComponentProps<{ noteID: string }>> = ({ match }) => (
  <div>
    <Box width="large" background="yellow" align="center">
      <Heading level="1">{match!.params.noteID}. Note Page</Heading>
    </Box>
    <CogitoEditor />
  </div>
);

export default NotePage;
