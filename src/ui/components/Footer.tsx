import { Box, BoxProps, Button, Text } from 'grommet';
import { Facebook, Instagram, Twitter } from 'grommet-icons';
import React, { FunctionComponent } from 'react';

export const Footer: FunctionComponent<BoxProps> = (props) => (
  <Box
    margin="none"
    width="100%"
    pad={{ horizontal: 'medium', vertical: 'small' }}
    background="primary"
    justify="center"
    align="center"
    {...props}
  >
    <Box fill align="center" justify="between" gap="small" margin="medium" direction="row-responsive">
      <Box gap="medium" basis="2/3" justify="center" align="center" direction="row-responsive">
        <Text alignSelf="center" color="white" weight="bold">
          contact@cogito.study
        </Text>
        <Text alignSelf="center" color="white">
          ÁSZF
        </Text>
        <Text alignSelf="center" color="white">
          Adatvédelem
        </Text>
        <Text alignSelf="center" color="white">
          Kapcsolat
        </Text>
      </Box>
      <Box basis="1/3" gap="medium" direction="row" justify="center">
        <Button icon={<Facebook />} onClick={() => {}} />
        <Button icon={<Instagram />} onClick={() => {}} />
        <Button icon={<Twitter />} onClick={() => {}} />
      </Box>
    </Box>
  </Box>
);
