import { Box, Flex } from '@chakra-ui/core';
import Quill from 'quill';
import Delta from 'quill-delta';
import React, { useEffect, useRef, useState } from 'react';
import { Prompt, useParams } from 'react-router';
import { Editor, EditorHeader } from '../components/editor';
import { useNoteContentQuery } from '../components/editor/graphql/note-content-query.generated';
import { QuillEditor } from '../components/editor/quill-editor';
import { Study } from '../components/editor/study';
import { StudyHeader } from '../components/editor/study-header';
import { Suggestion } from '../components/suggestions/suggestion';
import { createEditModeQuill } from '../quills/quill';
import { createStudyModeQuill } from '../quills/quill-study';
import { CollabRouteParams } from '../utils/collab-route';
import './marks.css';

export type EditorMode = 'edit' | 'study';

export const CollabPage = () => {
  const { noteID } = useParams<CollabRouteParams>();
  const [editor, setEditor] = useState<Quill | undefined>(undefined);
  const originalDocument = useRef<Delta>(new Delta());
  const [quillEditor, setQuillEditor] = useState<QuillEditor>();
  const [editorMode, setEditorMode] = useState<EditorMode>('study');
  const [hasMySuggestion, setHasMySuggestion] = useState(false);

  const { data: noteContentData } = useNoteContentQuery({ variables: { noteID } });

  useEffect(() => {
    if (noteContentData?.note && editor) {
      originalDocument.current = new Delta(JSON.parse(noteContentData.note.content));
      setQuillEditor(new QuillEditor(editor, originalDocument));
    }
  }, [editor, noteContentData]);

  useEffect(() => {
    setHasMySuggestion(false);
    setEditor(editorMode === 'edit' ? createEditModeQuill() : createStudyModeQuill());
  }, [editorMode]);

  useEffect(() => {
    if (quillEditor && quillEditor.hasMySuggestion()) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = null;
    }
  }, [hasMySuggestion, quillEditor]);

  quillEditor &&
    quillEditor.onStateChanged(() => setHasMySuggestion(quillEditor.hasMySuggestion()));

  return (
    <Flex direction="column" bg="white">
      <Prompt
        when={(quillEditor && quillEditor.hasMySuggestion()) || false}
        message="You have unsaved changes, are you sure you want to leave?"
      />
      {editorMode === 'study' ? (
        <>
          <StudyHeader
            subject={noteContentData?.note?.subject ?? { name: '', code: '' }}
            handleEditorModeChange={setEditorMode}
          />
          <Flex mt={12} justifyContent="center">
            <Study editor={editor} />
          </Flex>
        </>
      ) : (
        <>
          <EditorHeader
            subject={noteContentData?.note?.subject ?? { name: '', code: '' }}
            handleEditorModeChange={setEditorMode}
          />
          <Flex mt={[4, 4, 4, 12]} justify="center">
            <Flex direction="row">
              <Editor
                quillEditor={quillEditor}
                hasMySuggestion={hasMySuggestion}
                original={originalDocument}
              />
              <Box display={['none', 'none', 'none', 'block']}>
                <Suggestion quillEditor={quillEditor} />
              </Box>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};
