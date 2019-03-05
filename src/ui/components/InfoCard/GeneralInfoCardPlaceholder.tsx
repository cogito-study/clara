import { Box } from 'grommet';
import React from 'react';
import { HeadingPlaceholder } from '../Placeholder/HeadingPlaceholder';
import { LinePlaceholder } from '../Placeholder/LinePlaceholder';
import { ParagraphPlaceholder } from '../Placeholder/ParagraphPlaceholder';

export const GeneralInfoCardPlaceholder = () => (
  <Box pad="medium" background="white" round="small" elevation="medium" width="large">
    <HeadingPlaceholder level={3} />
    <Box margin={{ bottom: 'small' }}>
      <LinePlaceholder />
    </Box>
    <ParagraphPlaceholder numberOfLines={10} lineHeight={20} />
  </Box>
);
