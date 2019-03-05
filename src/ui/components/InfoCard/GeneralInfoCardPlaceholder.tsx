import { Box } from 'grommet';
import React, { Fragment } from 'react';

import { HeadingPlaceholder } from '../Placeholder/HeadingPlaceholder';
import { LinePlaceholder } from '../Placeholder/LinePlaceholder';
import { ParagraphPlaceholder } from '../Placeholder/ParagraphPlaceholder';

export const GeneralInfoCardPlaceholder = () => (
  <Fragment>
    <HeadingPlaceholder level={3} />
    <Box margin={{ bottom: 'small' }}>
      <LinePlaceholder />
    </Box>
    <ParagraphPlaceholder numberOfLines={10} lineHeight={20} />
  </Fragment>
);
