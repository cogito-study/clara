import { Box, Flex } from '@chakra-ui/core';
import React, { FC, Suspense, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FullCogitoLoader } from '../';
import { SubjectRouteParams } from '../../../subject/utils/subject-route';
import background from '../../assets/background-pattern.svg';
import { MainMenu } from '../navigation/menu';
import { PageTitleHeader } from '../navigation/page-title-header';
import { useSubjectTitleLazyQuery } from './graphql/subject-title-query.generated';

export const Layout: FC<{ title?: string }> = ({ title, children }) => {
  const { subjectCode } = useParams<SubjectRouteParams>();
  const [fetchSubjectTitle, { data, loading }] = useSubjectTitleLazyQuery();

  useEffect(() => {
    if (subjectCode) {
      fetchSubjectTitle({ variables: { subjectCode } });
    }
  }, [fetchSubjectTitle, subjectCode]);

  const layoutTitle = title ? title : data?.subject?.name;

  return (
    <Flex
      direction={['column', 'column', 'row']}
      bg="white"
      minH="100vh"
      backgroundImage={`url(${background})`}
      backgroundPosition={['center left', 'center left', 'center']}
      backgroundRepeat="none"
      backgroundSize="cover"
      backgroundAttachment="fixed"
    >
      <MainMenu title={layoutTitle} titleLoading={loading} />
      <Suspense fallback={<FullCogitoLoader />}>
        <Box width="100%" ml={['initial', 'initial', 'initial', '250px']}>
          {title && <PageTitleHeader title={title} />}
          {children}
        </Box>
      </Suspense>
    </Flex>
  );
};
