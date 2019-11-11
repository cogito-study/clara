import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Textarea,
} from '@chakra-ui/core';
import { formatDistance } from 'date-fns';
import React, { FC, FormEvent, useState } from 'react';
import { FiMoreHorizontal, FiThumbsUp } from 'react-icons/fi';

export type PostCardProps = {
  name: string;
  title?: string;
  subject?: string;
  content: string;
  likeCount: number;
  isOwnPost: boolean;
  updatedAt: Date;
};

export const PostCard: FC<PostCardProps> = ({
  name,
  title,
  subject,
  content,
  likeCount,
  updatedAt,
  isOwnPost,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState(content);

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    setValue(inputValue);
  };

  return (
    <Box p={4} borderWidth="1px" borderColor="grey.100" minW="300px" maxW="800px">
      <Flex align="flex-start" justify="space-between">
        <Flex align="center">
          <Avatar mr={4} name={name} size="lg" />
          <Flex p={1} direction="column" align="start">
            <Heading as="h3" fontSize="md" fontWeight={500} lineHeight="base" color="blue.800">
              {name}
            </Heading>
            <Text mt={1} fontSize="12px" color="grey.700" lineHeight="normal">
              {title}
            </Text>
            <Text
              mt={3}
              py={1}
              px={2}
              textAlign="center"
              color="blue.800"
              fontSize="xs"
              lineHeight="normal"
              bg="blue.100"
            >
              {subject}
            </Text>
          </Flex>
        </Flex>
        {isOwnPost ? (
          isEditing ? (
            <Flex align="center">
              <IconButton
                aria-label=""
                bg="transparent"
                size="lg"
                color="red.500"
                icon="close"
                _hover={{ bg: 'red.100' }}
                _active={{ bg: 'red.300' }}
                onClick={() => setIsEditing(!isEditing)}
              />
              <IconButton
                aria-label=""
                bg="transparent"
                size="lg"
                color="green.500"
                icon="check"
                _hover={{ bg: 'green.100' }}
                _active={{ bg: 'green.300' }}
                onClick={() => setIsEditing(!isEditing)}
              />
            </Flex>
          ) : (
            <Menu>
              <MenuButton>
                <IconButton
                  aria-label=""
                  bg="transparent"
                  size="lg"
                  color="grey.600"
                  borderRadius={2}
                  icon={FiMoreHorizontal}
                  _hover={{ bg: 'teal.500' }}
                  _active={{ bg: 'blue.600' }}
                />
              </MenuButton>
              <MenuList>
                <MenuItem
                  color="blue.800"
                  fontWeight="semibold"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  edit
                </MenuItem>
                <MenuItem color="red.500" fontWeight="semibold">
                  delete
                </MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}
      </Flex>
      <Flex mt={4}>
        {isEditing && isOwnPost ? (
          <Textarea focusBorderColor="blue.200" onChange={handleInputChange} borderRadius="none">
            {value}
          </Textarea>
        ) : (
          <Text color="grey.800" fontSize="md">
            {value}
          </Text>
        )}
      </Flex>
      <Flex mt={3} direction="row" align="center" justify="space-between">
        <Text color="grey.700" fontSize="xs">
          {formatDistance(new Date(updatedAt), new Date(), {
            addSuffix: true,
          })}
        </Text>
        <Button
          variantColor="grey.700"
          variant="outline"
          borderColor="grey.100"
          borderRadius={2}
          rightIcon={FiThumbsUp}
          _hover={{ bg: 'teal.500', borderColor: 'teal.600', color: 'grey.800' }}
          _active={{ bg: 'blue.600', borderColor: 'blue.300', color: 'white' }}
        >
          {likeCount}
        </Button>
      </Flex>
    </Box>
  );
};
