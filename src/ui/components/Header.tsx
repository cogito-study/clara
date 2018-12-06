import React from 'react';
import { Box, Heading, Image } from 'grommet';
import { Logout } from 'grommet-icons';

import logo from '../../assets/images/logo.svg';

export const Header = () => (
  <Box flex width="large" justify="between" align="center" direction="row">
    <Image src={logo} />
    <Heading level="1" color="white">
      Ersebeszet
    </Heading>
    <Box direction="row" align="center" gap="small">
      <Heading level="3" color="white">
        Mate Papp
      </Heading>
      <Logout color="white" size="medium" />
    </Box>
  </Box>
);
