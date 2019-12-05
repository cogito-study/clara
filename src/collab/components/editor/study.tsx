import { Flex, Heading } from '@chakra-ui/core';
import Quill from 'quill';
import Delta from 'quill-delta';
import React, { FC, useEffect } from 'react';
import { NoteContentQuery } from './graphql/note-content-query.generated';

export const Study: FC<{
  editor: Quill | undefined;
  noteContentData: NoteContentQuery | undefined;
}> = ({ editor, noteContentData }) => {
  useEffect(() => {
    if (noteContentData?.note)
      editor && editor.setContents(new Delta(JSON.parse(noteContentData.note.content)));
  }, [editor, noteContentData]);

  return (
    <Flex direction="column" align="center" mt={16}>
      <Heading
        color="grey.900"
        w="100%"
        px={[2, 2, 10]}
        mb={2}
        textAlign="start"
        lineHeight="normal"
        fontSize={['lg', 'lg', 'xl']}
      >
        {noteContentData?.note?.title ?? ''}
      </Heading>
      <Flex
        borderWidth={1}
        borderColor="grey.200"
        bg="#fff"
        width={['100%', '100%', '90%', '90%', '800px']}
        maxW="800px"
        minHeight="80vh"
        m={[0, 0, 6]}
        px={[1, 1, 6]}
        py={10}
        borderRadius="none"
        flexGrow={1}
        className="study-mode-editor"
      />
    </Flex>
  );
};
