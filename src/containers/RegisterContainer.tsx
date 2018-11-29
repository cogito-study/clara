import React, { FunctionComponent } from 'react';
import { Heading } from 'grommet';
import { RouteComponentProps } from 'react-router-dom';

export const RegisterContainer: FunctionComponent<RouteComponentProps<{ userID: string }>> = ({ match }) => (
  <Heading level="2">Register Container user ID = {match.params.userID}</Heading>
);
