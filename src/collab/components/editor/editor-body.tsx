import { Flex } from '@chakra-ui/core';
import React, { FC } from 'react';

export const EditorBody: FC = () => {
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
      <Flex
        display="flex"
        flexGrow={1}
        className="collab-quill-editor"
        style={{ border: 'none' }}
      />
    </Flex>
  );
};
