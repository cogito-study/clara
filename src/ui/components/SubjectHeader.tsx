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
  <Box flex width="xlarge" height="60px" pad="xsmall" justify="between" align="center" direction="row">
    <Box basis="1/4" justify="center">
      <Image src={logo} width="80%" />
    </Box>
    <Box basis="1/2">
      <Heading level="2" color="white" textAlign="center">
        {title}
      </Heading>
    </Box>
    <Box basis="1/4" direction="row" align="center" gap="small">
      <Heading level="4" color="white">
        {userName}
      </Heading>
      <Button icon={<Logout color="white" />} onClick={onLogout} />
    </Box>
  </Box>
);
