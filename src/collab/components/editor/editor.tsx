import { Button, Flex } from '@chakra-ui/core';
import Delta from 'quill-delta';
import React, { FC, MutableRefObject, useEffect } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { useParams } from 'react-router';
import { CollabRouteParams } from '../../utils/collab-route';
import { useSuggestionApproveSubscription } from '../suggestions/graphql/suggestion-approve-subscription.generated';
import { EditorBody } from './editor-body';
import { useCreateSuggestionMutation } from './graphql/suggestion-create-mutation.generated';
import { QuillEditor } from './quill-editor';

export interface EditorProps {
  quillEditor?: QuillEditor;
  original: MutableRefObject<Delta>;
  hasMySuggestion: boolean;
}

export const Editor: FC<EditorProps> = ({ quillEditor, original, hasMySuggestion }) => {
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

  const handleSuggesting = () => {
    if (quillEditor && quillEditor.hasMySuggestion()) {
      publishSuggestion(quillEditor.mySuggestion);
      quillEditor.publishSuggestion();
    }
  };

  return (
    <Flex direction="column">
      <Button
        display={hasMySuggestion ? 'inherit' : 'none'}
        m={4}
        position="fixed"
        zIndex={999}
        backgroundColor="#fff"
        shadow="lg"
        onClick={handleSuggesting}
        rightIcon={FiPlusCircle}
        variantColor="teal"
        variant="outline"
        color="blue.800"
        border="2px"
        borderRadius="none"
        borderColor="teal.500"
      >
        {/* TODO: Localize */}
        suggest
      </Button>
      <Flex mt={12}>
        <EditorBody />
      </Flex>
    </Flex>
  );
};
