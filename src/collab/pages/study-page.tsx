import { Flex } from '@chakra-ui/core';
import Quill from 'quill';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDocumentTitle } from '../../core/hooks';
import { useNoteContentQuery } from '../components/editor/graphql/note-content-query.generated';
import { Study } from '../components/editor/study';
import { StudyHeader } from '../components/editor/study-header';
import { createStudyModeQuill } from '../quills/quill-study';
import { CollabRouteParams } from '../utils/collab-route';
import './marks.css';

export const StudyPage: React.FC = () => {
  const { noteID } = useParams<CollabRouteParams>();
  const [editor, setEditor] = useState<Quill | undefined>(undefined);

  const { data: noteContentData } = useNoteContentQuery({
    variables: { noteID },
    fetchPolicy: 'cache-and-network',
  });

  useDocumentTitle(noteContentData?.note?.title);

  useEffect(() => {
    setEditor(createStudyModeQuill());
  }, []);

  return (
    <Flex bg="white">
      <StudyHeader subject={noteContentData?.note?.subject ?? { name: '', code: '' }} />
      <Flex direction="column" mt={[4, 4, 4, 12]} align="center" w="100%">
        <Study editor={editor} noteContentData={noteContentData} />
      </Flex>
    </Flex>
  );
};
