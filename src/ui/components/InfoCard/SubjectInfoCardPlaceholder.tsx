import { Box } from 'grommet';
import React, { Fragment } from 'react';

import { HeadingPlaceholder } from '../Placeholder/HeadingPlaceholder';
import { LinePlaceholder } from '../Placeholder/LinePlaceholder';
import { ParagraphPlaceholder } from '../Placeholder/ParagraphPlaceholder';
import { TeacherInfoGrid } from '../TeacherInfo/TeacherInfoGrid';

export const SubjectInfoCardPlaceholder = () => (
  <Fragment>
    <Box direction="row" justify="between" align="baseline">
      <HeadingPlaceholder level={3} />
      <Box justify="end">
        <LinePlaceholder height={20} width="40%" align="end" />
      </Box>
    </Box>
    <ParagraphPlaceholder numberOfLines={6} lineHeight={20} />
    <TeacherInfoGrid isLoading={true} />
  </Fragment>
);
