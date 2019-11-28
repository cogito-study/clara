import {
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  PseudoBox,
  Text,
} from '@chakra-ui/core';
import { PseudoBoxProps } from '@chakra-ui/core/dist/PseudoBox/index';
import { formatDistance } from 'date-fns';
import React, { FC } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { collabRoute } from '../../../collab/utils/collab-route';

export type SubjectNoteCardProps = {
  id: string;
  title: string;
  number: number;
  updatedAt: Date;
  description?: string;
  isEditable?: boolean;
} & PseudoBoxProps;

export const SubjectNoteCard: FC<SubjectNoteCardProps> = ({
  id,
  title,
  updatedAt,
  number,
  description,
  isEditable,
  children,
  ...rest
}) => (
  <PseudoBox
    cursor="pointer"
    bg="#fff"
    borderWidth={1}
    borderColor="grey.100"
    width={['100%', '100%', '300px']}
    transition="transform 0.2s"
    _hover={{ transition: 'transform 0.2s', transform: 'scale(1.02)', borderColor: 'blue.600' }}
    _focus={{ borderColor: 'teal.500' }}
    {...rest}
  >
    <Flex align="center" bg="blue.700" justify="space-between" px={3} py={isEditable ? 0 : 2}>
      <Text fontSize="lg" fontWeight={500} lineHeight="none" color="grey.100" right="1">
        {number}
      </Text>
      {isEditable && (
        <Menu>
          <MenuButton>
            <IconButton
              aria-label=""
              bg="transparent"
              size="lg"
              variant="ghost"
              color="teal.400"
              variantColor="blue.700"
              borderRadius="none"
              icon={FiMoreHorizontal}
            />
          </MenuButton>
          <MenuList borderRadius="none">
            <MenuItem color="blue.800" fontWeight="semibold" onClick={() => 'valami'}>
              edit
            </MenuItem>
            <MenuItem color="red.500" fontWeight="semibold">
              delete
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
    <Flex direction="column" p={3}>
      <Link to={collabRoute({ path: 'notes', noteID: id })}>
        <Flex mt={1} height="40px" align="center">
          <Heading
            fontSize="md"
            fontWeight={600}
            maxWidth="80%"
            color="blue.700"
            lineHeight="normal"
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
