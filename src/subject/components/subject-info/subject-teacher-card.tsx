import { Avatar, Flex, Link, Text } from '@chakra-ui/core';
import React, { FC } from 'react';

export type TeacherCardProps = {
  name: string;
  title?: string;
  email: string;
};

export const TeacherCard: FC<TeacherCardProps> = ({ name, title, email }) => (
  <Flex p={4} borderWidth="1px" borderColor="grey.100" maxW="450px" align="center">
    <Avatar mr={4} name={name} size="lg" />
    <Flex p={1} direction="column" minW="280px">
      <Text fontSize="md" fontWeight={500} lineHeight="base" color="blue.800">
        {name}
      </Text>
      <Text mt={1} fontSize="xs" color="grey.400" lineHeight="normal">
        {title}
      </Text>

      <Link
        cursor="pointer"
        mt={2}
        fontSize="sm"
        color="teal.700"
        lineHeight="normal"
        _hover={{ color: 'teal.800' }}
        _focus={{ color: 'teal.800' }}
        href={`mailto:${email}`}
      >
        {email}
      </Link>
    </Flex>
  </Flex>
);
