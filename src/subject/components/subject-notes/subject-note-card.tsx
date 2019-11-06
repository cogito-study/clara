import { Flex, Heading, PseudoBox, Text } from '@chakra-ui/core';
import { PseudoBoxProps } from '@chakra-ui/core/dist/PseudoBox/index';
import { formatDistance } from 'date-fns';
import React, { FC } from 'react';

export type SubjectNoteCardProps = {
  title: string;
  number: number;
  updatedAt: Date;
  description: string | null;
} & PseudoBoxProps;

export const SubjectNoteCard: FC<SubjectNoteCardProps> = ({
  title,
  updatedAt,
  number,
  description,
  ...rest
}) => (
  <PseudoBox
    cursor="pointer"
    p={3}
    borderWidth="1px"
    borderColor="grey.100"
    width="300px"
    transition="transform 0.2s"
    _hover={{ transition: 'transform 0.2s', transform: 'scale(1.05)', borderColor: 'blue.600' }}
    _focus={{ borderColor: 'teal.500' }}
    {...rest}
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
        {number}
      </Text>
      <Heading
        fontSize="md"
        fontWeight={600}
        maxWidth="80%"
        color="blue.700"
        lineHeight="normal"
        zIndex={1}
      >
        {title}
      </Heading>
      <Text mt={1} fontSize="xs" color="grey.600" lineHeight="normal">
        {/* TODO: Localize */}
        Updated{' '}
        {formatDistance(new Date(updatedAt), new Date(), {
          addSuffix: true,
        })}
      </Text>
      <Text
        mt={2}
        fontSize="sm"
        color="grey.600"
        lineHeight="normal"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {description}
      </Text>
    </Flex>
  </PseudoBox>
);
