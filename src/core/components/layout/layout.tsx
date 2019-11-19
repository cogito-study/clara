import { Box, Flex } from '@chakra-ui/core';
import React, { FC, Suspense, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SubjectRouteParams } from '../../../subject/utils/subject-route';
import { MainMenu } from '../navigation/menu';
import { useStudiedSubjectsQuery } from './graphql/studied-subjects-query.generated';
import { useSubjectTitleLazyQuery } from './graphql/subject-title-query.generated';

export const Layout: FC<{ title?: string }> = ({ title, children }) => {
  const { subjectCode } = useParams<SubjectRouteParams>();
  const { data: studiedSubjectsData } = useStudiedSubjectsQuery();
  const [fetchSubjectTitle, { data: subjectTitleData }] = useSubjectTitleLazyQuery();

  useEffect(() => {
    if (subjectCode) {
      fetchSubjectTitle({ variables: { subjectCode } });
    }
  }, [fetchSubjectTitle, subjectCode]);

  const layoutTitle = title
    ? title
    : subjectTitleData && subjectTitleData.subject && subjectTitleData.subject.name;

  return (
    <Flex direction={['column', 'column', 'row']} bg="white">
      <MainMenu
        title={layoutTitle}
        subjects={
          (studiedSubjectsData &&
            studiedSubjectsData.me &&
            studiedSubjectsData.me.studiedSubjects) ||
          []
        }
      />
      {/* TODO: Normal loading screen */}
      <Suspense fallback={<div>loading...</div>}>
        <Box width="100%" ml={['initial', 'initial', 'initial', '250px']}>
          {children}
        </Box>
      </Suspense>
    </Flex>
  );
};
