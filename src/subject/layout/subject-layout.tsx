import { Flex } from '@chakra-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { MainMenu } from '../../core/components/navigation/menu';
import { SubjectPage } from '../pages/subject-page';
import { SubjectRouteParams } from '../utils/subject-route';
import { useSubjectPageQuery } from './graphql/subject-page-query.generated';

export const SubjectLayout = () => {
  const { subjectCode } = useParams<SubjectRouteParams>();
  const { data } = useSubjectPageQuery({ variables: { subjectCode } });

  return (
    <Flex direction={['column', 'column', 'row']} bg="white">
      {data && data.subject && data.subject.name && data.subject.name && (
        <>
          <MainMenu subjectTitle={data.subject.name} />
          <SubjectPage subjectTitle={data.subject.name} />
        </>
      )}
    </Flex>
  );
};
