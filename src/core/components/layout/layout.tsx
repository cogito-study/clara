import { Box, Flex } from '@chakra-ui/core';
import React, { FC, Suspense, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SubjectRouteParams } from '../../../subject/utils/subject-route';
import { FullCogitoLoader } from '../loader/cogito-loader';
import { MainMenu } from '../navigation/menu';
import { PageTitleHeader } from '../navigation/page-title-header';
import { useStudiedSubjectsQuery } from './graphql/studied-subjects-query.generated';
import { useSubjectTitleLazyQuery } from './graphql/subject-title-query.generated';

export const Layout: FC<{ title?: string }> = ({ title, children }) => {
  const { subjectCode } = useParams<SubjectRouteParams>();
  const { data: studiedSubjectsData, loading: studiedSubjectsLoading } = useStudiedSubjectsQuery();
  const [
    fetchSubjectTitle,
    { data: subjectTitleData, loading: subjectTitleLoading },
  ] = useSubjectTitleLazyQuery();

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
        titleLoading={subjectTitleLoading}
        subjects={
          (studiedSubjectsData &&
            studiedSubjectsData.me &&
            studiedSubjectsData.me.studiedSubjects) ||
          []
        }
        subjectsLoading={studiedSubjectsLoading}
      />
      {/* TODO: Normal loading screen */}
      <Suspense fallback={<FullCogitoLoader />}>
        <Box width="100%" ml={['initial', 'initial', 'initial', '250px']}>
          {title && <PageTitleHeader title={title} />}
          {children}
        </Box>
      </Suspense>
    </Flex>
  );
};
