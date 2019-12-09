import { Box, Flex } from '@chakra-ui/core';
import Quill from 'quill';
import Delta from 'quill-delta';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Prompt, useParams } from 'react-router';
import { Editor, EditorHeader } from '../components/editor';
import { useNoteContentQuery } from '../components/editor/graphql/note-content-query.generated';
import { QuillEditor } from '../components/editor/quill-editor';
import { Suggestion } from '../components/suggestions/suggestion';
import { createEditModeQuill } from '../quills/quill';
import { CollabRouteParams } from '../utils/collab-route';
import './marks.css';

export const CollabPage = () => {
  const { t } = useTranslation('collab');
  const { noteID } = useParams<CollabRouteParams>();
  const [editor, setEditor] = useState<Quill | undefined>(undefined);
  const originalDocument = useRef<Delta>(new Delta());
  const [quillEditor, setQuillEditor] = useState<QuillEditor>();
  const [hasMySuggestion, setHasMySuggestion] = useState(false);

  const { data: noteContentData } = useNoteContentQuery({
    variables: { noteID },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (noteContentData?.note && editor) {
      originalDocument.current = new Delta(JSON.parse(noteContentData.note.content));
      setQuillEditor(new QuillEditor(editor, originalDocument));
    }
  }, [editor, noteContentData]);

  useEffect(() => {
    setHasMySuggestion(false);
    setEditor(createEditModeQuill());
  }, []);

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
    <Flex direction="column" bg="white" w="100%">
      <Prompt
        when={(quillEditor && quillEditor.hasMySuggestion()) || false}
        message={t('unsavedChanges')}
      />

      <>
        <EditorHeader
          subject={noteContentData?.note?.subject ?? { name: '', code: '' }}
          hasMySuggestion={hasMySuggestion}
        />
        <Flex direction="row" mt={[4, 4, 4, 12]} w="100%" justify="center">
          <Editor
            title={noteContentData?.note?.title ?? 'Title of the note'}
            quillEditor={quillEditor}
            hasMySuggestion={hasMySuggestion}
            original={originalDocument}
          />
          <Box display={['none', 'none', 'none', 'block']}>
            <Suggestion quillEditor={quillEditor} />
          </Box>
        </Flex>
      </>
    </Flex>
  );
};
