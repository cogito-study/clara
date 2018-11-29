import React, { FunctionComponent } from 'react';
import { Box, Heading } from 'grommet';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<{ noteID: string }> {}

// TODO: Change background color
export const NotePage: FunctionComponent<Props> = (props) => (
  <Box width="large" background="yellow" fill="true" align="center">
    <Heading level="1">{props.match.params.noteID}. Note Page</Heading>
  </Box>
);
