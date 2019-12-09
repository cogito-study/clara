import { Flex, Heading, IconButton, PseudoBox, Text } from '@chakra-ui/core';
import { PseudoBoxProps } from '@chakra-ui/core/dist/PseudoBox/index';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { collabRoute } from '../../../collab/utils/collab-route';
import { useDateFormatter } from '../../../core/hooks/use-date-formatter';
import { MoreMenu } from '../elements/more-menu';

export type SubjectNoteCardProps = {
  id: string;
  title: string;
  number: number;
  updatedAt: Date;
  description?: string;
  isEditable?: boolean;
  isDeletable?: boolean;
  onNoteEdit?: () => void;
  onNoteDelete?: () => void;
} & PseudoBoxProps;

export const SubjectNoteCard: FC<SubjectNoteCardProps> = ({
  id,
  title,
  updatedAt,
  number,
  description,
  isEditable,
  isDeletable,
  onNoteEdit,
  onNoteDelete,
  ...rest
}) => {
  const { t } = useTranslation('subject');
  const { since } = useDateFormatter();
  const shouldShowMoreButton = isEditable || isDeletable;

  return (
    <PseudoBox
      cursor="pointer"
      bg="#fff"
      borderWidth={1}
      borderColor="grey.100"
      transition="transform 0.2s"
      _hover={{ transition: 'transform 0.25s', transform: 'scale(1.02)', borderColor: 'blue.100' }}
      _focus={{ borderColor: 'teal.500' }}
      {...rest}
    >
      <Flex
        align="center"
        justify="space-between"
        pl={3}
        pr={0}
        py={shouldShowMoreButton ? 0 : 2}
        borderBottom="1px"
        borderColor="blue.100"
      >
        <Text fontSize="md" fontWeight={800} lineHeight="none" color="blue.200" right="1">
          {number}
        </Text>
        {shouldShowMoreButton && (
          <MoreMenu
            isEditable={isEditable}
            isDeletable={isDeletable}
            onEdit={onNoteEdit}
            onDelete={onNoteDelete}
            trigger={
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
            }
          />
        )}
      </Flex>
      <Flex direction="column" p={3}>
        <Link to={collabRoute({ path: 'note-study', noteID: id })}>
          <Flex mt={1} height="38px" align="center">
            <Heading
              fontSize="md"
              fontWeight={700}
              maxWidth="80%"
              color="blue.700"
              lineHeight="normal"
            >
              {title}
            </Heading>
          </Flex>
          <Text mt={2} fontSize="xs" color="grey.800" lineHeight="normal">
            {t('notes.updatedAt', { since: since(updatedAt) })}
          </Text>
          <Text
            mt={2}
            fontSize="sm"
            color="grey.800"
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
      </Flex>
    </PseudoBox>
  );
};
