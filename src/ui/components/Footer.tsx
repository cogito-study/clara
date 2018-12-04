import React, { FunctionComponent } from 'react';
import { Box, BoxProps, Text, Button } from 'grommet';
import { Facebook, Instagram, Twitter } from 'grommet-icons';

const Footer: FunctionComponent<BoxProps> = (props) => (
  <Box margin="none" width="100%" pad="small" background="primary" justify="center" align="center" {...props}>
    <Box align="center" gap="xlarge" margin="medium" direction="row-responsive">
      <Box basis="2/3" gap="large" direction="row-responsive">
        <Text color="white">contact@cogito.study</Text>
        <Text color="white">ÁSZF</Text>
        <Text color="white">Adatvédelem</Text>
        <Text color="white">Kapcsolat</Text>
      </Box>
      <Box basis="1/3" gap="large" direction="row">
        <Button icon={<Facebook />} onClick={() => {}} />
        <Button icon={<Instagram />} onClick={() => {}} />
        <Button icon={<Twitter />} onClick={() => {}} />
      </Box>
    </Box>
  </Box>
);
