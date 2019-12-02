import { Flex } from '@chakra-ui/core';
import styled from '@emotion/styled-base';
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
    transform: translateX(-4rem);
    ~ * {
      transform: translateY(6rem);
    }
  }
`;

export const SuggestionsContainer: FC<Props> = ({ suggestions, ...rest }) => {
  return (
    <SuggestionGrid my={8} direction="column" bg="white">
      {suggestions.map((suggestion) => (
        <SuggestionCard key={suggestion.id}>
          <SuggestionItem suggestion={suggestion} {...rest} />
        </SuggestionCard>
      ))}
    </SuggestionGrid>
  );
};
