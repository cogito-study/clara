import { Button, Flex } from '@chakra-ui/core';
import Delta from 'quill-delta';
import React, { FC, MutableRefObject, useEffect } from 'react';
import { useParams } from 'react-router';
import { CollabRouteParams } from '../../utils/collab-route';
import { useSuggestionApproveSubscription } from '../suggestions/graphql/suggestion-approve-subscription.generated';
import { EditorBody } from './editor-body';
import { useCreateSuggestionMutation } from './graphql/suggestion-create-mutation.generated';
import { QuillEditor } from './quill-editor';

export interface EditorProps {
  quillEditor?: QuillEditor;
  original: MutableRefObject<Delta>;
}

export const Editor: FC<EditorProps> = ({ quillEditor, original }) => {
  const { noteID } = useParams<CollabRouteParams>();

  const [createSuggestion] = useCreateSuggestionMutation();

  const { data: suggestionApproveData } = useSuggestionApproveSubscription({
    variables: { noteID: noteID || '' },
  });
  useEffect(() => {
    if (suggestionApproveData) {
      console.log('APPROVED_SUGGESTION', suggestionApproveData.approvedSuggestion);

      const delta = new Delta(JSON.parse(suggestionApproveData.approvedSuggestion.delta));
      if (quillEditor) {
        quillEditor.approveSuggestion(delta);
        original.current = original.current.compose(delta);
      }
    }
  }, [original, quillEditor, suggestionApproveData]);

  const publishSuggestion = (suggestion: Delta) => {
    console.log('sendPublishSuggestionToServer', suggestion);
    createSuggestion({ variables: { delta: JSON.stringify(suggestion), noteID: noteID || '' } });
  };

  // TODO: Refactor
  // const removeMark = (markedSuggestion: Delta) =>
  //   markedSuggestion &&
  //   markedSuggestion.ops.forEach((op) => {
  //     if (op.attributes && op.attributes.mark) delete op.attributes.mark;
  //   });

  const handleSuggesting = () => {
    if (quillEditor) {
      publishSuggestion(quillEditor.mySuggestion);
      quillEditor.publishSuggestion();
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
      <EditorBody />
    </Flex>
  );
};
