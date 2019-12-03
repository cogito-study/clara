import { Box, Flex, Icon } from '@chakra-ui/core';
import React, { FC } from 'react';
import background from '../assets/auth-bg.svg';

export const AuthLayout: FC = ({ children }) => {
  return (
    <Flex direction="column" h="100vh">
      <Flex bg="#fff" borderColor="blue.100" borderWidth={1} h={16} align="center" justify="center">
        <Icon color="blue.800" size="80px" name="cogito-with-text" />
      </Flex>
      <Flex
        bg="white"
        backgroundImage={`url(${background})`}
        backgroundPosition={['center left', 'center left', 'center']}
        backgroundRepeat="repeat"
        flex="1"
        align={['start', 'start', 'center']}
        justify="center"
        p={4}
      >
        <Box maxW={400} flex="1">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};
