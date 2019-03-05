import { Box } from 'grommet';
import React from 'react';
import { LinePlaceholder } from '../Placeholder/LinePlaceholder';
import { ParagraphPlaceholder } from '../Placeholder/ParagraphPlaceholder';
import { ResponsiveNoteCard } from './ResponsiveNoteCard';

export const NoteCardPlaceholder: ResponsiveNoteCard = {
  Mobile: () => (
    <Box
      width="100%"
      align="start"
      height="110px"
      justify="between"
      background="white"
      round="small"
      pad="14px"
      margin="small"
      gap="medium"
      elevation="medium"
    >
      <Box fill direction="column" margin="none" align="start" gap="xsmall">
        <ParagraphPlaceholder numberOfLines={2} lineHeight={24} />
        <LinePlaceholder height={12} />
      </Box>
    </Box>
  ),

  Desktop: () => (
    <Box
      align="center"
      background="white"
      elevation="large"
      gap="small"
      height="270px"
      justify="between"
      margin="small"
      pad="medium"
      round="medium"
      width="280px"
    >
      <Box fill direction="column" align="start" justify="start" gap="xsmall">
        <ParagraphPlaceholder numberOfLines={2} lineHeight={22} />
        <Box margin={{ top: 'small' }}>
          <ParagraphPlaceholder numberOfLines={5} lineHeight={14} />
        </Box>
      </Box>
    </Box>
  ),
};
