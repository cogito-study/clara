import { Box } from 'grommet';
import React from 'react';
import { Spinner } from '../ui/components';

export const LoadingPage = () => (
  <Box fill background="gradient" justify="center" align="center">
    <Spinner />
  </Box>
);
