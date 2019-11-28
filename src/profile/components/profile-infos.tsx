import { Avatar, Flex, Heading, Text } from '@chakra-ui/core';
import React, { FC } from 'react';

export type SubjectTeacherCardProps = {
  name: string;
  email: string;
};

export const ProfileInfos: FC<SubjectTeacherCardProps> = ({ name, email }) => (
  <Flex borderWidth="1px" p={[4, 4, 5]} borderColor="grey.100" align="center" bg="#fff">
    <Avatar mr={4} name={name} size="md" display={['initial', 'initial', 'none']} />
    <Avatar mr={4} name={name} size="lg" display={['none', 'none', 'initial']} />
    <Flex p={1} direction="column" minW="220px">
      <Heading fontSize={['md', 'md', 'lg']} fontWeight="bold" lineHeight="base" color="blue.800">
        {name}
      </Heading>

      <Text mt={2} fontSize="sm" color="grey.800" lineHeight="normal">
        {email}
      </Text>
    </Flex>
  </Flex>
);
