import { Box, Heading } from '@chakra-ui/core';
import React, { FunctionComponent } from 'react';
import { useParams, Route } from 'react-router-dom';
import { SubjectRouteParams, useSubjectRoute } from '../hooks/use-subject-route';

const SubjectInfo = () => {
  const { subjectCode } = useParams<SubjectRouteParams>();

  return <Box color="white">{`Subject info of ${subjectCode}`}</Box>;
};

const SubjectNotes = () => {
  const { subjectCode } = useParams<SubjectRouteParams>();

  return <Box color="white">{`Subject notes of ${subjectCode}`}</Box>;
};

const SubjectPage: FunctionComponent = () => {
  const subjectInfo = useSubjectRoute({ path: 'subject-info' });
  const subjectNotes = useSubjectRoute({ path: 'subject-notes' });

  return (
    <Box p={5} height="100vh" width="100%" bg="blue.800" color="white">
      <Heading>Subject Page</Heading>
      <Route to={subjectInfo}>
        <SubjectInfo />
      </Route>
      <Route to={subjectNotes}>
        <SubjectNotes />
      </Route>
    </Box>
  );
};

export default SubjectPage;
