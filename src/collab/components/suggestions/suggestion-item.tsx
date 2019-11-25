import { Box, Button, Flex, Image, Text } from '@chakra-ui/core';
import Delta from 'quill-delta';
import React, { FC } from 'react';
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

// eslint-disable-next-line complexity
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
  const { id, delta, createdAt, author } = suggestion;
  const original = quillEditor && quillEditor.original.current;

  return (
    <Flex
      direction="column"
      border="2px solid #00CCAA"
      p={5}
      width="300px"
      height="250px"
      onMouseEnter={() => onSuggestionHovered(id)}
      onMouseLeave={() => onSuggestionBlurred(id)}
    >
      <Flex>
        <Image
          rounded="full"
          size="50px"
          src={`https://randomuser.me/api/portraits/med/women/${Math.floor(
            Math.random() * 100,
          )}.jpg`}
        />
        <Flex direction="column" ml={5}>
          <Text>{author}</Text>
          {/* TODO: date-fns */}
          <Text as="cite">{createdAt.toDateString()}</Text>
        </Flex>
      </Flex>
      <Box my={5}>{prettifySuggestion(delta, original || new Delta())}</Box>
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
