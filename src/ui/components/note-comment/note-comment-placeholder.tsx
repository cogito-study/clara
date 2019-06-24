import { Box } from 'grommet';
import React from 'react';
import { HeadingPlaceholder } from '../placeholder/heading-placeholder';
import { LinePlaceholder } from '../placeholder/line-placeholder';
import { ParagraphPlaceholder } from '../placeholder/paragraph-placeholder';

export const NoteCommentPlaceholder = () => (
  <Box
    width="280px"
    background="white"
    direction="column"
    round="20px"
    overflow="hidden"
    elevation="medium"
    pad="medium"
    gap="small"
  >
    <HeadingPlaceholder level={3} />
    <Box margin={{ bottom: 'small' }}>
      <LinePlaceholder height={12} width={120} />
    </Box>
    <ParagraphPlaceholder lineHeight={20} numberOfLines={5} />
  </Box>
);
