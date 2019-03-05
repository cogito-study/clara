import React, { Fragment } from 'react';
import { LinePlaceholder } from '../Placeholder/LinePlaceholder';
import { HeadingPlaceholder } from '../Placeholder/HeadingPlaceholder';
import { ParagraphPlaceholder } from '../Placeholder/ParagraphPlaceholder';
import { Box } from 'grommet';

export const NoteCommentPlaceholder = () => (
  <Fragment>
    <HeadingPlaceholder level={3} />
    <Box margin={{ bottom: 'small' }}>
      <LinePlaceholder height={12} width={120} />
    </Box>
    <ParagraphPlaceholder lineHeight={20} numberOfLines={5} />
  </Fragment>
);
