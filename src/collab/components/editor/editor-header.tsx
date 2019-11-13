import { Button, Flex, Icon } from '@chakra-ui/core';
import { FiEdit2, FiSave } from 'react-icons/fi';
import React, { FC } from 'react';
import { EditorToolbar } from './editor-toolbar';

export type EditorMode = 'edit' | 'study';

export interface EditorHeaderProps {
  mode: EditorMode;
  subject: string;
  handleEditorModeChange: (newState: EditorMode) => void;
}

export const EditorHeader: FC<EditorHeaderProps> = ({ mode, subject, handleEditorModeChange }) => {
  return (
    <Flex
      flexGrow={1}
      position="fixed"
      top={0}
      width="full"
      height="50px"
      zIndex={2}
      alignItems="center"
      justifyContent="space-between"
      backgroundColor={mode === 'edit' ? 'blue.800' : 'white'}
    >
      <Flex
        align="center"
        direction={['row-reverse', 'row-reverse', 'row']}
        justifyContent={['space-between', 'space-between', 'flex-start']}
        width={['full', 'full', 'initial']}
      >
        <Icon
          mx={12}
          // @ts-ignore
          name="cogito"
          size="32px"
          color={mode === 'edit' ? 'white' : 'blue.800'}
        />

        {mode === 'edit' ? (
          <EditorToolbar />
        ) : (
          <Button
            leftIcon="chevron-left"
            onClick={() => {}}
            bg="transparent"
            color="blue.800"
            border="2px"
            borderRadius="none"
            borderColor="teal.500"
          >
            {subject}
          </Button>
        )}
      </Flex>
      <Flex alignItems="center" mx={12} display={['none', 'none', 'initial']}>
        {mode === 'edit' ? (
          <>
            <Button
              rightIcon={FiSave}
              onClick={() => {}}
              bg="teal.500"
              color="blue.800"
              borderRadius="none"
              mr={4}
            >
              save
            </Button>
            <Button
              rightIcon="small-close"
              onClick={() => handleEditorModeChange('study')}
              bg="transparent"
              color="white"
              border="2px"
              borderRadius="none"
              borderColor="teal.500"
            >
              study
            </Button>
          </>
        ) : (
          <Button
            rightIcon={FiEdit2}
            onClick={() => handleEditorModeChange('edit')}
            bg="transparent"
            color="blue.800"
            border="2px"
            borderRadius="none"
            borderColor="teal.500"
          >
            edit
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
