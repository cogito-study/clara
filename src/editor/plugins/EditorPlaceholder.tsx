import { Box } from 'grommet';
import React from 'react';
import { HeadingPlaceholder } from '../../ui/components/Placeholder/HeadingPlaceholder';
import { ParagraphPlaceholder } from '../../ui/components/Placeholder/ParagraphPlaceholder';

export const EditorPlaceholder = () => (
  <Box margin="medium">
    <HeadingPlaceholder level={1} />
    <Box background="white" elevation="small" align="start" round="medium" pad="large" gap="medium">
      <HeadingPlaceholder level={3} />
      <ParagraphPlaceholder numberOfLines={5} lineHeight={20} />
      <HeadingPlaceholder level={4} />
      <ParagraphPlaceholder numberOfLines={8} lineHeight={20} />
      <HeadingPlaceholder level={3} />
      <ParagraphPlaceholder numberOfLines={4} lineHeight={20} />
      <HeadingPlaceholder level={4} />
      <ParagraphPlaceholder numberOfLines={5} lineHeight={20} />
    </Box>
  </Box>
);
