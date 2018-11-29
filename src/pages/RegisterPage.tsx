import React, { FunctionComponent } from 'react';
import { Box, Heading } from 'grommet';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<{ userID: string }> {}

export const RegisterPage: FunctionComponent<Props> = (props) => (
  <Box fill="true" background="red" align="center">
    <Heading level="1">Register Page user ID = {props.match.params.userID}</Heading>
  </Box>
);
