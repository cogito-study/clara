import { Avatar, Box, Flex, Heading, IconButton, Text, Textarea } from '@chakra-ui/core';
import React, { FC, FormEvent, useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import { MoreMenu } from '../../../subject/components/elements/more-menu';

export type FeedPostCommentCardProps = {
  author: {
    name: string;
    picture?: string;
  };
  timeSince: string;
  content: string;
  onCommentEdit?: () => void;
  onCommentDelete?: () => void;
};

export const FeedPostCommentCard: FC<FeedPostCommentCardProps> = ({
  author: { name, picture },
  content,
  timeSince,
  onCommentDelete,
  onCommentEdit,
}) => {
  const [value, setValue] = useState(content);
  const [isEditing, setIsEditing] = useState(false);
  const shouldShowMoreMenu = onCommentDelete !== undefined || onCommentEdit !== undefined;
  return (
    <Box bg="#FFFFFF" borderWidth={1} borderColor="grey.100" pl={[6, 4, 12]}>
      <Flex pt={4} align="center" justify="space-between">
        <Flex direction="row" align="center">
          <Avatar size="sm" name={name} src={picture} />
          <Heading
            lineHeight="normal"
            as="h3"
            color="blue.800"
            fontSize="md"
            fontStyle="normal"
            fontWeight={600}
            ml={4}
          >
            {name}
          </Heading>
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
                onClick={() => setIsEditing(false)}
              />
            </Flex>
          ) : (
            <Box mr={4}>
              <MoreMenu
                isEditable={onCommentEdit !== undefined}
                isDeletable={onCommentDelete !== undefined}
                onEdit={() => setIsEditing(!isEditing)}
                onDelete={onCommentDelete}
              />
            </Box>
          ))}
      </Flex>
      <Flex mt={2}>
        {isEditing ? (
          <Textarea
            focusBorderColor="blue.200"
            fontSize="sm"
            onChange={(event: FormEvent<HTMLInputElement>) => setValue(event.currentTarget.value)}
            borderRadius="none"
          >
            {value}
          </Textarea>
        ) : (
          <Text color="grey.800" pt={4} pr={[4, 4, 6]} fontSize="md">
            {value}
          </Text>
        )}
      </Flex>

      <Text color="grey.800" fontSize="xs" py={4}>
        {timeSince}
      </Text>
    </Box>
  );
};
