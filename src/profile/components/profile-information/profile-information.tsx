import { Avatar, Flex, Heading, Text } from '@chakra-ui/core';
import React from 'react';

type ProfileInformationProps = {
  fullName?: string;
  email?: string;
};

export const ProfileInformation = ({ email, fullName }: ProfileInformationProps) => {
  return (
    <Flex borderWidth={1} p={[4, 4, 5]} borderColor="grey.100" align="center" bg="#fff">
      <Avatar mr={3} name={fullName} h={[12, 12, 16]} w={[12, 12, 16]} />
      <Flex p={1} direction="column">
        <Heading
          fontSize={['md', 'md', 'lg']}
          wordBreak="break-all"
          fontWeight="bold"
          lineHeight="base"
          color="blue.800"
        >
          {fullName}
        </Heading>
        <Text mt={2} fontSize="sm" color="grey.800" lineHeight="normal">
          {email}
        </Text>
      </Flex>
    </Flex>
  );
};
