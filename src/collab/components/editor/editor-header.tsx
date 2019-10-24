import { Button, Flex, Icon } from '@chakra-ui/core';
import React, { FC } from 'react';

export interface EditorHeaderProps {
  mode?: 'edit' | 'study';
  subject: string;
}

export const EditorHeader: FC<EditorHeaderProps> = ({ mode, subject }) => {
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
        <Icon mx={12} name="cogito" size="32px" color={mode === 'edit' ? 'white' : 'blue.800'} />

        {mode === 'edit' ? (
          <Toolbar />
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
              rightIcon="save"
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
              onClick={() => {}}
              bg="transparent"
              color="white"
              border="2px"
              borderRadius="none"
              borderColor="teal.500"
            >
              view mode
            </Button>
          </>
        ) : (
          <Button
            rightIcon="pencil"
            onClick={() => {}}
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

export const Toolbar = () => (
  <Flex alignItems="center">
    <div id="toolbar" style={{ border: 'none' }}>
      <span className="ql-formats">
        <select className="ql-size"></select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
      </span>
      <span className="ql-formats">
        <button className="ql-image"></button>
      </span>
    </div>
  </Flex>
);
