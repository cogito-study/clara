import { Box } from 'grommet';
import React from 'react';
import { HeadingPlaceholder } from '../placeholder/heading-placeholder';
import { LinePlaceholder } from '../placeholder/line-placeholder';
import { ParagraphPlaceholder } from '../placeholder/paragraph-placeholder';
import { TeacherInfoGrid } from '../teacher-info/teacher-info-grid';

export const SubjectInfoCardPlaceholder = () => (
  <Box pad="large" background="white" round="small" elevation="medium" width="large">
    <Box direction="row" justify="between" align="baseline">
      <HeadingPlaceholder level={3} />
      <Box justify="end">
        <LinePlaceholder height={20} width="40%" align="end" />
      </Box>
    </Box>
    <ParagraphPlaceholder numberOfLines={6} lineHeight={20} />
    <TeacherInfoGrid isLoading={true} />
  </Box>
);
