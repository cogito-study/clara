import React from 'react';
import { Flex, Heading } from '@chakra-ui/core';

export const ProfilePage = () => {
  return (
    <Flex bg="green.500">
      <Heading as="h1" fontSize="xl" color="white" p={5}>
        Profile
      </Heading>
    </Flex>
  );
};
