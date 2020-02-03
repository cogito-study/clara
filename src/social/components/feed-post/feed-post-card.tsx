import { Avatar, Box, Button, Flex, Heading, IconButton, Text, Textarea } from '@chakra-ui/core';
import React, { FC, FormEvent, useState } from 'react';
import { FiCheck, FiMessageSquare, FiThumbsUp, FiX } from 'react-icons/fi';
import { useDateFormatter } from '../../../core/hooks';
import { MoreMenu } from '../../../subject/components/elements/more-menu';
import { FeedPostCommentCardProps } from '../feed-post-comment/feed-post-comment-card';
import { FeedPostCommentList } from '../feed-post-comment/feed-post-comment-list';
import { FeedPostFragment } from './graphql/feed-post-fragment.generated';

export type FeedPostData = FeedPostFragment & { subject?: { name: string } };

export type FeedPostCardProps = {
  feedPost: FeedPostData;
  feedPostComments?: FeedPostCommentCardProps[];
  isEditLoading: boolean;
  onPostLike: () => void;
  onPostDelete?: () => void;
  onPostEdit?: (content: string) => void;
};

export const FeedPostCard: FC<FeedPostCardProps> = ({
  feedPost: { author, content, likesCount, updatedAt, subject, hasLikedPost },
  isEditLoading,
  onPostDelete,
  onPostLike,
  onPostEdit,
  feedPostComments,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState(content);
  const [areCommentsShown, setAreCommentsShown] = useState(false);
  const { since } = useDateFormatter();

  const handleEditDone = () => {
    onPostEdit && onPostEdit(value);
    setIsEditing(!isEditing);
  };
  const shouldShowMoreMenu = onPostDelete !== undefined || onPostEdit !== undefined;
  return (
    <Flex direction="column">
      <Box
        p={4}
        borderWidth="1px"
        borderColor={areCommentsShown ? 'teal.500' : 'grey.100'}
        minW="300px"
        bg="#fff"
      >
        <Flex align="flex-start" justify="space-between">
          <Flex align="center">
            <Avatar mr={3} name={author.fullName} src={author.profilePictureURL} size="md" />
            <Flex p={1} direction="column" align="start">
              <Heading as="h3" fontSize="md" fontWeight={600} lineHeight="base" color="blue.800">
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
          {shouldShowMoreMenu &&
            (isEditing ? (
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
              <MoreMenu
                isEditable={onPostEdit !== undefined}
                isDeletable={onPostDelete !== undefined}
                onEdit={() => setIsEditing(!isEditing)}
                onDelete={onPostDelete}
              />
            ))}
        </Flex>
        <Flex mt={4}>
          {isEditing ? (
            <Textarea
              isDisabled={isEditLoading}
              focusBorderColor="blue.200"
              fontSize="sm"
              onChange={(event: FormEvent<HTMLInputElement>) => setValue(event.currentTarget.value)}
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
            {since(updatedAt)}
          </Text>
          <Flex align="center">
            {feedPostComments !== undefined && (
              <Button
                variant={areCommentsShown ? 'solid' : 'outline'}
                variantColor="teal"
                bg={areCommentsShown ? 'teal.100' : '#fff'}
                borderColor="teal.600"
                borderWidth={1}
                borderRadius="none"
                color="blue.800"
                minW="72px"
                rightIcon={FiMessageSquare}
                onClick={() => setAreCommentsShown(!areCommentsShown)}
                mr={2}
              >
                {feedPostComments?.length || 0}
              </Button>
            )}
            <Button
              variant={hasLikedPost ? 'solid' : 'outline'}
              variantColor="teal"
              bg="#FFFFFF"
              borderColor="teal.500"
              borderRadius="none"
              borderWidth={1}
              color="blue.800"
              minW="72px"
              rightIcon={FiThumbsUp}
              onClick={onPostLike}
            >
              {likesCount}
            </Button>
          </Flex>
        </Flex>
      </Box>
      {areCommentsShown && <FeedPostCommentList posts={feedPostComments} />}
    </Flex>
  );
};
