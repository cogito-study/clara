import { Heading } from '@chakra-ui/core';
import React from 'react';
import { ContentWrapper } from '../../../core/components/layout/content-wrapper';
import { SubjectIdentifierProps } from '../../pages/subject-page';
import { useSubjectInfoQuery } from './graphql/subject-info-query.generated';
import { SubjectInfoCard } from './subject-info-card';
import { SubjectTeacherCard } from './subject-teacher-card';

export const SubjectInfo = ({ subjectCode }: SubjectIdentifierProps) => {
  const { data } = useSubjectInfoQuery({ variables: { subjectCode } });

  return (
    <ContentWrapper>
      <SubjectInfoCard
        title="General information"
        description={data?.subject?.description || ''}
        department={data?.subject?.department.name}
        code={data?.subject?.code}
      />
      <Heading
        mt={[5, 6, 6, 8]}
        mb={2}
        fontSize={['md', 'lg']}
        fontWeight="bold"
        color="blue.700"
        lineHeight="normal"
      >
        Teachers
      </Heading>
      {data?.subject?.teachers.map(({ email, fullName }, index: number) => (
        <SubjectTeacherCard key={index} name={fullName} email={email} />
      ))}
      {data?.subject?.informations.map(({ title, content }, index: number) => (
        <SubjectInfoCard key={index} title={title} description={content} />
      ))}
    </ContentWrapper>
  );
};
