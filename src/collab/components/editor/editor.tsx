import { Button, Flex, Heading } from '@chakra-ui/core';
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
  title: string;
  quillEditor?: QuillEditor;
  original: MutableRefObject<Delta>;
  hasMySuggestion: boolean;
}

export const Editor: FC<EditorProps> = ({ quillEditor, original, hasMySuggestion, title }) => {
  const { noteID } = useParams<CollabRouteParams>();

  const [createSuggestion] = useCreateSuggestionMutation();

  const { data: suggestionApproveData } = useSuggestionApproveSubscription({
    variables: { noteID },
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
    if (noteID) {
      createSuggestion({ variables: { delta: JSON.stringify(suggestion), noteID } });
    }
  };

  const handleSuggesting = () => {
    if (quillEditor?.hasMySuggestion()) {
      publishSuggestion(quillEditor.mySuggestion);
      quillEditor.publishSuggestion();
    }
  };

  return (
    <Flex direction="column" backgroundColor="white" w={['100%', '100%', 'initial']}>
      <Button
        m={4}
        display={['none', 'none', 'none', hasMySuggestion ? 'inline-flex' : 'none']}
        position="fixed"
        zIndex={999}
        bg="#fff"
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
      <Flex direction="column" mt={16} align="center">
        <Heading
          color="grey.900"
          w="100%"
          px={[2, 2, 10]}
          mb={2}
          textAlign="start"
          lineHeight="normal"
          fontSize={['lg', 'lg', 'xl']}
        >
          {title}
        </Heading>
        <EditorBody />
      </Flex>
    </Flex>
  );
};
