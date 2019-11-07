import { Flex } from '@chakra-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ContentWrapper } from '../../../core/components/layout/content-wrapper';
import { SubjectRouteParams } from '../../utils/subject-route';
import { useSubjectNotesQuery } from './graphql/subject-notes-query.generated';
import { SubjectNoteCard } from './subject-note-card';

export const SubjectNotes = () => {
  const { subjectCode } = useParams<SubjectRouteParams>();
  const { data } = useSubjectNotesQuery({ variables: { subjectCode } });

  return (
    <ContentWrapper>
      <Flex flexDirection="row" wrap="wrap" justify="flex-start" align="center">
        {data &&
          data.subject &&
          data.subject.notes &&
          data.subject.notes.map((note) => (
            <SubjectNoteCard key={note.id} {...note} mt={5} mx={5} />
          ))}
      </Flex>
    </ContentWrapper>
  );
};
