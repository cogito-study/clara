import { Avatar, Flex, Link, Text } from '@chakra-ui/core';
import React, { FC } from 'react';

export type SubjectTeacherCardProps = {
  name: string;
  title?: string;
  email: string;
};

export const SubjectTeacherCard: FC<SubjectTeacherCardProps> = ({ name, title, email }) => (
  <Flex
    p={3}
    borderWidth="1px"
    borderColor="grey.100"
    maxW={['full', 'full', '340px']}
    align="center"
    bg="#fff"
  >
    <Avatar mr={3} name={name} size="md" />
    <Flex p={1} direction="column" width="full">
      <Text fontSize="md" fontWeight={500} lineHeight="base" color="blue.800">
        {name}
      </Text>
      <Text mt={1} fontSize="xs" color="grey.400" lineHeight="normal">
        {title}
      </Text>

      <Link
        cursor="pointer"
        mt={1}
        fontSize="sm"
        color="teal.700"
        lineHeight="normal"
        _hover={{ color: 'teal.800' }}
        _focus={{ color: 'teal.800' }}
        wordBreak="break-all"
        href={`mailto:${email}`}
      >
        {email}
      </Link>
    </Flex>
  </Flex>
);
