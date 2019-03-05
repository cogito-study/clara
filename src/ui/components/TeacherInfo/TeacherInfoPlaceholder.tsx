import { Box } from 'grommet';
import React from 'react';

import { CirclePlaceholder } from '../Placeholder/CirclePlaceholder';
import { ParagraphPlaceholder } from '../Placeholder/ParagraphPlaceholder';

export const TeacherInfoPlaceholder = () => {
  return (
    <Box direction="row">
      <CirclePlaceholder size={80} />
      <Box justify="center" width="170px" margin={{ left: 'medium' }}>
        <ParagraphPlaceholder numberOfLines={3} lineHeight={12} />
      </Box>
    </Box>
  );
};
