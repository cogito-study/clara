import { SimpleGrid } from '@chakra-ui/core';
import React from 'react';
import { SubjectIdentifierProps } from '../../pages/subject-page';
import { AddNoteCard } from './add-note-card';
import { useSubjectNoteListQuery } from './graphql/subject-note-list-query.generated';
import { SubjectNoteCard } from './subject-note-card';
import { SubjectNotePlaceholder } from './subject-note.placeholder';

export const SubjectNoteList = ({ subjectCode }: SubjectIdentifierProps) => {
  const { data, loading } = useSubjectNoteListQuery({ variables: { subjectCode } });

  return (
    <>
      <SimpleGrid
        spacing={6}
        minChildWidth={300}
        mx={[4, 4, 8, 16, 'auto']}
        mt={[6, 6, 10]}
        w={[null, null, null, null, 948]}
      >
        {loading ? (
          Array.from({ length: 9 }).map((_, index) => <SubjectNotePlaceholder key={index} />)
        ) : (
          <>
            {data &&
              data.subject &&
              data.subject.notes &&
              data.subject.notes.map((note) => <SubjectNoteCard key={note.id} {...note} />)}
            <AddNoteCard onClick={() => console.log('clicked on add')} />
          </>
        )}
      </SimpleGrid>
    </>
  );
};
