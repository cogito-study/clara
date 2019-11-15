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
import { FiMoreHorizontal, FiThumbsUp, FiX, FiCheck } from 'react-icons/fi';
import { FeedPostFragment } from './graphql/feed-post-fragment.generated';

export type FeedPostData = FeedPostFragment & { subject?: { name: string } };

export type FeedPostCardProps = {
  feedPost: FeedPostData;
  isOwnPost: boolean;
  hasLikedPost: boolean;
  onPostDelete: () => void;
  onPostLike: () => void;
  onPostEdit: (content: string) => void;
};

export const FeedPostCard: FC<FeedPostCardProps> = ({
  feedPost: { author, content, likesCount, updatedAt, subject },
  isOwnPost,
  hasLikedPost,
  onPostDelete,
  onPostLike,
  onPostEdit,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState(content);

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    setValue(inputValue);
  };

  const handleEditDone = () => {
    onPostEdit(value);
    setIsEditing(!isEditing);
  };

  return (
    <Box p={4} borderWidth="1px" borderColor="grey.100" minW="300px" maxW="800px" bg="#fff">
      <Flex align="flex-start" justify="space-between">
        <Flex align="center">
          <Avatar mr={4} name={author.fullName} src={author.profilePictureURL} size="lg" />
          <Flex p={1} direction="column" align="start">
            <Heading as="h3" fontSize="md" fontWeight={500} lineHeight="base" color="blue.800">
              {author.fullName}
            </Heading>
            <Text mt={1} fontSize="12px" color="grey.700" lineHeight="normal">
              {author.position}
            </Text>
            {subject && (
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
                {subject.name}
              </Text>
            )}
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
                icon={FiX}
                variant="ghost"
                borderRadius="none"
                variantColor="red"
                onClick={() => setIsEditing(false)}
              />
              <IconButton
                aria-label=""
                bg="transparent"
                size="lg"
                color="green.500"
                icon={FiCheck}
                variant="ghost"
                variantColor="green"
                borderRadius="none"
                onClick={handleEditDone}
              />
            </Flex>
          ) : (
            <Menu>
              <MenuButton>
                <IconButton
                  aria-label=""
                  bg="transparent"
                  size="lg"
                  variant="ghost"
                  variantColor="grey"
                  borderRadius="none"
                  icon={FiMoreHorizontal}
                />
              </MenuButton>
              <MenuList borderRadius="none">
                <MenuItem
                  color="blue.800"
                  fontWeight="semibold"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  edit
                </MenuItem>
                <MenuItem color="red.500" fontWeight="semibold" onClick={onPostDelete}>
                  delete
                </MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}
      </Flex>
      <Flex mt={4}>
        {isEditing && isOwnPost ? (
          <Textarea
            focusBorderColor="blue.200"
            fontSize="sm"
            onChange={handleInputChange}
            borderRadius="none"
          >
            {value}
          </Textarea>
        ) : (
          <Text color="grey.800">{value}</Text>
        )}
      </Flex>
      <Flex mt={3} direction="row" align="center" justify="space-between">
        <Text color="grey.700" fontSize="12px">
          {formatDistance(new Date(updatedAt), new Date(), {
            addSuffix: true,
          })}
        </Text>
        <Button
          variant={hasLikedPost ? 'solid' : 'outline'}
          variantColor="teal"
          borderColor="teal.500"
          borderRadius="none"
          color="blue.800"
          minW="72px"
          rightIcon={FiThumbsUp}
          onClick={onPostLike}
        >
          {likesCount}
        </Button>
      </Flex>
    </Box>
  );
};
