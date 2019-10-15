import { Box } from '@chakra-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { SubjectRouteParams } from '../../hooks/use-subject-route';

export const SubjectNotes = () => {
  const { subjectCode } = useParams<SubjectRouteParams>();
  const { t } = useTranslation('subject');

  return <Box color="white">{t('notes.of', { subject: subjectCode })}</Box>;
};
