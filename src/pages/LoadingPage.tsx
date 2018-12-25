import React from 'react';
import { Box } from 'grommet';

import { Spinner } from '../ui/components';

export const LoadingPage = () => (
  <Box fill background="gradient" justify="center" align="center">
    <Spinner />
  </Box>
);
