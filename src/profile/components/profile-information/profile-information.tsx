import { Avatar, Flex, Heading, Text } from '@chakra-ui/core';
import React from 'react';
import { useAuth } from '../../../auth/hooks';

export const ProfileInformation = () => {
  const { user } = useAuth();

  return (
    <Flex borderWidth={1} p={[4, 4, 5]} borderColor="grey.100" align="center" bg="#fff">
      <Avatar mr={4} name={user && user.fullName} h={[12, 12, 16]} w={[12, 12, 16]} />
      <Flex p={1} direction="column" minW="220px">
        <Heading fontSize={['md', 'md', 'lg']} fontWeight="bold" lineHeight="base" color="blue.800">
          {user && user.fullName}
        </Heading>

        <Text mt={2} fontSize="sm" color="grey.800" lineHeight="normal">
          {user && user.email}
        </Text>
      </Flex>
    </Flex>
  );
};
