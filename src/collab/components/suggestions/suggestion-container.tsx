import { Flex } from '@chakra-ui/core';
import styled from '@emotion/styled-base';
import Delta from 'quill-delta';
import React, { FC } from 'react';
import { QuillEditor } from '../editor/quill-editor';
import { SuggestionData } from './suggestion-data';
import { SuggestionEventProps, SuggestionItem } from './suggestion-item';

type Props = { suggestions: SuggestionData[]; quillEditor?: QuillEditor } & SuggestionEventProps;

const SuggestionGrid = styled(Flex)``;
const SuggestionCard = styled(Flex)`
  z-index: 1;
  background-color: #fff;
  box-shadow: 3px -3px 12px 4px #0000000f;
  transition: 0.2s;
  &:not(:last-child) {
    margin-bottom: -5rem;
  }
  &:hover,
  &:focus-within {
    z-index: 999;
    transform: translateX(-4rem);
    ~ * {
      transform: translateY(6rem);
    }
  }
`;

const getDeltaY = (delta: Delta, editor: QuillEditor | undefined) => {
  if (!editor) return 0;
  if (delta.ops[0] && delta.ops[0]['retain']) {
    const posInDocument = delta.ops[0]['retain'];
    const { top } = editor.quill.getBounds(posInDocument);
    return top;
  }
  return 0;
};

export const SuggestionsContainer: FC<Props> = ({ suggestions, quillEditor, ...rest }) => {
  suggestions.sort((a, b) => {
    const aPos = getDeltaY(a.delta, quillEditor);
    const bPos = getDeltaY(b.delta, quillEditor);
    return aPos - bPos;
  });
  const offsetTop = 30;
  const offsetBetween = 130;
  const positions = suggestions.map((s) => {
    return getDeltaY(s.delta, quillEditor) + offsetTop;
  });
  for (let i = 0; i < positions.length; i++) {
    const p = positions[i];
    if (i === 0) {
      positions[i] = p;
    } else if (p === positions[i - 1]) {
      positions[i] = p + offsetBetween;
    } else if (p < positions[i - 1]) {
      positions[i] = positions[i - 1] + offsetBetween;
    } else {
      positions[i] = p;
    }
  }
  console.log(positions);
  return (
    <SuggestionGrid w="300px" my={8} direction="column" bg="white">
      {suggestions.map((suggestion, idx) => (
        <SuggestionCard key={suggestion.id} position="absolute" top={positions[idx]}>
          <SuggestionItem suggestion={suggestion} {...rest} />
        </SuggestionCard>
      ))}
    </SuggestionGrid>
  );
};
