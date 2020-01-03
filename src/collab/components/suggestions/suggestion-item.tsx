import { Avatar, Box, Button, Collapse, Flex, Heading, Text } from '@chakra-ui/core';
import Delta from 'quill-delta';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { SuggestionPermissionType } from '../../../core/graphql/types.generated';
import { useDateFormatter, useErrorToast } from '../../../core/hooks';
import { QuillEditor } from '../../quills';
import { useApproveSuggestionMutation } from './graphql/suggestion-approve-mutation.generated';
import { useRejectSuggestionMutation } from './graphql/suggestion-reject-mutation.generated';
import { SuggestionData } from './suggestion-data';

export type SuggestionEventProps = {
  onSuggestionHovered: (id: string) => void;
  onSuggestionBlurred: (id: string) => void;
};

type Props = {
  suggestion: SuggestionData;
  quillEditor?: QuillEditor;
} & SuggestionEventProps;

const shouldTextCollapse = (delta: Delta): boolean => {
  const deltaLength = delta.ops.reduce((length, op) => {
    if (op.insert && typeof op.insert === 'string') {
      return length + op.insert.length;
    } else if (op.delete) {
      return length + op.delete;
    }

    return length;
  }, 0);

  return deltaLength > 90;
};

export const SuggestionItem: FC<Props> = ({
  suggestion,
  quillEditor,
  onSuggestionHovered,
  onSuggestionBlurred,
}) => {
  const { t } = useTranslation('collab');
  const { since } = useDateFormatter();
  const errorToast = useErrorToast();
  const [showOverflow, setShowOverflow] = useState(false);

  const { id, delta, createdAt, author, permissions } = suggestion;
  const original = quillEditor?.original.current;
  const hasRejectPermission = permissions.includes(SuggestionPermissionType.RejectSuggestion);
  const hasApprovePermission = permissions.includes(SuggestionPermissionType.ApproveSuggestion);

  const [approveSuggestion, { loading: approveSuggestionLoading }] = useApproveSuggestionMutation();
  const [rejectSuggestion, { loading: rejectSuggestionLoading }] = useRejectSuggestionMutation();
  const operationLoading = approveSuggestionLoading || rejectSuggestionLoading;

  const handleAcceptSuggestion = async () => {
    try {
      await approveSuggestion({ variables: { suggestionID: id } });
    } catch (error) {
      errorToast(error);
    }
  };

  const handleCancelSuggestion = async () => {
    try {
      await rejectSuggestion({ variables: { suggestionID: id } });
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <Flex
      direction="column"
      align="flex-start"
      borderWidth={1}
      borderColor="grey.300"
      bg="#fff"
      p={3}
      width="300px"
      onMouseEnter={() => onSuggestionHovered(id)}
      onMouseLeave={() => onSuggestionBlurred(id)}
    >
      <Flex align="center">
        <Avatar name={author} />
        <Flex direction="column" ml={4} justify="center">
          <Heading as="h4" size="sm" color="blue.800">
            {author}
          </Heading>
          <Text fontSize={14} pt={1} color="grey.600">
            {since(createdAt)}
          </Text>
        </Flex>
      </Flex>
      <Collapse startingHeight={100} isOpen={showOverflow} my={3} animateOpacity w="full">
        <PrettifiedSuggestionText delta={delta} original={original ?? new Delta()} />
      </Collapse>
      {shouldTextCollapse(delta) && (
        <Flex w="full" align="center" justify="center">
          <Button
            size="sm"
            variant="ghost"
            variantColor="blue"
            color="blue.800"
            boxShadow="-10px -15px 10px -8px #fff"
            borderRadius={0}
            mb={2}
            onClick={() => setShowOverflow(!showOverflow)}
          >
            {showOverflow ? <FiChevronUp color="teal.600" /> : <FiChevronDown />}
          </Button>
        </Flex>
      )}
      <Flex w="full" justifyContent="flex-end">
        {hasRejectPermission && (
          <Button
            size="sm"
            variant="outline"
            variantColor="red"
            borderRadius={0}
            mr={2}
            isLoading={rejectSuggestionLoading}
            isDisabled={operationLoading}
            onClick={handleCancelSuggestion}
          >
            {t('suggestion.cancel')}
          </Button>
        )}
        {hasApprovePermission && (
          <Button
            size="sm"
            variantColor="teal"
            color="blue.800"
            borderRadius={0}
            isLoading={approveSuggestionLoading}
            isDisabled={operationLoading}
            onClick={handleAcceptSuggestion}
          >
            {t('suggestion.accept')}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

type PrettifiedSuggestionTextProps = {
  delta: Delta;
  original: Delta;
};

const PrettifiedSuggestionText = ({ delta, original }: PrettifiedSuggestionTextProps) => {
  const { t } = useTranslation('collab');

  // TODO: Refactor
  const invertedDelta = delta.invert(original);
  const deletedParts: string[] = [];
  let currentPart = '';

  invertedDelta.ops.forEach((op) => {
    if (op.delete && currentPart) {
      deletedParts.unshift(currentPart);
      currentPart = '';
    } else if (op.retain && currentPart) {
      deletedParts.unshift(currentPart);
      currentPart = '';
    } else if (op.insert) {
      const insertedThing = op.insert;
      if (typeof insertedThing === 'string') {
        currentPart = currentPart + op.insert;
      } else {
        currentPart = 'IMAGE';
      }
    }
  });
  currentPart && deletedParts.unshift(currentPart);

  return (
    <>
      {delta.ops.map((op, index) => {
        if (op.insert) {
          return (
            <Box key={index} color="grey.800">
              <Text
                textTransform="uppercase"
                fontWeight="bold"
                fontSize={12}
                color="blue.800"
                mt={1}
              >
                {t('suggestion.insert')}
              </Text>
              {typeof op.insert === 'string' ? op.insert : 'IMAGE'}
            </Box>
          );
        }

        if (op.delete) {
          return (
            <Box key={index} color="grey.800">
              <Text
                textTransform="uppercase"
                fontWeight="bold"
                fontSize={12}
                color="red.600"
                mt={1}
              >
                {t('suggestion.delete')}
              </Text>
              {deletedParts.pop()}
            </Box>
          );
        }

        return null;
      })}
    </>
  );
};
