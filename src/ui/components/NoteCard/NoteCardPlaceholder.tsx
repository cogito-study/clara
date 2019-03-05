import { Box } from 'grommet';
import { Fragment } from 'react';

import { LinePlaceholder } from '../Placeholder/LinePlaceholder';
import { ParagraphPlaceholder } from '../Placeholder/ParagraphPlaceholder';
import { ResponsiveNoteCard } from './ResponsiveNoteCard';

export const NoteCardPlaceholder: ResponsiveNoteCard = {
  Mobile: () => (
    <Fragment>
      <Box fill direction="column" margin="none" align="start" gap="xsmall">
        <ParagraphPlaceholder numberOfLines={2} lineHeight={24} />
        <LinePlaceholder height={12} />
      </Box>
    </Fragment>
  ),

  Desktop: () => (
    <Fragment>
      <Box fill direction="column" align="start" justify="start" gap="xsmall">
        <ParagraphPlaceholder numberOfLines={2} lineHeight={22} />
        <Box margin={{ top: 'small' }}>
          <ParagraphPlaceholder numberOfLines={5} lineHeight={14} />
        </Box>
      </Box>
    </Fragment>
  ),
};
