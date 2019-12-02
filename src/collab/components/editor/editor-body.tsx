import { Flex } from '@chakra-ui/core';
import React, { FC } from 'react';

export const EditorBody: FC = () => {
  return (
    <Flex
      borderWidth={1}
      borderColor="grey.200"
      bg="#fff"
      width={['100%', '100%', '90%', '540px', '800px']}
      minHeight="80vh"
      m={[2, 6]}
      px={[2, 6]}
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
