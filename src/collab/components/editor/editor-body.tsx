import { Flex } from '@chakra-ui/core';
import React from 'react';

export const EditorBody = () => {
  return (
    <Flex
      border="1px"
      borderColor="gray.200"
      minWidth="60vw"
      minHeight="80vh"
      m={5}
      px={6}
      py={10}
      borderRadius="3px"
    >
      <Flex flexGrow={1} className="collab-quill-editor" style={{ border: 'none' }}></Flex>
    </Flex>
  );
};
