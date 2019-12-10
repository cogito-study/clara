import { Avatar, Box, Button, Collapse, Flex, Heading, Text } from '@chakra-ui/core';
import Delta from 'quill-delta';
import React, { FC, Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useDateFormatter } from '../../../core/hooks';
import { QuillEditor } from '../editor/quill-editor';
import { SuggestionData } from './suggestion-data';

export type SuggestionFocusHoverEventProps = {
  onSuggestionHovered: (id: string) => void;
  onSuggestionBlurred: (id: string) => void;
};

export type SuggestionAcceptCancelEventProps = {
  onSuggestionAccepted: (id: string) => void;
  onSuggestionCancelled: (id: string) => void;
};

export type SuggestionEventProps = SuggestionAcceptCancelEventProps &
  SuggestionFocusHoverEventProps;

type Props = {
  suggestion: SuggestionData;
  quillEditor?: QuillEditor;
} & SuggestionEventProps;

const prettifySuggestion = (delta: Delta, original: Delta) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation('collab');
  const invertedDelta = delta.invert(original);
  const deletedParts: string[] = [];
  let currentPart = '';
  invertedDelta.ops.forEach((op) => {
    if (op['delete'] && currentPart) {
      deletedParts.unshift(currentPart);
      currentPart = '';
    } else if (op['retain'] && currentPart) {
      deletedParts.unshift(currentPart);
      currentPart = '';
    } else if (op['insert']) {
      const insertedThing = op['insert'];
      if (typeof insertedThing === 'string') {
        currentPart = currentPart + op['insert'];
      } else {
        currentPart = 'IMAGE';
      }
    }
  });
  currentPart && deletedParts.unshift(currentPart);
  return (
    <Box>
      {delta.ops.map((op) => {
        if (op['insert']) {
          return (
            <Text>
              <Text fontWeight={700} color="blue.800">
                {t('suggestion.insert')}
              </Text>
              {typeof op.insert === 'string' ? op.insert : 'IMAGE'}
            </Text>
          );
        } else if (op['delete']) {
          return (
            <Text>
              <Text fontWeight={700} color="red.600">
                {t('suggestion.delete')}
              </Text>
              {deletedParts.pop()}
            </Text>
          );
        } else {
          return null;
        }
      })}
    </Box>
  );
};

const getDeltaLength = (delta: Delta) => {
  let length = 0;
  delta.ops.forEach((op) => {
    if (op['insert'] && typeof op['insert'] === 'string') {
      length += op['insert'].length;
    } else if (op['delete']) {
      length += op['delete'];
    }
  });
  return length;
};

export const SuggestionItem: FC<Props> = ({
  suggestion,
  onSuggestionAccepted,
  onSuggestionCancelled,
  onSuggestionHovered,
  onSuggestionBlurred,
  quillEditor,
}) => {
  const { t } = useTranslation('collab');

  const { since } = useDateFormatter();
  const [showOverflow, setShowOverflow] = useState(false);

  const { id, delta, createdAt, author } = suggestion;
  const original = quillEditor?.original.current;

  return (
    <Flex
      direction="column"
      borderWidth={1}
      borderColor="grey.300"
      bg="#fff"
      p={3}
      width="300px"
      onMouseEnter={() => onSuggestionHovered(id)}
      onMouseLeave={() => onSuggestionBlurred(id)}
    >
      <Flex>
        <Avatar name={author} />
        <Flex direction="column" ml={4} my={2}>
          <Heading as="h4" size="sm" color="blue.800">
            {author}
          </Heading>
          <Text fontSize={14}>{since(createdAt)}</Text>
        </Flex>
      </Flex>
      <Collapse startingHeight={100} isOpen={showOverflow} my={3} animateOpacity>
        {prettifySuggestion(delta, original || new Delta())}
      </Collapse>
      {getDeltaLength(delta) > 90 ? (
        <Button
          size="md"
          variant="ghost"
          outline="none"
          boxShadow="-10px -15px 10px -8px #fff"
          borderRadius={0}
          mb={2}
          onClick={() => setShowOverflow(!showOverflow)}
        >
          {showOverflow ? <FiChevronUp color="teal.600" /> : <FiChevronDown />}
        </Button>
      ) : (
        <Fragment />
      )}
      <Flex justifyContent="flex-end">
        <Button
          variantColor="blue"
          color="blue.800"
          variant="outline"
          borderRadius={0}
          mr={2}
          onClick={() => onSuggestionCancelled(id)}
        >
          {t('suggestion.cancel')}
        </Button>
        <Button
          variantColor="teal"
          color="blue.800"
          borderRadius={0}
          onClick={() => onSuggestionAccepted(id)}
        >
          {t('suggestion.accept')}
        </Button>
      </Flex>
    </Flex>
  );
};
