import React from 'react';
import { Box } from 'grommet';

import { Header } from '../ui/components/Header';

export const HeaderContainer = () => (
  <Box fill="horizontal" background="gradient" align="center" justify="center">
    <Header title="Érsebészet" userName="Sue Snyder" onLogout={() => alert('Kijelentkezve')} />
  </Box>
);
