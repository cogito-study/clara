import React from 'react';
import { Box } from 'grommet';

import { SubjectHeader } from '../ui/components/SubjectHeader';

// TODO: Integrate logout and loggedin user data
export const SubjectHeaderContainer = () => {
  return (
    <Box fill="horizontal" background="gradient" align="center" justify="center">
      <SubjectHeader title="Érsebészet" userName="Sue Snyder" onLogout={() => alert('Kijelentkezve')} />
    </Box>
  );
};
