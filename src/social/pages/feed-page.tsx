import React from 'react';
import { Flex, Heading } from '@chakra-ui/core';

export const FeedPage = () => {
  return (
    <Flex bg="red.600">
      <Heading as="h1" fontSize="xl" color="white" p={5}>
        Feed
      </Heading>
    </Flex>
  );
};
