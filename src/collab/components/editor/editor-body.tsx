import { Flex } from '@chakra-ui/core';
import React, { FC } from 'react';
import { EditorMode } from './editor-header';

export const EditorBody: FC<{ mode: EditorMode }> = ({ mode }) => {
  return (
    <Flex
      border="1px"
      borderColor="gray.200"
      width="768px"
      minHeight="80vh"
      m={5}
      px={6}
      py={10}
      borderRadius="none"
    >
      <Flex
        display={mode === 'edit' ? 'none' : 'flex'}
        flexGrow={1}
        className="study-mode-editor"
        style={{ border: 'none' }}
      />
      <Flex
        display={mode === 'edit' ? 'flex' : 'none'}
        flexGrow={1}
        className="collab-quill-editor"
        style={{ border: 'none' }}
      />
    </Flex>
  );
};
