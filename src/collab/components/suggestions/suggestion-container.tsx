import { Flex } from '@chakra-ui/core';
import React, { FC } from 'react';
import { QuillEditor } from '../editor/quill-editor';
import { SuggestionData } from './suggestion-data';
import { SuggestionEventProps, SuggestionItem } from './suggestion-item';

type Props = { suggestions: SuggestionData[]; quillEditor?: QuillEditor } & SuggestionEventProps;

export const SuggestionsContainer: FC<Props> = ({ suggestions, ...rest }) => {
  return (
    <Flex my={8} direction="column">
      {suggestions.map((suggestion) => (
        <Flex m={5} key={suggestion.id}>
          <SuggestionItem suggestion={suggestion} {...rest} />
        </Flex>
      ))}
    </Flex>
  );
};
