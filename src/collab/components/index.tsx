import { Button, Flex } from '@chakra-ui/core';
import Quill from 'quill';
import Delta from 'quill-delta';
import Op from 'quill-delta/dist/Op';
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { createQuillEditor } from '../quills/quill';
import { EditorBody } from './editor/editor-body';
import { EditorHeader } from './editor/editor-header';
import './marks.css';
import { SuggestionsContainer } from './suggestions/suggestion-container';

const URL = 'http://localhost:5000';

export interface ServerInitData {
  name: string;
  textState: Op[];
  suggestions: SuggestionData[];
}

export interface SuggestionData {
  author: string;
  id: number;
  value: Delta;
}

export const CollaborationContainer = () => {
  const socket = useRef<SocketIOClient.Socket | undefined>(undefined);
  const mySuggestion = useRef<Delta | undefined>(undefined);
  const originalDocument = useRef<Delta>(new Delta());
  const originalDocumentWithSuggestions = useRef<Delta>(new Delta());
  const [suggestions, setSuggestions] = useState<SuggestionData[]>([]);
  const [profileName, setProfileName] = useState<string>('Névtelen');
  const editor = useRef<Quill>();

  useEffect(() => {
    editor.current = createQuillEditor();
    editor.current.on('text-change', function(delta, _, source) {
      if (source === 'user') {
        mySuggestion.current = new Delta(mySuggestion.current).compose(delta);
      }
    });
    editor.current.on('selection-change', () => {
      // props -> range, oldRange, source
      // if (mySuggestion.current) handleSuggest();
    });
  }, []);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(URL, { autoConnect: false });
      socket.current.on('init', ({ name, suggestions: sugg, textState }: ServerInitData) => {
        originalDocument.current = new Delta(textState);
        setProfileName(name);
        setSuggestions(sugg);
        let documentWithSuggestions = originalDocument.current;
        sugg.forEach((suggestion) => {
          const coloredDelta = suggestion.value;
          coloredDelta.ops.forEach(function(op) {
            if (op.insert) op['attributes'] = { ...op.attributes, mark: 'addedBySomeone' };
          });
          documentWithSuggestions = documentWithSuggestions.compose(coloredDelta);
        });
        originalDocumentWithSuggestions.current = documentWithSuggestions;
        editor.current && editor.current.setContents(documentWithSuggestions);
      });

      socket.current.on('suggestionPublished', (newSuggestion: SuggestionData) => {
        const coloredDelta = newSuggestion.value;
        coloredDelta.ops.forEach(function(op) {
          if (op.insert) op['attributes'] = { ...op.attributes, mark: 'addedBySomeone' };
        });
        originalDocumentWithSuggestions.current = originalDocumentWithSuggestions.current.compose(
          coloredDelta,
        );
        let updateDelta = coloredDelta;
        if (mySuggestion.current) {
          const inverted: Delta = new Delta(mySuggestion.current).invert(
            originalDocumentWithSuggestions.current,
          );
          updateDelta = inverted.compose(coloredDelta).compose(new Delta(mySuggestion.current));
        }
        editor.current && editor.current.updateContents(updateDelta);
        setSuggestions((suggestions) => [...suggestions, newSuggestion]);
      });

      socket.current.on(
        'suggestionAccepted',
        (acceptedSuggestion: SuggestionData, otherSuggestions: SuggestionData[]) => {
          const acceptedDelta: Delta = new Delta(acceptedSuggestion.value);
          if (mySuggestion.current) {
            mySuggestion.current = acceptedDelta.transform(mySuggestion.current, true);
          }
          originalDocument.current = originalDocument.current.compose(new Delta(acceptedDelta));
          setSuggestions(otherSuggestions);
        },
      );
      socket.current.on('suggestionCancelled', (otherSuggestions: SuggestionData[]) => {
        setSuggestions(otherSuggestions);
      });
      socket.current.open();
    }
  });

  const sendPublishSuggestionToServer = (suggestion: Delta) => {
    socket.current &&
      socket.current.emit('publishSuggestion', {
        name: profileName,
        value: suggestion,
      });
  };

  const sendAcceptSuggestionToServer = (id: number) => {
    socket.current && socket.current.emit('acceptSuggestion', id);
  };

  const sendCancelSuggestionToServer = (id: number) => {
    socket.current && socket.current.emit('cancelSuggestion', id);
  };

  const handleSuggest = () => {
    if (mySuggestion.current) {
      editor.current && editor.current.setContents(originalDocumentWithSuggestions.current);
      const unColoredSuggestion = mySuggestion.current;
      unColoredSuggestion &&
        unColoredSuggestion.ops.forEach(function(op) {
          if (op.attributes && op.attributes.mark) delete op.attributes.mark;
        });
      sendPublishSuggestionToServer(unColoredSuggestion);
      mySuggestion.current = undefined;
    }
  };

  return (
    <Flex direction="column">
      <EditorHeader mode="edit" subject="Vascular surgery"></EditorHeader>
      <Flex mt="50px">
        <Flex direction="column">
          <Button backgroundColor="blue.700" m={5} width="200px" onClick={handleSuggest}>
            SUGGEST
          </Button>
          <EditorBody></EditorBody>
        </Flex>
        <SuggestionsContainer
          suggestions={suggestions}
          onSuggestionAccepted={(id: number) => sendAcceptSuggestionToServer(id)}
          onSuggestionCancelled={(id: number) => {
            sendCancelSuggestionToServer(id);
          }}
        ></SuggestionsContainer>
      </Flex>
    </Flex>
  );
};
