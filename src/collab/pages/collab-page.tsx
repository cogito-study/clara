import { Flex } from '@chakra-ui/core';
import Quill from 'quill';
import Delta from 'quill-delta';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Editor, EditorHeader, EditorMode } from '../components/editor';
import { useNoteContentQuery } from '../components/editor/graphql/note-content-query.generated';
import { QuillEditor } from '../components/editor/quill-editor';
import { Study } from '../components/editor/study';
import { Suggestion } from '../components/suggestions/suggestion';
import { createEditModeQuill } from '../quills/quill';
import { createStudyModeQuill } from '../quills/quill-study';
import { CollabRouteParams } from '../utils/collab-route';
import './marks.css';

export const CollabPage = () => {
  const { noteID } = useParams<CollabRouteParams>();
  const [editor, setEditor] = useState<Quill | undefined>(undefined);
  const originalDocument = useRef<Delta>(new Delta());
  const [quillEditor, setQuillEditor] = useState<QuillEditor>();
  const [editorMode, setEditorMode] = useState<EditorMode>('edit');

  const { data: noteContentData } = useNoteContentQuery({ variables: { noteID } });

  useEffect(() => {
    if (noteContentData && noteContentData.note && editor) {
      originalDocument.current = new Delta(JSON.parse(noteContentData.note.content));
      setQuillEditor(new QuillEditor(editor, originalDocument));
    }
  }, [editor, noteContentData]);

  useEffect(() => {
    setEditor(editorMode === 'edit' ? createEditModeQuill() : createStudyModeQuill());
  }, [editorMode]);

  return (
    <Flex direction="column">
      <EditorHeader
        mode={editorMode}
        subject="Vascular surgery"
        handleEditorModeChange={setEditorMode}
      />
      {editorMode === 'study' ? (
        <Flex mt={12} justifyContent="center">
          <Study editor={editor} />
        </Flex>
      ) : (
        <Flex mt={12}>
          <Flex direction="row">
            <Editor quillEditor={quillEditor} original={originalDocument} />
            <Suggestion quillEditor={quillEditor} />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
