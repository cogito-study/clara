import { Box } from '@chakra-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { SubjectRouteParams } from '../../hooks/use-subject-route';
import { useTranslation } from 'react-i18next';

export const SubjectInfo = () => {
  const { subjectCode } = useParams<SubjectRouteParams>();
  const { t } = useTranslation('subject');

  return <Box color="white">{t('info.of', { subjectCode })}</Box>;
};
