import Delta from 'quill-delta';
import React, { FC } from 'react';
import { QuillEditor } from '../../quills';
import { SuggestionData } from './suggestion-data';
import { SuggestionEventProps, SuggestionItem } from './suggestion-item';

type Props = {
  suggestions: SuggestionData[];
  quillEditor?: QuillEditor;
} & SuggestionEventProps;

const getDeltaY = (delta: Delta, editor: QuillEditor | undefined) => {
  if (!editor) return 0;
  if (delta?.ops[0]?.retain) {
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
        <SuggestionItem
          key={suggestion.id}
          suggestion={suggestion}
          {...rest}
          position={positions[idx]}
        />
      ))}
    </>
  );
};
