import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/core';

// TODO: Logo and pattern background
export const AuthLayout: FC = ({ children }) => {
  return (
    <Flex direction="column" h="100vh">
      <Flex bg="#fff" borderColor="blue.100" borderWidth={1} h={16} align="center" justify="center">
        Cogito
      </Flex>
      <Flex bg="red.200" flex="1" align={['start', 'start', 'center']} justify="center" p={4}>
        <Box maxW="400px" flex="1">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};
