import { Button, Flex, Heading } from '@chakra-ui/core';
import { BoundsStatic } from 'quill';
import Delta from 'quill-delta';
import React, { FC, MutableRefObject, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiPlusCircle } from 'react-icons/fi';
import { useParams } from 'react-router';
import { useErrorToast } from '../../../core/hooks';
import { CursorPositionChangedEventProps, EditorState, QuillEditor } from '../../quills';
import { CollabRouteParams } from '../../utils/collab-route';
import { useSuggestionApproveSubscription } from '../suggestions/graphql/suggestion-approve-subscription.generated';
import { useCreateSuggestionMutation } from './graphql/suggestion-create-mutation.generated';

export interface EditorProps {
  title: string;
  quillEditor?: QuillEditor;
  original: MutableRefObject<Delta>;
  hasMySuggestion: boolean;
}

export const Editor: FC<EditorProps> = ({ quillEditor, original, hasMySuggestion, title }) => {
  const { t } = useTranslation('collab');
  const { noteID } = useParams<CollabRouteParams>();
  const [editorState, setEditorState] = useState<EditorState>('original');
  const errorToast = useErrorToast();

  const [cursorPosition, setCursorPosition] = useState<BoundsStatic>({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
  });

  const [createSuggestion, { loading }] = useCreateSuggestionMutation();

  const { data } = useSuggestionApproveSubscription({ variables: { noteID } });
  useEffect(() => {
    if (data) {
      const delta = new Delta(JSON.parse(data.approvedSuggestion.delta));
      if (quillEditor) {
        quillEditor.approveSuggestion(delta);
        original.current = original.current.compose(delta);
      }
    }
  }, [original, quillEditor, data]);

  useEffect(() => {
    if (quillEditor) {
      quillEditor.onCursorPositionChanged(({ position }: CursorPositionChangedEventProps) => {
        setCursorPosition(position);
      });
      quillEditor.onStateChanged(({ newState }) => {
        setEditorState(newState);
      });
    }
  }, [quillEditor]);

  const handleSuggesting = async () => {
    if (quillEditor?.hasMySuggestion() && noteID) {
      try {
        await createSuggestion({
          variables: { delta: JSON.stringify(quillEditor.mySuggestion), noteID },
        });
        quillEditor.publishSuggestion();
      } catch (error) {
        errorToast(error);
      }
    }
  };

  return (
    <Flex direction="column" backgroundColor="white" w={['100%', '100%', 'initial']} align="center">
      <Flex w="100%" justify="flex-end">
        <Button
          m={4}
          display={[
            'none',
            'none',
            'none',
            hasMySuggestion && editorState === 'mySuggestionApplied' ? 'inline-flex' : 'none',
          ]}
          position="absolute"
          top={cursorPosition.top + 100}
          isLoading={loading}
          zIndex={999}
          bg="#fff"
          shadow="lg"
          onClick={handleSuggesting}
          rightIcon={FiPlusCircle}
          variantColor="teal"
          variant="outline"
          color="blue.800"
          borderWidth={2}
          borderRadius={0}
          borderColor="teal.500"
          _disabled={{ bg: '#fff' }}
          _active={{ bg: '#fff' }}
        >
          {t('button.suggest')}
        </Button>
      </Flex>
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
        <Flex
          borderWidth={1}
          borderColor="grey.200"
          bg="#fff"
          width={['100%', '100%', '90%', '90%', '800px']}
          maxW="800px"
          minHeight="80vh"
          m={[0, 0, 6]}
          px={[1, 1, 6]}
          py={[3, 3, 10]}
          borderRadius="none"
        >
          <Flex
            display="flex"
            w="100%"
            className="collab-quill-editor"
            style={{ border: 'none' }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
