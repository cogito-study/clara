import { Flex } from '@chakra-ui/core';
import React, { FC } from 'react';

export const EditorBody: FC = () => {
  return (
    <Flex
      borderWidth={1}
      borderColor="grey.200"
      bg="#fff"
      width={['100%', '100%', '90%', '90%', '800px']}
      maxW="800px"
      minHeight="80vh"
      m={[0, 0, 6]}
      px={[1, 1, 6]}
      py={[3, 3, 10]}
      borderRadius="none"
    >
      <Flex display="flex" w="100%" className="collab-quill-editor" style={{ border: 'none' }} />
    </Flex>
  );
};
