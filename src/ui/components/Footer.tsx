import React, { FunctionComponent } from 'react';
import { Box, BoxProps, Text, Button } from 'grommet';
import { Facebook, Instagram, Twitter } from 'grommet-icons';

export const Footer: FunctionComponent<BoxProps> = (props) => (
  <Box margin="none" width="100%" pad="small" background="primary" justify="center" align="center" {...props}>
    <Box align="center" gap="small" margin="medium" direction="row-responsive">
      <Box basis="2/3" gap="large" margin="0px 100px 0px 0px" direction="row-responsive">
        <Text alignSelf="center" color="white">
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
      <Box basis="1/3" gap="large" direction="row">
        <Button icon={<Facebook />} onClick={() => {}} />
        <Button icon={<Instagram />} onClick={() => {}} />
        <Button icon={<Twitter />} onClick={() => {}} />
      </Box>
    </Box>
  </Box>
);
