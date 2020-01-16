import { Flex } from '@chakra-ui/core';
import React, { FC, useState } from 'react';
import { useDebounce } from 'react-use';
import { QuillEditor } from '../../quills';
import {
  useActiveSuggestions,
  useSuggestionApprove,
  useSuggestionCreate,
  useSuggestionReject,
  useSuggestionUpdate,
} from './hooks';
import { SuggestionsContainer } from './suggestion-container';
import { SuggestionData } from './suggestion-data';
import { SuggestionPlaceholder } from './suggestion.placeholder';

export type SuggestionProps = {
  quillEditor?: QuillEditor;
};

export const Suggestion: FC<SuggestionProps> = ({ quillEditor }) => {
  const [suggestions, setSuggestions] = useState<SuggestionData[]>([]);

  const [debouncedSuggestions, setDebouncedSuggestions] = useState<SuggestionData[]>([]);
  useDebounce(() => setDebouncedSuggestions(suggestions), 200, [suggestions]);

  const { isLoading } = useActiveSuggestions({ setter: setSuggestions });
  useSuggestionCreate({ setter: setSuggestions });
  useSuggestionApprove({ setter: setSuggestions });
  useSuggestionUpdate({ setter: setSuggestions });
  useSuggestionReject({ setter: setSuggestions, quillEditor });

  const handleSuggestionHovered = (id: string) => {
    if (quillEditor) {
      const suggestion = suggestions.find((s) => s.id === id);
      suggestion && quillEditor.applyOtherSuggestion(suggestion);
    }
  };

  const handleSuggestionBlurred = () => {
    if (quillEditor) {
      quillEditor.discardOtherSuggestion();
    }
  };

  return (
    <Flex w="300px" my={8} direction="column" bg="white">
      {isLoading ? (
        <SuggestionPlaceholder mt={10} />
      ) : (
        <SuggestionsContainer
          quillEditor={quillEditor}
          suggestions={debouncedSuggestions}
          onSuggestionHovered={handleSuggestionHovered}
          onSuggestionBlurred={handleSuggestionBlurred}
        />
      )}
    </Flex>
  );
};
