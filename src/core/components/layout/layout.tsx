import { Box, Flex } from '@chakra-ui/core';
import React, { FC, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { SubjectRouteParams } from '../../../subject/utils/subject-route';
import { LoadingPage } from '../../pages/loading-page';
import { MainMenu } from '../navigation/menu';
import { useStudiedSubjectsQuery } from './graphql/studied-subjects-query.generated';
import { useSubjectTitleQuery } from './graphql/subject-title-query.generated';

export const Layout: FC = ({ children }) => {
  const { subjectCode } = useParams<SubjectRouteParams>();
  const { data: studiedSubjectsData } = useStudiedSubjectsQuery();
  const { data: subjectTitleData } = useSubjectTitleQuery({
    variables: { subjectCode: subjectCode },
  });

  return (
    <Flex direction={['column', 'column', 'row']} bg="white">
      <MainMenu
        subjectTitle={subjectTitleData && subjectTitleData.subject && subjectTitleData.subject.name}
        subjects={
          (studiedSubjectsData &&
            studiedSubjectsData.me &&
            studiedSubjectsData.me.studiedSubjects) ||
          []
        }
      />
      {/* TODO: Normal loading screen */}
      <Suspense fallback={<LoadingPage />}>
        <Box width="100%" ml={['initial', 'initial', 'initial', '250px']}>
          {children}
        </Box>
      </Suspense>
    </Flex>
  );
};
