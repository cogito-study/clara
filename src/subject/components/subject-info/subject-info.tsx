import { Heading } from '@chakra-ui/core';
import { action } from '@storybook/addon-actions';
import React from 'react';
import { ContentWrapper } from '../../../core/components/layout/content-wrapper';
import { SubjectIdentifierProps } from '../../pages/subject-page';
import { AddItemCard } from '../elements/add-item-card';
import { useSubjectInfoQuery } from './graphql/subject-info-query.generated';
import { SubjectInfoCard } from './subject-info-card';
import { InfoCardListPlaceholder } from './subject-info-card.placeholder';
import { SubjectTeacherCard } from './subject-teacher-card';

export const SubjectInfo = ({ subjectCode }: SubjectIdentifierProps) => {
  const { data, loading } = useSubjectInfoQuery({ variables: { subjectCode } });

  return (
    <ContentWrapper>
      {loading ? (
        <InfoCardListPlaceholder />
      ) : (
        <>
          <SubjectInfoCard
            title="General information"
            description={data?.subject?.description || ''}
            department={data?.subject?.department.name}
            code={data?.subject?.code}
            isEditable
          />
          <Heading
            mt={[6, 6, 6, 8]}
            mb={[3, 3, 3, 4]}
            fontSize={['md', 'lg']}
            fontWeight="bold"
            maxWidth="80%"
            color="blue.700"
            lineHeight="normal"
          >
            Teachers
          </Heading>
          {data?.subject?.teachers?.map(({ email, fullName }, index: number) => (
            <SubjectTeacherCard key={index} name={fullName} email={email} />
          ))}
          {data?.subject?.informations?.map(({ title, content }, index: number) => (
            <SubjectInfoCard
              key={index}
              title={title}
              description={content}
              isEditable
              isDeletable
            />
          ))}

          <AddItemCard
            title="add new information"
            onClick={action('Add info')}
            mt={[6, 6, 6, 8]}
            h={196}
          />
        </>
      )}
    </ContentWrapper>
  );
};
