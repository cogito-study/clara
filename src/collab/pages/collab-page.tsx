import { Flex } from '@chakra-ui/core';
import Quill from 'quill';
import React, { useEffect, useState } from 'react';
import { Editor, EditorBody, EditorHeader, EditorMode } from '../components/editor';
import { Suggestion } from '../components/suggestions/suggestion';
import { createQuillEditor } from '../quills/quill';
import { createStudyModeEditor } from '../quills/quill-study';
import './marks.css';

export const CollabPage = () => {
  // const focusedSuggestion = useRef<string | undefined>(undefined);
  const [editor, setEditor] = useState<Quill | undefined>(undefined);
  const [editorMode, setEditorMode] = useState<EditorMode>('edit');

  useEffect(() => {
    setEditor(editorMode === 'edit' ? createQuillEditor() : createStudyModeEditor());
  }, [editorMode]);

  const handleSuggestionHovered = (id: string) => {
    console.log(`Suggestion hovered with ID = ${id}`);
    // if (editor.current) {
    //   const suggestion = suggestions.find((s) => s.id === id);
    //   if (suggestion) {
    //     focusedSuggestion.current = id;
    //     if (mySuggestion.current) {
    //       editor.current.updateContents(mySuggestion.current.invert(originalDocument.current));
    //       editor.current.updateContents(suggestion.delta);
    //     } else {
    //       editor.current.updateContents(suggestion.delta);
    //     }
    //   } else {
    //     console.error('Invalid suggestion hover!');
    //   }
    // }
  };

  const handleSuggestionBlurred = (id: string) => {
    console.log(`Suggestion blurred with ID = ${id}`);
    // if (editor.current) {
    //   const suggestion = suggestions.find((s) => s.id === id);
    //   if (suggestion) {
    //     focusedSuggestion.current = undefined;
    //     if (mySuggestion.current) {
    //       editor.current.updateContents(suggestion.inverseDelta(originalDocument.current));
    //       editor.current.updateContents(mySuggestion.current);
    //     } else {
    //       editor.current.updateContents(suggestion.inverseDelta(originalDocument.current));
    //     }
    //   } else {
    //     console.error('Invalid suggestion blur!');
    //   }
    // }
  };

  return (
    <Flex direction="column">
      <EditorHeader
        mode={editorMode}
        subject="Vascular surgery"
        handleEditorModeChange={setEditorMode}
      />
      {editorMode === 'study' ? (
        <Flex mt={12} justifyContent="center">
          <EditorBody mode="study" />
        </Flex>
      ) : (
        <Flex mt={12}>
          <Flex direction="row">
            <Editor editor={editor} />
            <Suggestion
              onSuggestionBlurred={handleSuggestionBlurred}
              onSuggestionHovered={handleSuggestionHovered}
            />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
