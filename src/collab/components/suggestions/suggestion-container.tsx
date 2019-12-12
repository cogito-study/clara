import { Flex } from '@chakra-ui/core';
import styled from '@emotion/styled-base';
import Delta from 'quill-delta';
import React, { FC } from 'react';
import { QuillEditor } from '../../quills';
import { SuggestionData } from './suggestion-data';
import { SuggestionEventProps, SuggestionItem } from './suggestion-item';

type Props = { suggestions: SuggestionData[]; quillEditor?: QuillEditor } & SuggestionEventProps;

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
    transform: translateX(-4rem);
    ~ * {
      transform: translateY(6rem);
    }
  }
`;

const getDeltaY = (delta: Delta, editor: QuillEditor | undefined) => {
  if (!editor) return 0;
  if (delta.ops[0] && delta.ops[0].retain) {
    const posInDocument = delta.ops[0].retain;
    const { top } = editor.quill.getBounds(posInDocument);
    return top;
  }
  return 0;
};

export const SuggestionsContainer: FC<Props> = ({ suggestions, quillEditor, ...rest }) => {
  const sortedSuggestions = [...suggestions].sort(
    (a, b) => getDeltaY(a.delta, quillEditor) - getDeltaY(b.delta, quillEditor),
  );
  const offsetTop = 130;
  const offsetBetween = 130;
  const positions = sortedSuggestions.map((s) => getDeltaY(s.delta, quillEditor) + offsetTop);

  // TODO: Refactor
  for (let i = 0; i < positions.length; i++) {
    const p = positions[i];
    if (i === 0) {
      positions[i] = p;
    } else if (p === positions[i - 1]) {
      positions[i] = p + offsetBetween;
    } else if (p < positions[i - 1] + offsetBetween) {
      positions[i] = positions[i - 1] + offsetBetween;
    } else {
      positions[i] = p;
    }
  }
  return (
    <>
      {sortedSuggestions.map((suggestion, idx) => (
        <SuggestionCard key={suggestion.id} position="absolute" top={positions[idx]}>
          <SuggestionItem suggestion={suggestion} {...rest} />
        </SuggestionCard>
      ))}
    </>
  );
};
