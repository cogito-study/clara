import { Box, Flex } from '@chakra-ui/core';
import Quill from 'quill';
import Delta from 'quill-delta';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Prompt, useParams } from 'react-router';
import { Head } from '../../core/components';
import { CollabPagePlaceholder } from '../components/common';
import { Editor, EditorHeader } from '../components/editor';
import { Suggestion } from '../components/suggestions';
import { SuggestionPlaceholder } from '../components/suggestions/suggestion.placeholder';
import { createEditModeQuill, QuillEditor } from '../quills/';
import { CollabRouteParams } from '../utils/collab-route';
import { useNoteContentQuery } from './graphql/note-content-query.generated';
import './marks.css';

export const EditorPage = () => {
  const { t } = useTranslation('collab');
  const { noteID } = useParams<CollabRouteParams>();
  const [editor, setEditor] = useState<Quill | undefined>(undefined);
  const originalDocument = useRef<Delta>(new Delta());
  const [quillEditor, setQuillEditor] = useState<QuillEditor>();
  const [hasMySuggestion, setHasMySuggestion] = useState(false);

  const { data, loading } = useNoteContentQuery({
    variables: { noteID },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data?.note && editor) {
      originalDocument.current = data.note.content
        ? new Delta(JSON.parse(data.note.content))
        : new Delta();
      setQuillEditor(new QuillEditor(editor, originalDocument));
    }
  }, [editor, data]);

  useEffect(() => {
    setHasMySuggestion(false);
    !loading && setEditor(createEditModeQuill());
  }, [loading]);

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
    <>
      <Head title={data?.note?.title} description={data?.note?.description} />
      <Flex direction="column" bg="white" w="100%">
        <Prompt when={quillEditor?.hasMySuggestion() ?? false} message={t('unsavedChanges')} />
        {!loading && (
          <EditorHeader
            subject={data?.note?.subject ?? { name: '', code: '' }}
            hasMySuggestion={hasMySuggestion}
          />
        )}
        <Flex direction="row" mt={[4, 4, 4, 12]} w="100%" justify="center">
          {loading ? (
            <CollabPagePlaceholder />
          ) : (
            <Suspense fallback={<CollabPagePlaceholder />}>
              <Editor
                title={data?.note?.title ?? 'Title of the note'}
                quillEditor={quillEditor}
                hasMySuggestion={hasMySuggestion}
                original={originalDocument}
              />
            </Suspense>
          )}
          <Box display={['none', 'none', 'none', 'block']}>
            <Suspense fallback={<SuggestionPlaceholder mt={10} />}>
              <Suggestion quillEditor={quillEditor} />
            </Suspense>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
