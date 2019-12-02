import { Avatar, Box, Button, Collapse, Flex, Text } from '@chakra-ui/core';
import Delta from 'quill-delta';
import React, { FC, useState } from 'react';
import { FiMinus, FiMoreHorizontal } from 'react-icons/fi';
import { useDateFormatter } from '../../../core/hooks/use-date-formatter';
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

type Props = { suggestion: SuggestionData; quillEditor?: QuillEditor } & SuggestionEventProps;

const prettifySuggestion = (delta: Delta, original: Delta) => {
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
          // TODO Fix
          // Localize
          return <Text>INSERT: {typeof op.insert === 'string' ? op.insert : 'IMAGE'}</Text>;
        } else if (op['delete']) {
          // Localize
          return <Text>DELETE: {deletedParts.pop()}</Text>;
        } else {
          return null;
        }
      })}
    </Box>
  );
};

export const SuggestionItem: FC<Props> = ({
  suggestion,
  onSuggestionAccepted,
  onSuggestionCancelled,
  onSuggestionHovered,
  onSuggestionBlurred,
  quillEditor,
}) => {
  const { since } = useDateFormatter();
  const [showOverflow, setShowOverflow] = useState(false);

  const { id, delta, createdAt, author } = suggestion;
  const original = quillEditor && quillEditor.original.current;

  return (
    <Flex
      direction="column"
      border="2px solid #00CCAA"
      p={5}
      width="300px"
      height={showOverflow ? 'auto' : '250px'}
      onMouseEnter={() => onSuggestionHovered(id)}
      onMouseLeave={() => onSuggestionBlurred(id)}
    >
      <Flex>
        <Avatar name={author} size="md" />
        <Flex direction="column" ml={5}>
          <Text>{author}</Text>
          <Text as="cite">{since(createdAt)}</Text>
        </Flex>
      </Flex>
      <Collapse startingHeight={50} isOpen={showOverflow} my={5} animateOpacity>
        {prettifySuggestion(delta, original || new Delta())}
      </Collapse>
      <Button size="sm" onClick={() => setShowOverflow(!showOverflow)} width="40px" m={2}>
        {showOverflow ? <FiMinus /> : <FiMoreHorizontal />}
      </Button>
      <Flex justifyContent="space-around">
        <Button variantColor="teal" variant="outline" onClick={() => onSuggestionCancelled(id)}>
          {/* TODO: Localize */}
          Cancel
        </Button>
        <Button variantColor="teal" onClick={() => onSuggestionAccepted(id)}>
          {/* TODO: Localize */}
          Accept
        </Button>
      </Flex>
    </Flex>
  );
};
