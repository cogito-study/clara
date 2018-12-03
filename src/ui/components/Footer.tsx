import React, { FunctionComponent } from 'react';
import { Box, BoxProps, Text, Button, Grid } from 'grommet';
import { Facebook, Instagram, Twitter } from 'grommet-icons';

export const Footer: FunctionComponent<BoxProps> = (props) => (
  <Box margin="none" width="100%" height="127px" background="primary" justify="center" align="center" {...props}>
    <Grid
      columns={{
        count: 2,
        size: 'auto',
      }}
      align="center"
      gap="xlarge"
      margin="medium"
    >
      <Grid
        columns={{
          count: 4,
          size: 'auto',
        }}
        gap="medium"
      >
        <Text color="white">contact@cogito.study</Text>
        <Text color="white">ÁSZF</Text>
        <Text color="white">Adatvédelem</Text>
        <Text color="white">Kapcsolat</Text>
      </Grid>
      <Grid
        columns={{
          count: 3,
          size: 'auto',
        }}
        gap="medium"
      >
        <Button icon={<Facebook />} onClick={() => {}} />
        <Button icon={<Instagram />} onClick={() => {}} />
        <Button icon={<Twitter />} onClick={() => {}} />
      </Grid>
    </Grid>
  </Box>
);
