import { Flex } from '@chakra-ui/core';
import React, { FC } from 'react';
import { SuggestionData } from './suggestion-data';
import { SuggestionItem, SuggestionEventProps } from './suggestion-item';

type Props = { suggestions: SuggestionData[] } & SuggestionEventProps;

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

export default SuggestionsContainer;
