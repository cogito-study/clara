import { Box } from '@chakra-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { SubjectRouteParams } from '../../hooks/use-subject-route';

export const SubjectNotes = () => {
  const { subjectCode } = useParams<SubjectRouteParams>();

  return <Box color="white">{`Subject notes of ${subjectCode}`}</Box>;
};
