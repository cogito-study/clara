import React, { FunctionComponent } from 'react';
import { Box, Heading } from 'grommet';
import { RouteComponentProps } from 'react-router-dom';

// TODO: Change background color
const NotePage: FunctionComponent<RouteComponentProps<{ noteID: string }>> = ({ match }) => (
  <Box width="large" background="yellow" align="center">
    <Heading level="1">{match.params.noteID}. Note Page</Heading>
  </Box>
);

export default NotePage;
