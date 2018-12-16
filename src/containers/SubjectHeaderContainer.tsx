import React from 'react';
import { Box } from 'grommet';
import gql from 'graphql-tag';
import { useQuery, useMutation } from 'react-apollo-hooks';

import { SubjectHeader } from '../ui/components/SubjectHeader';

const SUBJECT_HEADER_QUERY = gql``;

// TODO: Integrate logout and loggedin user data
export const SubjectHeaderContainer = () => {
  return (
    <Box fill="horizontal" background="gradient" align="center" justify="center">
      <SubjectHeader title="Érsebészet" userName="Sue Snyder" onLogout={() => alert('Kijelentkezve')} />
    </Box>
  );
};
