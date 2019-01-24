import { Box, BoxProps, Anchor } from 'grommet';
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
        <Anchor
          alignSelf="center"
          color="white"
          label="contact@cogito.study"
          href="mailto:contact@cogito.study"
          style={{ fontWeight: 'bold' }}
        />
        <Anchor
          alignSelf="center"
          color="white"
          label="ÁSZF"
          href={process.env.PUBLIC_URL + '/ASZF.pdf'}
          target="_blank"
        />
        <Anchor alignSelf="center" color="white" label="Adatvédelem" href="../../assets/documents/ASZF.pdf" download />
      </Box>
      <Box basis="1/3" gap="medium" direction="row" justify="center">
        <Anchor icon={<Facebook />} href="https://facebook.com/cogitostudy" target="_blank" color="white" />
        <Anchor icon={<Instagram />} href="https://www.instagram.com/cogito.study/" target="_blank" color="white" />
        <Anchor icon={<Twitter />} href="https://twitter.com/cogitostudy" target="_blank" color="white" />
      </Box>
    </Box>
  </Box>
);
