import { Button, Flex } from '@chakra-ui/core';
import { Quill } from 'quill';
import Delta from 'quill-delta';
import React, { FC, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { CollabRouteParams } from '../../utils/collab-route';
import { useSuggestionApproveSubscription } from '../suggestions/graphql/suggestion-approve-subscription.generated';
import { useNoteContentQuery } from './graphql/note-content-query.generated';
import { useCreateSuggestionMutation } from './graphql/suggestion-create-mutation.generated';
import { EditorBody } from './editor-body';

export interface EditorProps {
  editor?: Quill;
}

export const Editor: FC<EditorProps> = ({ editor }) => {
  const { noteID } = useParams<CollabRouteParams>();
  const mySuggestion = useRef<Delta | undefined>(undefined);
  const originalDocument = useRef<Delta>(new Delta());

  const { data: noteContentData } = useNoteContentQuery({ variables: { noteID } });
  const [createSuggestion] = useCreateSuggestionMutation();

  useEffect(() => {
    if (editor) {
      editor.on('text-change', (delta, _, source) => {
        if (source === 'user') {
          mySuggestion.current = new Delta(mySuggestion.current).compose(delta);
        }
      });
    }
  }, [editor]);

  const { data: suggestionApproveData } = useSuggestionApproveSubscription({
    variables: { noteID: noteID || '' },
  });
  useEffect(() => {
    if (suggestionApproveData) {
      console.log('APPROVED_SUGGESTION', suggestionApproveData.approvedSuggestion);

      const delta = new Delta(JSON.parse(suggestionApproveData.approvedSuggestion.delta));
      if (editor) {
        if (mySuggestion.current) {
          const currentSelection = editor.getSelection();
          const inverseMySuggestion = mySuggestion.current.invert(originalDocument.current);
          editor.updateContents(inverseMySuggestion);

          mySuggestion.current = delta.transform(mySuggestion.current);
          originalDocument.current = originalDocument.current.compose(delta);
          editor.updateContents(delta);
          editor.updateContents(mySuggestion.current);
          currentSelection && editor.setSelection(currentSelection);
        } else {
          originalDocument.current = originalDocument.current.compose(delta);
          editor.updateContents(delta);
        }
      }
    }
  }, [editor, suggestionApproveData]);

  useEffect(() => {
    if (noteContentData && noteContentData.note && editor) {
      const { content } = noteContentData.note;
      originalDocument.current = new Delta(JSON.parse(content));
      editor.setContents(originalDocument.current);
    }
  }, [editor, noteContentData]);

  const publishSuggestion = (suggestion: Delta) => {
    console.log('sendPublishSuggestionToServer', suggestion);
    createSuggestion({ variables: { delta: JSON.stringify(suggestion), noteID: noteID || '' } });
  };

  // TODO: Refactor
  const removeMark = (markedSuggestion: Delta) =>
    markedSuggestion &&
    markedSuggestion.ops.forEach((op) => {
      if (op.attributes && op.attributes.mark) delete op.attributes.mark;
    });

  const handleSuggesting = () => {
    if (mySuggestion.current) {
      editor && editor.updateContents(mySuggestion.current.invert(originalDocument.current));

      removeMark(mySuggestion.current);
      publishSuggestion(mySuggestion.current);
      mySuggestion.current = undefined;
    }
  };

  return (
    <Flex direction="column">
      <Button
        backgroundColor="blue.700"
        color="white"
        m={5}
        width="200px"
        onClick={handleSuggesting}
      >
        {/* TODO: Localize */}
        SUGGEST
      </Button>

      <EditorBody mode="edit" />
    </Flex>
  );
};
