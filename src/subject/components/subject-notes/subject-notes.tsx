import { Box, Flex } from '@chakra-ui/core';
import React from 'react';
import { SubjectIdentifierProps } from '../../pages/subject-page';
import { AddNoteCard } from './add-note-card';
import { useSubjectNotesQuery } from './graphql/subject-notes-query.generated';
import { SubjectNoteCard } from './subject-note-card';

export const SubjectNotes = ({ subjectCode }: SubjectIdentifierProps) => {
  const { data } = useSubjectNotesQuery({ variables: { subjectCode } });

  return (
    <Flex width="full" justify="center">
      <Box width={['full', '400px', '90%', '90%', '80%']} mx={[4, 'initial']} mt={[4, 4, 6]}>
        <Flex direction="row" wrap="wrap" justify={['center', 'center', 'start']}>
          {data &&
            data.subject &&
            data.subject.notes &&
            data.subject.notes.map((note) => (
              <SubjectNoteCard key={note.id} {...note} mt={5} mx={5} />
            ))}
          <AddNoteCard mt={5} mx={5} />
        </Flex>
      </Box>
    </Flex>
  );
};
