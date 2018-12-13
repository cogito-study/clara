import React, { FunctionComponent } from 'react';
import { Box } from 'grommet';
import CogitoEditor from '../editor/Editor';
import { RouteComponentProps } from 'react-router-dom';

// TODO: Change background color
const NotePage: FunctionComponent<RouteComponentProps<{ noteID: string }>> = ({ match }) => (
  <div>
    <Box fill>
      <CogitoEditor />
    </Box>
  </div>
);

export default NotePage;
