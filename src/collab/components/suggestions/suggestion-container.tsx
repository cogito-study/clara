import { Flex } from '@chakra-ui/core';
import Delta from 'quill-delta';
import React, { FC } from 'react';
import { SuggestionData } from '../index';
import { SuggestionItem } from './suggestion-item';

export interface SuggestionsContainerProps {
  suggestions: SuggestionData[];
  onSuggestionAccepted: (id: number) => void;
  onSuggestionCancelled: (id: number) => void;
}

export const SuggestionsContainer: FC<SuggestionsContainerProps> = ({
  suggestions,
  onSuggestionAccepted,
  onSuggestionCancelled,
}) => {
  return (
    <Flex my={8} direction="column">
      {suggestions.map((suggestion) => (
        <Flex m={5} key={suggestion.id}>
          <SuggestionItem
            textDelta={new Delta().compose(suggestion.value)}
            commenterName={suggestion.author}
            date={'10 minutes ago'}
            onSuggestionAccepted={() => onSuggestionAccepted(suggestion.id)}
            onSuggestionCancelled={() => onSuggestionCancelled(suggestion.id)}
          />
        </Flex>
      ))}
    </Flex>
  );
};

export default SuggestionsContainer;
