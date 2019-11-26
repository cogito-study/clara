import { Flex, Heading, PseudoBox, Text } from '@chakra-ui/core';
import { PseudoBoxProps } from '@chakra-ui/core/dist/PseudoBox/index';
import { formatDistance } from 'date-fns';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { collabRoute } from '../../../collab/utils/collab-route';

export type SubjectNoteCardProps = {
  id: string;
  title: string;
  number: number;
  updatedAt: Date;
  description?: string;
} & PseudoBoxProps;

export const SubjectNoteCard: FC<SubjectNoteCardProps> = ({
  id,
  title,
  updatedAt,
  number,
  description,
  children,
  ...rest
}) => (
  <PseudoBox
    cursor="pointer"
    p={3}
    bg="#fff"
    borderWidth={1}
    borderColor="grey.100"
    width={['100%', '100%', '300px']}
    transition="transform 0.2s"
    _hover={{ transition: 'transform 0.2s', transform: 'scale(1.02)', borderColor: 'blue.600' }}
    _focus={{ borderColor: 'teal.500' }}
    {...rest}
  >
    <Flex pos="relative" direction="column">
      <Link to={collabRoute({ path: 'notes', noteID: id })}>
        <Flex mt={1} height="40px" align="center">
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
        </Flex>
        <Text mt={2} fontSize="xs" color="grey.600" lineHeight="normal">
          {/* TODO: Localize */}
          Updated{' '}
          {formatDistance(new Date(updatedAt), new Date(), {
            addSuffix: true,
          })}
        </Text>
        <Text
          mt={3}
          fontSize="sm"
          color="grey.600"
          lineHeight="normal"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {description}
        </Text>
      </Link>

      {children}
    </Flex>
  </PseudoBox>
);

export const SubjectNoteCardFooter: FC = ({ children }) => (
  <Flex direction="row" justify="flex-end" mt={2}>
    {children}
  </Flex>
);
