import { Box } from 'grommet';
import React, { Fragment, FunctionComponent } from 'react';

import { randomPercentage } from '../../helpers/randomPercentage';
import { LinePlaceholder } from './LinePlaceholder';

interface ParagraphPlaceholderProps {
  numberOfLines: number;
  lineHeight: number;
}

export const ParagraphPlaceholder: FunctionComponent<ParagraphPlaceholderProps> = ({ numberOfLines, lineHeight }) => (
  <Fragment>
    <Box width="100%">
      {Array.from({ length: numberOfLines }).map((_, index) => (
        <LinePlaceholder key={index} height={lineHeight} width={randomPercentage(80, 100)} />
      ))}
    </Box>
  </Fragment>
);
