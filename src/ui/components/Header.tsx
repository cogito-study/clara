import React from 'react';
import { Box, Heading, Image } from 'grommet';
import { Logout } from 'grommet-icons';

import logo from '../../assets/images/logo.svg';

export const Header = () => (
  <Box flex background="gradient" width="medium" justify="between" align="center">
    <Image src={logo} />
    <Heading level="1">Ersebeszet</Heading>
    <Box>
      <Heading level="3">Mate Papp</Heading>
      <Logout color="white" size="medium" />
    </Box>
  </Box>
);
