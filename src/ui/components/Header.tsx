import React, { FunctionComponent } from 'react';
import { Box, Heading, Image, Button } from 'grommet';
import { Logout } from 'grommet-icons';

import logo from '../../assets/images/logo.svg';

interface Props {
  title: string;
  userName: string;
  onLogout: () => void;
}

export const Header: FunctionComponent<Props> = ({ title, userName, onLogout }) => (
  <Box flex width="large" height="60px" justify="between" align="center" direction="row">
    <Image src={logo} height="60%" />
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
