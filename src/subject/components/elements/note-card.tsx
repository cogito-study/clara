import { Flex, Heading, PseudoBox, Text } from '@chakra-ui/core';
import React, { FC } from 'react';

export type NoteCardProps = {
  title: string;
  order?: number;
  updation: string;
  description?: string;
};

export const NoteCard: FC<NoteCardProps> = ({ title, updation, order, description }) => (
  <PseudoBox
    cursor="pointer"
    p={3}
    borderWidth="1px"
    borderColor="grey.100"
    width="300px"
    transition="transform 0.2s"
    _hover={{ transition: 'transform 0.2s', transform: 'scale(1.05)', borderColor: 'blue.600' }}
    _focus={{ borderColor: 'teal.500' }}
  >
    <Flex pos="relative" direction="column">
      <Text
        fontSize="2xl"
        fontWeight={500}
        pos="absolute"
        lineHeight="none"
        color="grey.100"
        zIndex={0}
        right="1"
      >
        {order}
      </Text>
      <Heading fontSize="md" fontWeight={600} maxWidth="80%" color="blue.700" lineHeight="normal">
        {title}
      </Heading>
      <Text mt={1} fontSize="xs" color="grey.600" lineHeight="normal">
        {updation}
      </Text>
      <Text mt={2} fontSize="sm" color="grey.600" lineHeight="normal">
        {description}
      </Text>
    </Flex>
  </PseudoBox>
);
