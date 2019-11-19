import { Flex } from '@chakra-ui/core';
import Quill from 'quill';
import Delta from 'quill-delta';
import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { CollabRouteParams } from '../../utils/collab-route';
import { useNoteContentQuery } from './graphql/note-content-query.generated';

export const Study: FC<{ editor: Quill | undefined }> = ({ editor }) => {
  const { noteID } = useParams<CollabRouteParams>();

  const { data: noteContentData } = useNoteContentQuery({ variables: { noteID } });

  useEffect(() => {
    if (noteContentData && noteContentData.note)
      editor && editor.setContents(new Delta(JSON.parse(noteContentData.note.content)));
  }, [editor, noteContentData]);

  return (
    <Flex
      borderWidth={1}
      borderColor="grey.200"
      width="768px"
      minHeight="80vh"
      m={5}
      px={6}
      py={10}
      borderRadius="none"
    >
      <Flex display="flex" flexGrow={1} className="study-mode-editor" style={{ border: 'none' }} />
    </Flex>
  );
};
