import React from 'react';
import { Box, Grommet } from 'grommet';
import { theme } from '../ui/theme';

import { Spinner } from '../ui/components';

export const LoadingPage = () => (
  <Grommet theme={theme} full>
    <Box fill background="gradient" justify="center" align="center">
      <Spinner />
    </Box>
  </Grommet>
);
