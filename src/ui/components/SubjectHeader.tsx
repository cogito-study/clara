import React, { FunctionComponent } from 'react';
import { Box, Heading, Image, Button } from 'grommet';
import { Logout } from 'grommet-icons';

import logo from '../../assets/images/logo.svg';

interface Props {
  title: string;
  userName: string;
  onLogout: () => void;
}

export const SubjectHeader: FunctionComponent<Props> = ({ title, userName, onLogout }) => (
  <Box flex width="large" height="60px" justify="between" align="center" direction="row">
    <Box width="180px" justify="center">
      <Image src={logo} width="80%" />
    </Box>
    <Heading level="2" color="white">
      {title}
    </Heading>
    <Box direction="row" align="center" gap="small">
      <Heading level="4" color="white">
        {userName}
      </Heading>
      <Button icon={<Logout color="white" />} onClick={onLogout} />
    </Box>
  </Box>
);
