import { Flex, Heading, PseudoBox, Text } from '@chakra-ui/core';
import { PseudoBoxProps } from '@chakra-ui/core/dist/PseudoBox/index';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { collabRoute } from '../../../collab/utils/collab-route';
import { useDateFormatter } from '../../../core/hooks/';
import { lineClamp } from '../../../core/style';
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
      bg="#fff"
      borderWidth={1}
      borderColor="grey.100"
      transition="transform 0.2s"
      _hover={{ transition: 'transform 0.25s', borderColor: 'blue.300' }}
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
          />
        )}
      </Flex>
      <Link to={collabRoute({ path: 'note-study', noteID: id })}>
        <Flex direction="column" p={3} height="100%">
          <Heading
            mt={1}
            fontSize="md"
            fontWeight={700}
            color="blue.700"
            lineHeight="normal"
            css={lineClamp(3)}
          >
            {title}
          </Heading>
          <Text mt={2} fontSize="xs" color="grey.800" lineHeight="normal">
            {t('notes.updatedAt', { since: since(updatedAt) })}
          </Text>
          <Text mt={2} fontSize="sm" color="grey.800" lineHeight="normal" css={lineClamp(3)}>
            {description}
          </Text>
        </Flex>
      </Link>
    </PseudoBox>
  );
};
