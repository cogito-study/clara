import React, { FunctionComponent } from 'react';
import { Box } from 'grommet';
import CogitoEditor from '../editor/Editor';
import { RouteComponentProps } from 'react-router-dom';

const NotePage: FunctionComponent<RouteComponentProps> = () => (
  <Box pad="40px" fill align="center">
    <CogitoEditor />
  </Box>
);

export default NotePage;
